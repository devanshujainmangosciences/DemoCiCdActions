/**
 * This Component renders Document List. User can upload, download and delete Document from here.
 * This Component gets documentList and documentTypeList from redux as props,
 * On Component mount readDocuments and documentData is called
 * function is called to get DocumentList Array and DocumentTypeList Map which is mapped inside a table component
 */

import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {actionTypes} from '@/constants/actionTypes';
import {DocumentIcon} from '@/assets/icons';
import {Col, Row, Form} from '@themesberg/react-bootstrap';
import {
  setToast,
  uploadDocument,
  readDocuments,
  documentData,
  downloadDocument,
  deleteDocument,
  requiredDocuments,
  getFinancialInformation,
  getLoanApplicationDetails,
  uploadDocumentForPatient,
} from '@/actions';
import {
  ALERT_MESSAGE,
  DateFormat,
  DOCUMENT,
  DOCUMENT_TYPE,
  OCCUPATION_ID,
  SELECTED_ROLE_NAME,
} from '../../constants';
import TitleContainer from '@/components/TitleContainer';
import {
  downloadFile,
  fileSizeValidator,
  fileTypeValidator,
  getDocumentName,
  getDocumentType,
} from '@/services/utility';
import NotAllowed from './children/NotAllowed';
import {CustomModal, TableComponent} from '@/components';
import {tableHeaderDocument} from '@/config';
import {Routes} from '@/routes';
import {useNavigate} from 'react-router';
import {secureLocalStorage} from '../../services/web.storage';
import MobileTable from '@/components/MobileTable';
import format from 'date-fns/format';

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const {t} = useTranslation(['myProfile', 'documents']);
  const [documentType, setDocumentType] = useState('');
  const history = useNavigate();
  const [typeList, setTypeList] = useState(null);
  const [document, setdocument] = useState('');
  const [notAllowed, setNotAllowed] = useState(false);
  const [documentListState, setdocumentListState] = useState([]);
  const [fileName, setFileName] = useState('');
  const [isReupload, setisReupload] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    on: false,
    documentId: '',
  });

  const {SET_CREATE_DOCUMENT, SET_DELETE_DOCUMENT, SET_SHOW_DOCUMENT} =
    actionTypes;
  const dispatch = useAppDispatch();
  const documentList = useAppSelector((state) => state.documents.documentList);
  const financialInfo = useAppSelector(
    (state) => state.loanApplication.financialInformation
  );
  const loanDetail = useAppSelector(
    (state) => state.loanApplication.loanDetail
  );
  const isApplicant =
    secureLocalStorage.getItem(SELECTED_ROLE_NAME) === 'applicant';
  const documentTypeList = useAppSelector(
    (state) => state.documents.documentTypeList
  );

  /**
   * Dispacth readDocument Action if documentList array is empty
   */
  useEffect(() => {
    dispatch(readDocuments());
  }, [dispatch, documentList.length]);

  /**
   * Dispacth documentData Action if documentTypeListis empty
   */
  useEffect(() => {
    if (isApplicant) {
      if (!loanDetail) {
        dispatch(getLoanApplicationDetails());
      } else {
        if (!documentList.length) {
          setNotAllowed(true);
        } else {
          setNotAllowed(!loanDetail.applicationSubmitFlag);
        }
      }
    }
  }, [dispatch, documentList, isApplicant, loanDetail]);

  /* The below code is using the `useEffect` hook in a React component to dispatch an action to fetch
 document data if the `documentTypeList` variable is falsy (undefined, null, false, 0, "", etc.).
 The `dispatch` function is a Redux action creator that triggers a state update in the Redux store.
 The `useEffect` hook is also dependent on the `dispatch` function and will re-run the effect
 whenever `documentTypeList` or `dispatch` changes. */
  useEffect(() => {
    if (!documentTypeList) {
      dispatch(documentData());
    }
  }, [documentTypeList, dispatch]);

  /**
   * For applicant Dispacth requiredDocuments Action if requiredDocument empty
   */
  useEffect(() => {
    if (isApplicant) {
      if (!financialInfo) {
        dispatch(getFinancialInformation(true));
      } else if (financialInfo?.occupation) {
        dispatch(requiredDocuments(OCCUPATION_ID[financialInfo.occupation]));
      }
    }
  }, [dispatch, financialInfo, isApplicant]);

  /**
   * For applicant set TypeList to FINANCIAL
   */
  useEffect(() => {
    if (isApplicant) {
      if (documentTypeList) {
        setTypeList(documentTypeList[DOCUMENT.FINANCIAL]);
      }
    }
  }, [documentTypeList, isApplicant]);
  /**
   * when user uploads a file this function will set the name and selectedFile to
   * appropriate state
   * @param {Any} event
   */

  useEffect(() => {
    if (documentList) {
      const documentData = documentList.map((document, index) => {
        // console.log('DOCUMENT=>', document);
        const data = {
          id: index,
          documentName: getDocumentName(document?.documentName),
          documentTypeName: document?.documentTypeName,
          documentType: getDocumentType(document?.documentName),
          uploadDate: format(
            new Date(document?.uploadDate),
            DateFormat.DD_MM_YYYY_SLASH
          ),
          header: document?.documentTypeName,
          delete: (
            <div className="buttons">
              {!isApplicant &&
              document.documentTypeName !== DOCUMENT_TYPE.CANCELLED_CHEQUE ? (
                <button
                  className="btn-patient-theme-grid bg-dark"
                  // className='btn-patient-theme bg-transparent text-dark border border-dark me-2'
                  onClick={(e) => deleteDoc(e, document?.id)}>
                  {t('documents:delete')}
                </button>
              ) : (
                !isApplicant && (
                  <button
                    className="btn-patient-theme-grid bg-dark reupload-document"
                    onClick={onReuploadDocument}>
                    {t('documents:Reupload')}
                  </button>
                )
              )}

              <button
                className="btn-patient-theme-grid"
                // className='btn-patient-theme me-2'
                onClick={(e) => download(e, document?.id)}>
                {t('documents:download')}
              </button>
            </div>
          ),
        };
        return data;
      });
      setdocumentListState(documentData);
    }
  }, [documentList]);
  // console.log('DOCUMENT LIST STATE=>', documentListState);
  // console.log('DOCUMENT HEADER=>', tableHeaderDocument);
  /**
   * The function handles the change event of a file input, validates the file size and type, and sets
   * the selected file and its name.
   * @returns There is no explicit return statement in the code snippet provided, so the function is
   * returning `undefined` by default. However, the function is setting the state variables `fileName`
   * and `selectedFile` based on the file selected by the user, and dispatching a toast message if the
   * file size or type is invalid.
   */
  const handleChange = (event) => {
    // console.log('EVENT=>', event);
    const file = event.target.files[0];
    const sizeValidation = fileSizeValidator(15, file.size);
    const fileValidation = fileTypeValidator(file.type);
    if (sizeValidation || fileValidation) {
      dispatch(setToast(ALERT_MESSAGE.FILE_UPLOAD_ERROR, true, 'warning'));
      return;
    }
    setFileName(file.name);
    setSelectedFile(file);
  };

  /**
   * This Function will fetch the byte format of selected file
   * @param {Any} e
   * @param {Id} id
   */
  const download = (e, id) => {
    e.preventDefault();
    const fileData = documentList.find((e) => e.id === id);
    const onSuccess = (response) => {
      downloadFile(response, fileData.documentName);
      return {
        type: SET_SHOW_DOCUMENT,
        payload: response,
      };
    };
    dispatch(downloadDocument(id, onSuccess));
  };

  /**
   * Function trigger on Reupload
   * @param {*} e
   */
  const onReuploadDocument = (e) => {
    e.preventDefault();
    setdocument(DOCUMENT.FINANCIAL);
    setTypeList(documentTypeList[DOCUMENT.FINANCIAL]);
    setDocumentType(DOCUMENT_TYPE.CANCELLED_CHEQUE);
    setisReupload(true);
    window.scrollTo(0, 0);
  };

  /**
   * Set Type List Based on value passed
   * @param {String} value
   */
  const setType = (value) => {
    setdocument(value);
    setTypeList(documentTypeList[value]);
  };

  /**
   * This Function downloads the selected file (gets the bytes value and download it)
   * @param {Bytes} file
   * @param {String} fileName
   */
  // const down = (file, fileName) => {
  //   const url = window.URL.createObjectURL(new Blob([file]));
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', fileName);
  //   document.body.appendChild(link);
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };

  /**
   * This Function will delete the selected document
   * @param {Any} e
   * @param {Integer} id
   */
  const deleteDoc = (e, id) => {
    setDeleteModal({...deleteModal, on: true, documentId: id});
    e.preventDefault();
  };

  /**
   * This function confirms the deletion of a document and dispatches an action to delete it.
   */
  const onConfirmDelete = (id) => {
    if (id) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readDocuments());
        return {
          type: SET_DELETE_DOCUMENT,
          payload: response,
        };
      };
      dispatch(deleteDocument(id, onSuccess));

      setDeleteModal({...deleteModal, documentId: ''});
    }
  };
  /**
   * Selected File, Type and Name will be set to initial State
   */
  const clearAll = () => {
    setSelectedFile('');
    setFileName('');
    setDocumentType('');
    // setdocument('');
    setisReupload(false);
    // setTypeList(null);
  };
  /**
   * This Function will submit the uploaded file to uploadDocument action
   * @param {Any} e
   *
   */
  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileName) return;
    if (!documentType) return;
    if (selectedFile) {
      const file = new FormData();
      file.append('file', selectedFile);
      if (isApplicant) {
        file.append('id', selectedFile.lastModified);
      }
      file.append('documentType', documentType);
      // file.append('cycleNo', 1);
      const onSuccess = (response) => {
        // console.log('RESPONSE=>', response);
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readDocuments());
        if (documentType === DOCUMENT_TYPE.CANCELLED_CHEQUE)
          dispatch(getFinancialInformation());
        clearAll();
        return {
          type: SET_CREATE_DOCUMENT,
          payload: response.data,
        };
      };
      if (isApplicant) {
        dispatch(uploadDocument(file, onSuccess));
      } else {
        dispatch(uploadDocumentForPatient(file, onSuccess));
      }
    }
  };

  // console.log('DELETE MODAL=>', deleteModal);

  /**
   * This function sets the "on" property of the "deleteModal" state object to false, effectively closing
   * a modal.
   */
  const handleModalClose = () => {
    setDeleteModal({...deleteModal, on: false});
  };
  /**
   * The function redirects the user to the start loan page for applicants when the complete application
   * button is clicked.
   */
  const onCompleteApplicationButtonClick = () => {
    history(Routes.ApplicantStartLoan.path);
  };
  /**
   * This function triggers when we selected the document type from the drop down and validate it against already uploaded document.
   * @param {*} e
   */
  const selectDocumentType = (e) => {
    const value = e.target.value;
    const ifDocumentAlreadyPresent = documentList.find(
      (document) => document.documentTypeName === value
    );

    if (ifDocumentAlreadyPresent && document !== 'MEDICAL')
      dispatch(setToast(ALERT_MESSAGE.DOCUMENT_UPLOADED, true, 'warning'));
    else setDocumentType(value);
  };

  return (
    <div className="mt-4">
      <CustomModal
        Show={deleteModal.on}
        title={''}
        handleClose={handleModalClose}
        // cssClass={'privacy-modal'}
        closeButton={true}
        deleteModalText={t('confirmDelete')}
        onConfirmDelete={() => onConfirmDelete(deleteModal.documentId)}>
        <div></div>
      </CustomModal>
      <TitleContainer
        icon={<DocumentIcon fill="#fff" />}
        title={t('documents:documents')}
      />
      {!isApplicant && (
        <>
          <div className="d-flex flex-row document-btn-group">
            <Form.Group>
              <Form.Control
                as="select"
                className="p-1"
                value={document}
                onChange={(e) => setType(e.target.value)}>
                <option>Select</option>
                {documentTypeList &&
                  Object.keys(documentTypeList).map((value) => {
                    if (value !== 'RECEIPT')
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                  })}
              </Form.Control>
            </Form.Group>
            {/* <button className="btn-patient-theme w-auto">
              <FontAwesomeIcon icon={faPlus} /> Add New Document
            </button> */}
          </div>

          <div className="page-container mt-4">
            <Form className="p-4 document-form">
              <Row>
                <>
                  <Col>
                    <Form.Group controlId="gender">
                      <Form.Label>{t('documents:documentType')}</Form.Label>
                      <Form.Control
                        required
                        className="p-1"
                        as="select"
                        value={documentType}
                        onChange={selectDocumentType}>
                        <option value="">Select One</option>
                        {typeList &&
                          typeList.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="mt-3 mt-md-0">
                    <Form.Label>{t('documents:selectFile')}</Form.Label>
                    <div className="upload ">
                      <input
                        type="file"
                        id="doc"
                        className="d-none"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleChange(e)}
                        onClick={(event) => {
                          event.target.value = null;
                        }}
                      />
                      <div className="input-box p-1 ps-2">
                        {fileName
                          ? `Chosen File : ${fileName}`
                          : 'Please Select a File'}
                      </div>
                      <label htmlFor="doc" className="browse">
                        {t('documents:browse')}
                      </label>
                    </div>
                  </Col>
                </>
              </Row>{' '}
              <button
                className="btn-patient-theme bg-dark me-2 mt-4"
                onClick={clearAll}
                type="button">
                {t('documents:cancel')}
              </button>
              <button
                className=" btn-patient-theme fw-normal"
                onClick={handleUpload}
                disabled={!documentType}>
                {isReupload ? t('document:Reupload') : t('documents:upload')}
              </button>
            </Form>
          </div>
        </>
      )}
      {isApplicant && notAllowed ? (
        <NotAllowed
          note="You are not able to see any documents since you haven't completed loan application."
          onButtonClick={onCompleteApplicationButtonClick}
        />
      ) : (
        documentList.length > 0 && (
          <div className="page-container mt-4">
            <Form className="p-4 caregiver-form">
              {!isApplicant && (
                <div className="d-flex align-items-center mb-2">
                  <h4 className="page-title mb-0">
                    {t('documents:documents')}
                  </h4>
                </div>
              )}
              <div className="d-none d-md-block">
                <TableComponent
                  component={'drug-schedule-listing'}
                  tableHeadersData={tableHeaderDocument}
                  tableData={
                    documentListState.length > 0 ? documentListState : []
                  }
                  classes={'document-table align-items-center'}
                  noCheck
                  headerClasses="border-0"
                  // actionCallback={actionCallback}
                />
              </div>
              <MobileTable
                tableClasses="document-accordion"
                tableData={documentListState}
                tableHeader={tableHeaderDocument}
              />
            </Form>
          </div>
        )
      )}
    </div>
  );
};

export default Documents;
