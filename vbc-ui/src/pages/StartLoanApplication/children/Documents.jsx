/**
 * This Component render a input [type=file] where the user can upload their
 * Document, renders Document List. User can upload, download and delete Document from here.
 * <Documents
 * handleClick(Func) => Function used to take the user to next or prev step in start loan application
 * This Component gets documentList and documentTypeList from redux as props,
 * On Component mount readDocuments and documentData is called
 * function is called to get DocumentList Array and DocumentTypeList Map which is mapped inside a table component
 */

import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {actionTypes} from '@/constants/actionTypes';
import {Col, Row, Form, Accordion} from '@themesberg/react-bootstrap';
import PropTypes from 'prop-types';
import {tableHeaderDocument} from '@/config';
import {
  setToast,
  uploadDocument,
  readDocuments,
  documentData,
  downloadDocument,
  deleteDocument,
  startLoanApplicationSteps,
  requiredDocuments,
} from '@/actions';
import {
  fileSizeValidator,
  fileTypeValidator,
  getDocumentName,
  getDocumentType,
} from '@/services/utility';
import {ALERT_MESSAGE, DateFormat, OCCUPATION_ID} from '../../../constants';
import {TableComponent} from '@/components';
import MobileTable from '@/components/MobileTable';
import format from 'date-fns/format';

const Documents = ({handleClick, requiredDocument, occupation}) => {
  const {t} = useTranslation(['myProfile', 'documents', 'startLoan']);
  const [documentType, setDocumentType] = useState('');
  const [documentListState, setdocumentListState] = useState([]);
  const [selectedFile, setSelectedFile] = useState(new FormData());
  const [typeList, setTypeList] = useState(null);
  const [fileName, setFileName] = useState('');
  const {SET_CREATE_DOCUMENT, SET_DELETE_DOCUMENT, SET_SHOW_DOCUMENT} =
    actionTypes;
  const dispatch = useAppDispatch();
  const documentList = useAppSelector((state) => state.documents.documentList);

  const documentTypeList = useAppSelector(
    (state) => state.documents.documentTypeList
  );

  /**
   * Dispacth readDocument Action if documentList array is empty
   */
  useEffect(() => {
    if (!documentList.length) {
      dispatch(readDocuments());
    }
  }, [dispatch, documentList.length]);

  /**
   * Dispacth documentData Action if documentTypeListis empty
   */
  useEffect(() => {
    if (!documentTypeList) {
      dispatch(documentData());
    }
  }, [documentTypeList, dispatch]);

  /**
   * Dispacth requiredDocuments Action if occupationId has value it in
   */
  useEffect(() => {
    if (documentTypeList) {
      setTypeList(documentTypeList['FINANCIAL']);
    }
  }, [documentTypeList]);

  /**
   * When user uploads a file this function will set file type and
   * file name to respective states
   * @param {any} event
   */
  const handleChange = (event) => {
    const file = event.target.files[0];
    const sizeValidation = fileSizeValidator(15, file.size);
    const fileValidation = fileTypeValidator(file.type);
    if (sizeValidation || fileValidation) {
      dispatch(setToast(ALERT_MESSAGE.FILE_UPLOAD_ERROR, true, 'warning'));
      return;
    }
    setFileName(event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
  };

  /**The above code is a React useEffect hook that is triggered when the `documentList` state changes. It
maps through the `documentList` array and creates a new array of objects with specific properties.
It then sets the state of `documentListState` to the new array of objects. The purpose of this code
is to format the `documentList` data in a specific way for display in a table or grid. It also
includes buttons for deleting and downloading documents. */
  useEffect(() => {
    if (documentList) {
      const documentData = documentList.map((document, index) => {
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
              <button
                className="btn-patient-theme-grid bg-dark"
                // className='btn-patient-theme bg-transparent text-dark border border-dark me-2'
                onClick={(e) => deleteDoc(e, document?.id)}>
                {t('documents:delete')}
              </button>

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

  /**
   * This Function will fetch the byte format of selected file
   * @param {Any} e
   * @param {Id} id
   */
  const download = (e, id) => {
    e.preventDefault();
    const fileData = documentList.find((e) => e.id === id);
    const onSuccess = (response) => {
      down(response, fileData.documentName);
      return {
        type: SET_SHOW_DOCUMENT,
        payload: response,
      };
    };
    dispatch(downloadDocument(id, onSuccess));
  };

  /**
   * This Function downloads the selected file (gets the bytes value and download it)
   * @param {Bytes} file
   * @param {String} fileName
   */
  const down = (file, fileName) => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Clear all the state related to selected document and type
   */
  const clearAll = () => {
    setSelectedFile('');
    setFileName('');
    setDocumentType('');
  };

  /**
   * This Function will delete the selected document
   * @param {Any} e
   * @param {Integer} id
   */
  const deleteDoc = (e, id) => {
    e.preventDefault();
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      dispatch(readDocuments());
      dispatch(requiredDocuments(OCCUPATION_ID[occupation]));
      return {
        type: SET_DELETE_DOCUMENT,
        payload: response,
      };
    };
    dispatch(deleteDocument(id, onSuccess));
  };

  /**
   * This Function will submit the uploaded file to uploadDocument action
   * @param {Any} e
   *
   */
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile && fileName) {
      const file = new FormData();
      file.append('file', selectedFile);
      file.append('occupationTypeId', OCCUPATION_ID[occupation]);
      if (documentType) {
        file.append('documentType', documentType);
      } else {
        return;
      }
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        clearAll();
        dispatch(readDocuments());
        dispatch(requiredDocuments(OCCUPATION_ID[occupation]));
        return {
          type: SET_CREATE_DOCUMENT,
          payload: response.data,
        };
      };
      dispatch(uploadDocument(file, onSuccess));
    }
  };

  /**
   * This function handles the submission of a loan application form and dispatches an action to proceed
   * to the next step.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoanApplicationSteps({proceed: true}, 3));
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
    // console.log('IF DOCUMENT=>', ifDocumentAlreadyPresent);
    if (!ifDocumentAlreadyPresent) setDocumentType(e.target.value);
    else
      dispatch(
        setToast(ALERT_MESSAGE.DOCUMENT_ALREADY_UPLOADED, true, 'warning')
      );
  };

  // const renderDocumentItems = (docList) => {
  //   // console.log('documentList=>', docList);
  //   if (docList.length > 0) {
  //     return docList.map((doc, index) => {
  //       return (
  //         <Accordion.Item eventKey={doc?.id} key={doc?.id} className="mb-2">
  //           <Accordion.Header>{doc?.documentTypeName}</Accordion.Header>
  //           <Accordion.Body>{renderDocData(doc)}</Accordion.Body>
  //         </Accordion.Item>
  //       );
  //     });
  //   }
  // };

  // const renderDocData = (doc) => {
  //   if (doc) {
  //     const {documentName, uploadDate, documentTypeName, id} = doc;
  //     return (
  //       <>
  //         <div className="d-flex justify-content-between mb-2">
  //           <div>File Name:</div>
  //           <div className="cut-text">{getDocumentName(documentName)}</div>
  //         </div>
  //         <div className="d-flex justify-content-between mb-2">
  //           <div>File Type:</div>
  //           <div>{documentTypeName}</div>
  //         </div>
  //         <div className="d-flex justify-content-between mb-2 ">
  //           <div>Format:</div>
  //           <div className="text-uppercase">
  //             {getDocumentType(documentName)}
  //           </div>
  //         </div>
  //         <div className="d-flex justify-content-between mb-2">
  //           <div>Date of upload:</div>
  //           <div>{moment(uploadDate).format(DateFormat.IND_DATE_SLASH)}</div>
  //         </div>

  //         <div className="buttons justify-content-end">
  //           <button
  //             className="btn-patient-theme-grid bg-dark"
  //             // className='btn-patient-theme bg-transparent text-dark border border-dark me-2'
  //             onClick={(e) => deleteDoc(e, id)}>
  //             {t('documents:delete')}
  //           </button>

  //           <button
  //             className="btn-patient-theme-grid"
  //             // className='btn-patient-theme me-2'
  //             onClick={(e) => download(e, id)}
  //             download>
  //             {t('documents:download')}
  //           </button>
  //         </div>
  //       </>
  //     );
  //   }
  // };

  return (
    <>
      <div className={`page-container mt-4`}>
        <Form className="p-4 document-form">
          <Row>
            <Col>
              <Row className="align-items-baseline">
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>{t('documents:documentType')} :</Form.Label>
                    <Form.Control
                      className="p-1"
                      value={documentType}
                      onChange={selectDocumentType}
                      required
                      as="select">
                      <option value="" hidden>
                        --Select Document Type--
                      </option>
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
                  <div>
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
                      <div className="input-box ps-2 p-1">
                        {fileName ? `${fileName}` : 'Please Select a File'}
                      </div>
                      <label htmlFor="doc" className="browse">
                        Browse
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <div className="note">
                  <small>{t('documents:note')}</small>
                </div>{' '}
                <div className="d-flex flex-row mt-3 gap-2">
                  {' '}
                  <button
                    onClick={clearAll}
                    type="button"
                    className="btn-patient-theme bg-dark ">
                    {t('documents:cancel')}
                  </button>
                  <button className="btn-patient-theme " onClick={handleUpload}>
                    {t('documents:upload')}
                  </button>
                </div>
              </Row>
            </Col>
            {requiredDocument && (
              <Col className="required-docs-container mt-3 mt-lg-0">
                {' '}
                <Row className="ms-0 ms-lg-4 required-docs">
                  <h6 className="text-black">
                    {t('documents:requiredDocuments')}
                  </h6>
                  {requiredDocument.map((doc, i) => (
                    <div key={i}>
                      <div className="d-flex flex-row">
                        <p>{Object.keys(doc)[0]}</p>
                        {doc[Object.keys(doc)[0]] ? (
                          <div className="uploaded">
                            {doc.status && (
                              <span className="ms-0 border-0 bg-transparent">
                                {doc.status}
                              </span>
                            )}
                            {t('documents:uploaded')}
                          </div>
                        ) : (
                          <div className="pending">
                            {doc.status && (
                              <span className="ms-0 border-0 bg-transparent">
                                {doc.status}
                              </span>
                            )}
                            {t('documents:pending')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </Row>
              </Col>
            )}
          </Row>
        </Form>
      </div>
      {documentList.length > 0 && (
        <div className="page-container mt-4">
          <Form className="p-md-5 p-2 caregiver-form">
            <div className="d-flex align-items-center mb-2">
              <h4 className="page-title mb-0">{t('documents:documents')}</h4>
            </div>
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
      )}
      <div className="mt-4">
        <button
          onClick={() => handleClick('prev')}
          className="btn-patient-theme bg-dark me-2">
          {t('documents:back')}
        </button>

        <button
          className="btn-patient-theme w-auto px-4 me-2"
          onClick={handleSubmit}>
          {t('documents:reviewApplication')}
        </button>
      </div>
    </>
  );
};

Documents.propTypes = {
  handleClick: PropTypes.func,
  requiredDocument: PropTypes.array,
};
export default Documents;
