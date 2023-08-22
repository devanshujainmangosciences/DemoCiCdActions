/**
 * This Component renders User List. User can create, edit and delete User from here.
 * This Component gets usersList and pagination from Redux as props
 * and history is mapped to props which is used to navigate. On Component mount readUsers
 * function is called to get UsersList Array which is mapped inside a table component
 * IMPORTANT:
 * usersList is required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTranslation} from 'react-i18next';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Row} from '@themesberg/react-bootstrap';
import {connect} from 'react-redux';
import {Routes} from '@/routes';
import {useAppDispatch} from '@/redux/redux-hooks';
import PropTypes from 'prop-types';
import {Can, Filter, Tables} from '@/components';
import {readUsers} from '@/actions';
import {tableHeadersUsers} from '@/config';
import CustomPagination from '@/components/CustomPagination';
import {userFilter} from '@/config';
import {useNavigate} from 'react-router-dom';
// import {ALERT_MESSAGE} from '@/constants';

function User(props) {
  const {t} = useTranslation(['users']);
  const {usersList, pagination} = props;
  const history = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userListState, setuserListState] = useState([]);
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  // const [userToDisable, setuserToDisable] = useState('');
  // const [showDisableUser, setshowDisableUser] = useState(false);
  const dispatch = useAppDispatch();
  // console.log('USER LIST=>', usersList);
  /**
   * Dispatches readUsers when usersList is null
   */
  useEffect(() => {
    if (!usersList) {
      dispatch(readUsers());
    }
  }, [usersList, dispatch]);

  /** This `useEffect` hook is used to update the `userListState` whenever the `usersList` prop changes.
It maps over the `usersList` array and creates a new array `reqData` with modified data. The `role`
property of each user object is updated to be an array of `span` elements, with each element
representing a role. Finally, the `reqData` array is set as the new state of `userListState`. The
dependency array `[usersList]` ensures that this effect runs only when `usersList` changes. */
  useEffect(() => {
    if (usersList) {
      const reqData = usersList.map((user) => {
        return {
          ...user,
          role:
            user?.roles &&
            Object.values(user?.roles).map((item, index, items) => {
              return (
                <span key={index}>
                  {item}
                  {index === items.length - 1 ? '' : ','}
                </span>
              );
            }),
        };
      });
      setuserListState(reqData);
    }
  }, [usersList]);

  /**
   * Dispatches readUsers when activePage and pagesize changes
   */
  useEffect(() => {
    dispatch(readUsers(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  /**
   * This Function will handle view user navigate the user to
   * view user route with selected user id
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
      // case 'disable': {
      //   setuserToDisable(id);
      //   setshowDisableUser(true);
      // }
      default:
        break;
    }
  };

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  // const handleModalClose = () => {
  //   setshowDisableUser(false);
  // };

  // const handleClickYes = (response) => {
  //   const onSuccessCallback = () => {
  //     handleModalClose();
  //     setuserToDisable('');
  //     dispatch(readUsers(activePage - 1, pageSize));
  //     dispatch(setToast(ALERT_MESSAGE.USER_DISABLED_SUCCESS, true, 'success'));
  //   };
  //   if (userToDisable) dispatch(disableUser(userToDisable, onSuccessCallback));
  // };

  return (
    <>
      {/* <CustomModal
        Show={showDisableUser}
        title={'Disable User'}
        handleClose={handleModalClose}>
        <p>Are you sure you want to disable this user</p>
        <Button
          variant="danger"
          type="submit"
          onClick={handleClickYes}
          className="mt-3">
          Disable
        </Button>
      </CustomModal> */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>{t('userList')}</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'user-listing',
            action: 'can add newUser',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={() => history(Routes.NewUser.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">{t('addNewUser')}</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={userFilter}
              callback={readUsers}
              filtersApplied={filtersApplied}
              filterAppliedState={filtersAppliedState}
              filterBody={true}
              activePage={activePage - 1}
              pageSize={pageSize}
              type="mango-executive"
              classes="h-100 row">
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
          {/* <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  {t('show')}
                </Dropdown.Item>
                {[10, 20, 30].map((size) => (
                  <Dropdown.Item
                    key={size}
                    className="d-flex fw-bold"
                    value={size}
                    onClick={() => setPageSize(size)}
                  >
                    {size}
                    {size === pageSize && (
                      <span className="icon icon-small ms-auto">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col> */}
        </Row>
      </div>
      <div className="px-0 bg-white px-4 rounded py-2">
        <div className="d-flex flex-row align-items-center py-4">
          <div className="ps-2 pe-4 ">
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
        {usersList && (
          <Tables
            component={'user-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeadersUsers}
            tableData={userListState}
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
  usersList: state.users.usersList,
  user: state.users.selectedUser,
  pagination: state.users.pagination,
});

const mapDispatchToProps = {};
User.propTypes = {
  usersList: PropTypes.array,
  user: PropTypes.object,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
