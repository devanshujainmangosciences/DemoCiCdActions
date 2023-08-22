/**
 * This Component renders VBC Drug schedule List. User can create, edit and delete drug schedule from here
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {tableHeaderVbcProgram} from '@/config';
import {Routes} from '@/routes';
import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '../../components';
import {useNavigate} from 'react-router';
import {readProgram, deleteProgram, readManufacturers} from '@/actions';
import {pbpProgramFilter} from '@/config';
import {readDrugs} from '@/actions/drugActions';
import {readHospitals} from '@/actions/hospitalActions';

const AdminVbcProgram = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [title, setTitle] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [removeProgramId, setRemoveProgramId] = useState(null);
  const [programListState, setprogramListState] = useState([]);
  const programList = useAppSelector(
    (state) => state.admin.programList?.content
  );
  const manufacturers = useAppSelector(
    (state) => state.manufacturers.manufacturersList
  );
  const drugs = useAppSelector((state) => state.drugs.drugsList);
  const hospitals = useAppSelector((state) => state.hospitals.hospitalsList);
  const programListPagination = useAppSelector(
    (state) => state.admin.programList
  );
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const [manufactureList, setManufactureList] = useState([]);
  const [drugList, setdrugList] = useState([]);
  const [hospitalList, sethospitalList] = useState([]);

  useEffect(() => {
    if (!manufacturers) {
      dispatch(readManufacturers());
    } else {
      setManufactureList(
        manufacturers.map((manufacturer) => ({
          id: manufacturer.id,
          label: manufacturer.manufacturerName,
          value: manufacturer.id,
        }))
      );
    }
  }, [dispatch, manufacturers]);
  /**
   * The useEffect hook is used here to ensure that drugs are read in only if they have not already been initialized, allowing the component to be optimized and run more efficiently. It also sets the drugList variable to a list of drugs mapped from the given drugs array, allowing the component to access the list of drugs in an easy-to-use format.
   */
  useEffect(() => {
    if (!drugs) {
      dispatch(readDrugs());
    } else {
      setdrugList(
        drugs.map((drug) => ({
          id: drug.id,
          label: `${drug.drugGenericName}-${drug.brandName}`,
          value: drug.id,
        }))
      );
    }
  }, [dispatch, drugs]);
  /**
   * This useEffect hook is used to fetch all the manufacturers from the api and store them in a state. It will also set the manufacture list which is used to generate the select list with labels and values. This will ensure that the state is updated with the manufacturer's data.
   */
  useEffect(() => {
    if (!hospitals) {
      dispatch(readHospitals());
    } else {
      sethospitalList(
        hospitals.map((hospital) => ({
          id: hospital.id,
          label: hospital.hospitalName,
          value: hospital.id,
        }))
      );
    }
  }, [dispatch, hospitals]);
  /**Load Program list when components load */
  useEffect(() => {
    if (!programList) {
      dispatch(readProgram(activePage, pageSize));
    }
  }, []);
  /**
   * Dispatches readProgram when activePage and pagesize changes
   */
  useEffect(() => {
    if (activePage > 0) {
      dispatch(readProgram(activePage - 1, pageSize));
    }
  }, [activePage, pageSize, dispatch]);

  /**
   *  This useEffect hook takes in the programList parameter to set the programListState array when programList is changed. It sets the programListState with drugName, hospitalName, and manufacturerName from the programList parameter.
   */
  useEffect(() => {
    if (programList) {
      const reqProgramList = programList.map((program) => {
        return {
          ...program,
          drugName: program?.vbcDrugMaster?.brandName
            ? `${program?.vbcDrugMaster?.brandName}-${program?.vbcDrugMaster?.drugGenericName}`
            : '',
          hospitalName: program?.hospital?.hospitalName,
          manufacturerName: program?.manufacturer?.manufacturerName,
        };
      });
      setprogramListState(reqProgramList);
    }
  }, [programList]);

  /**
   * This Function will handle View manufacture and remove manufacture
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'changeView': {
        let URL = action.url;
        URL = URL.replace(':id', id);
        // console.log('URL=>', URL);
        history(URL, {state: action.label});
        break;
      }
      case 'confirmModal': {
        setRemoveProgramId(id);
        setTitle('Remove manufacturer');
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };

  /**
   * Deletes the manufacture when user click confirm delete
   * by dispatching deleteManufacturer
   */
  const handleClickYes = () => {
    dispatch(deleteProgram(removeProgramId));
    setShowRemoveModal(false);
  };

  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => setShowRemoveModal(false);

  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleModalClose}>
        <p>Are you sure you want to remove this PBP Program</p>
        <Button
          variant="danger"
          type="submit"
          onClick={handleClickYes}
          className="mt-3">
          remove
        </Button>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>PBP Program List</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'program-listing',
            action: 'can add newProgram',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={() => history(Routes.NewVbcProgram.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">Add New PBP Program</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-end">
          <div className="admin-filter">
            <Filter
              filters={pbpProgramFilter}
              data={{
                manufactureList,
                hospitalList,
                drugList,
              }}
              filterAppliedState={filtersAppliedState}
              callback={readProgram}
              filtersApplied={filtersApplied}
              filterBody={true}
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

        {programListState && (
          <TableComponent
            component={'manufacturer-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeaderVbcProgram}
            tableData={programListState}
            actionCallback={actionCallback}
          />
        )}
        <CustomPagination
          paginationDetail={programListPagination}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </>
  );
};

export default AdminVbcProgram;
