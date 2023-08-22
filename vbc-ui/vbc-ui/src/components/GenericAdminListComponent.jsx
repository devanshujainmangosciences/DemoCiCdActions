/**
 * This component is used to display the Admin UI list for Lender, Medications,Doctors, Manufacturers, Hospital and Users
 * It accepts various  props
 *    transalation:- The name of transalation file that is being used
      dataList:- Data that needs to be displayed in the table
      pagination:- Pagination data for the datalist
      readData:- Data that needs to be fetched
      deleteData: Delete API call
      title:- Header title
      canComponent:- What component that needs to be displayed
      canAction:- Action for can component
      newDataTitle:- Adding new data title
      newDataPath:- Add new data path
      tableClasses:- table classed that need to be used
      tableHeaders:- table header
      tableComponent:- table compnent
      filter:- If filter component is avaliable or not in boolean value
      filters:- List of filter required
      filtersData:- filter data
      filterType:-Type of Filter
      filterClasses:- Filter classes to be used
      filterCallback:- Call back when filter is applied
      pageSizeFilter:- Filter Page size
      addationalSelectData:- Array of Select Data consisting of label, id and optionData,
      onSelectDataCallback:- Call back to fetch the value of the selected data
 */
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTranslation} from 'react-i18next';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {Can, TableComponent, CustomPagination} from '../components';
import {useAppDispatch} from '@/redux/redux-hooks';
import Filter from './Filter';
import CustomModal from './Modal';
import InputForm from '@/pages/profile/children/InputForm';
import {setToast} from '@/actions';
import {useNavigate} from 'react-router-dom';
import {ALERT_MESSAGE} from '../constants';
const GenericAdminListComponent = ({
  transalation,
  dataList,
  pagination,
  readData,
  deleteData,
  title,
  canComponent,
  canAction,
  newDataTitle,
  newDataPath,
  tableClasses,
  tableHeaders,
  tableComponent,
  isModal,
  modalData,
  filters,
  filtersData,
  filterCallback,
  onSelectDataCallback,
  addationalSelectData,
  searchUI,
}) => {
  // console.log('TRANSALATION=>', transalation);
  const {t} = useTranslation(transalation);
  // console.log('DATA LIST=>', dataList);
  const dispatch = useAppDispatch();
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showRemoveModal, setshowRemoveModal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  // const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [modalTitle, setmodalTitle] = useState('');
  const [modalDataState, setmodalDataState] = useState(null);
  const [isDisabled, setisDisabled] = useState(false);
  const [deleteItemId, setdeleteItemId] = useState('');
  const history = useNavigate();

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    readData(activePage, pageSize);
  }, [activePage, pageSize]);

  /**
   * This Function will handle View  and remove
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action) => {
    // console.log('ACTION=>', action);

    switch (action.type) {
      case 'view': {
        onViewData(id, action);
        break;
      }
      case 'update': {
        onEditData(id, action);
        break;
      }
      case 'delete': {
        onDeleteData(id, action);
        break;
      }
      default:
        break;
    }
  };

  const onViewData = (id, action) => {
    if (isModal) {
      const modifiedTitle = `View ${modalData?.title}`;
      setmodalTitle(modifiedTitle);
      openModal(id);
      setIsUpdate(false);
      setisDisabled(true);
    } else {
      let URL = action.url;
      URL = URL.replace(':id', id);
      history(URL);
      return;
    }
  };

  const onEditData = (id, action) => {
    if (isModal) {
      const modifiedTitle = `Edit ${modalData?.title}`;
      setmodalTitle(modifiedTitle);
      openModal(id);
      setIsUpdate(true);
      setisDisabled(false);
    } else {
      let URL = action.url;
      URL = URL.replace(':id', id);
      history(URL);
      return;
    }
  };

  const openModal = (id) => {
    const requiredData = dataList && dataList.find((item) => item.id === id);
    setmodalDataState(requiredData);
    setshowModal(true);
  };

  const onDeleteData = (id) => {
    setshowRemoveModal(true);
    setdeleteItemId(id);
  };

  const filtersApplied = () => {
    // console.log('FILTERS=>', filters);
    // setfiltersAppliedState(filters);
    setActivePage(1);
  };

  const filterCallbackFunction = (activePage, pagesize, filterObject) => {
    // console.log('FILTER OBJECT=>', filterObject);
    filterCallback(activePage, pagesize, filterObject);
  };

  const handleClickCloseModal = () => {
    setshowRemoveModal(false);
    setshowModal(false);
    setisDisabled(false);
  };

  /**
   * Submits the user enter details to updateRoute as param
   * if isUpdate is true else submit to createRoute and closes
   * the modal
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   active: isActive,
    //   component: component,
    //   name: name,
    //   url: url,
    // };
    // if (isUpdate) {
    //   const onSuccess = (response) => {
    //     if (response.message) {
    //       dispatch(setToast(response.message, true, 'success'));
    //     }
    //     dispatch(readRouteList(activePage - 1, pageSize));
    //     return {type: SET_UPDATE_ROUTE, payload: response.data};
    //   };
    //   dispatch(updateRoute(selectedRoute.id, data, onSuccess));
    // } else {
    //   const onSuccess = (response) => {
    //     if (response.message) {
    //       dispatch(setToast(response.message, true, 'success'));
    //     }
    //     dispatch(readRouteList(activePage - 1, pageSize));
    //     return {type: SET_CREATE_ROUTE, payload: response.data};
    //   };
    //   dispatch(createRoute(data, onSuccess));
    // }

    dispatch(
      setToast(ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED, true, 'warning')
    );
    handleClickCloseModal();
  };

  /**
   * Dispatch deleteRoute when remove button is clicked
   * routeid is passed to deleteRoute Action and closes the modal
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      dispatch(readData(activePage - 1, pageSize));
      setshowRemoveModal(false);
      // return {type: SET_DELETE_ROUTE, payload: response.data};
    };
    dispatch(deleteData(deleteItemId, onSuccess));
  };

  const onModalDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setmodalDataState({...modalDataState, [name]: value});
  };

  const renderModalFormData = (items) => {
    if (items && items.length > 0) {
      return items.map((item, index) => (
        <div key={index}>
          <InputForm
            isView={false}
            label={t(item?.label)}
            ipValue={modalDataState ? modalDataState[item?.value] : ''}
            lablevalue={modalDataState ? modalDataState[item?.value] : ''}
            name={item?.variable}
            onChange={onModalDataChange}
            readOnly={isDisabled}
            required={item?.required}
            warningText={t(item?.warningText)}
            type={item?.type}
          />
        </div>
      ));
    }
  };

  const onAddNewClick = () => {
    if (isModal) {
      setshowModal(true);
      setIsUpdate(false);
      const modifiedTitle = `Create ${modalData?.title}`;
      setmodalTitle(modifiedTitle);
    } else {
      history(newDataPath);
    }
  };

  const onSelectChange = (e, selectData) => {
    onSelectDataCallback && onSelectDataCallback(e.target.value, selectData);
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={modalTitle}
        handleClose={handleClickCloseModal}>
        <p>{t('areYouSure')}</p>
        <Button
          variant="danger"
          type="button"
          onClick={handleClickYes}
          className="mt-3">
          {t('remove')}
        </Button>
      </CustomModal>
      <CustomModal
        Show={showModal}
        title={modalTitle}
        isView={isDisabled}
        handleClose={handleClickCloseModal}>
        <Form onSubmit={handleSubmit} className="form-modal">
          {renderModalFormData(modalData?.items)}
          {!isDisabled && (
            <div className="d-flex flex-row justify-content-between">
              <Button
                variant="success"
                type="submit"
                className="mt-3 modal-btn">
                {isUpdate ? t('update') : t('create')}
              </Button>
              <Button
                variant="light"
                className="mt-3 modal-btn"
                onClick={handleClickCloseModal}>
                {t('close')}
              </Button>
            </div>
          )}
        </Form>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <div className="d-block mb-4 mb-md-0">
          <h4>{t(title)}</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: canComponent,
            action: canAction,
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={onAddNewClick}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">{t(newDataTitle)}</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          {searchUI && <div className="pe-4">{searchUI}</div>}
          <div className="mango-filter">
            <Filter
              filters={filters ? filters : []}
              data={filtersData ? filtersData : null}
              callback={filterCallbackFunction}
              filtersApplied={filtersApplied}
              activePage={activePage - 1}
              pageSize={pageSize}
              type="mango-executive"
              classes=" h-100 row">
              <div className="children">
                <div className="show-entries">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}>
                    <option value="" hidden>
                      {t('selectOne')}
                    </option>
                    <option value={10}>{t('showTenEntries')}</option>
                    <option value={20}>{t('showTwentyEntries')}</option>
                    <option value={30}>{t('showThirtyEntries')}</option>
                  </select>
                </div>
              </div>
            </Filter>
          </div>
        </Row>
      </div>
      <div className="px-0 bg-white px-4 rounded py-2">
        <div className="d-flex flex-row align-items-center py-4">
          <div className=" ps-2 pe-4">
            <Form>
              <div className="select-box">
                <select>
                  <option value="" hidden>
                    Bulk Action
                  </option>
                  <option> Active </option>
                  <option> Inactive</option>
                </select>
              </div>
            </Form>
          </div>
          <button className="btn-patient-theme-small bg-dark px-4">
            Apply
          </button>
          {addationalSelectData &&
            addationalSelectData.length > 0 &&
            addationalSelectData.map((selectData, index) => (
              <div className=" ps-2 pe-4" key={index}>
                <Form>
                  <div className="select-box">
                    <select
                      className="ms-2"
                      onChange={(e) => onSelectChange(e, selectData)}
                      defaultValue={selectData?.optionData[0]?.id}>
                      <option value="" hidden>
                        {selectData?.label}
                      </option>
                      {selectData?.optionData &&
                        selectData.optionData.length > 0 &&
                        selectData.optionData.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </Form>
              </div>
            ))}
        </div>
        {dataList && (
          <TableComponent
            component={tableComponent}
            classes={`align-items-center ${tableClasses}`}
            tableHeadersData={tableHeaders}
            tableData={dataList}
            actionCallback={actionCallback}
          />
        )}
        {pagination && (
          <CustomPagination
            paginationDetail={pagination}
            activePage={pagination?.activePage}
            setActivePage={setActivePage}
          />
        )}
      </div>
    </>
  );
};

export default GenericAdminListComponent;
