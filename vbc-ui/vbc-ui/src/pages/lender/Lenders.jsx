/**
 * This Component renders Lender List. User can create, edit and delete lender from here.
 * This Component gets LendersList, deleteLender and pagination states from
 * Redux store as props and history is mapped to props which is used to navigate.
 * On Component mount readLenders function is called
 * to get LendersList Array which is mapped inside this component
 * IMPORTANT:
 * LendersList, readLenders are required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTranslation} from 'react-i18next';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {connect} from 'react-redux';
import {readLenders, deleteLender} from '@/actions/lenderActions';
import {tableHeadersLenders} from '@/config';
import {Routes} from '@/routes';
import {Can, TableComponent, CustomPagination, Filter} from '@/components';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

function Lender(props) {
  const {t} = useTranslation(['lenders']);
  const {lendersList, readLenders, pagination} = props;
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const history = useNavigate();

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readLenders to get LenndersList array
   */
  useEffect(() => {
    if (!lendersList) {
      readLenders();
    }
  }, [lendersList, readLenders]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readLennders
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    readLenders(activePage - 1, pageSize);
  }, [activePage, pageSize, readLenders]);

  /**
   * This Function will handle View Lender and remove Lender
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'changeView': {
        let URL = action.url;
        URL = URL.replace(':id', id);
        history(URL, {state: action.label});
        break;
      }
      case 'delete': {
        props.deleteLender(id);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>{t('lenderList')}</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'lender-listing',
            action: 'can add newLender',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={() => history(Routes.NewLender.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">{t('addNewLender')}</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={[]}
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
                      Select One
                    </option>
                    <option value={10}>Show Ten Entries</option>
                    <option value={20}>Show Twenty Entries</option>
                    <option value={30}>Show Thirty Entries</option>
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
        </div>
        {lendersList && (
          <TableComponent
            component={'lender-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeadersLenders}
            tableData={lendersList}
            actionCallback={actionCallback}
          />
        )}
        <CustomPagination
          paginationDetail={pagination}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  lendersList: state.lenders.usersList,
  pagination: state.lenders.pagination,
});

const mapDispatchToProps = {
  readLenders,
  deleteLender,
};
Lender.propTypes = {
  lendersList: PropTypes.array,
  readLenders: PropTypes.func,
  deleteLender: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Lender);
