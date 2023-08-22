/**
 * This component renders a form allows the user to add applicant to their profile which is included
 * step 3 of loan Application process .user can only add applicant when they are enrolled to vbc if not form will not render
 * user can add upto 5 applicant in case of payment mode opted is loan again financial assistance and user can add only one when
 * in case of payment mode opted is loan against caregivers fd. This payment is selected in step 1
 */
import React, {useState, useEffect} from 'react';
import {Form, Row, Col} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {
  checkMasterValue,
  emailValidator,
  mobileValidator,
  captalizeEveryWordOfSentence,
  capitalizeFirstLetter,
} from '@/services/utility';
import TableComponent from '@/components/Tables';
import {tableHeadersApplicant, tableHeadersVbcApplicant} from '@/config';
import {
  createApplicant,
  updateApplicant,
  deleteApplicant,
  setToast,
  vbcProgramSteps,
  getEnrollForVbc,
  getMasterData,
} from '@/actions';
import {AddApplicantIcon} from '@/assets/icons';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  actionTypes,
  MASTER_DATA_FIELDS,
  PAYMENT_FRAMEWORK,
} from '../../../constants';
import {CustomModal} from '@/components';

import PropTypes from 'prop-types';
import {tableHeadersVbcCaregiver} from '@/config';
import MobileTable from '@/components/MobileTable';

const AddApplicant = ({
  isNote,
  handleClick,
  showTable,
  isAddApplicant,
  applicants,
  limitReached,
  setLimitReached,
  showApplicant,
  applicantsList,
  isEditDisabled,
}) => {
  const {t} = useTranslation(['loanApplication']);
  const dispatch = useAppDispatch();
  const [caregiversList, setCaregiversList] = useState([]);
  const [applicantIndex, setApplicantIndex] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailWarning, setEmailWarning] = useState(false);
  const [ageWarning, setAgeWarning] = useState(false);
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileWarning, setMobileWarning] = useState(false);
  const [gender, setGender] = useState('');
  const [applicantId, setApplicantId] = useState('');
  const [relationToPatient, setRelationToPatient] = useState('');
  const [isEditing, setisEditing] = useState(false);
  const {SET_READ_APPLICANTS_LIST} = actionTypes;
  const [deleteModal, setDeleteModal] = useState({
    on: false,
    applicant: null,
  });
  const masterData = useAppSelector((state) => state.template.masterData);
  let localvalue = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );
  let isLoanAgainstFinancialAssistance =
    localvalue?.paymentTypeOpted ===
    PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE;
  // console.log("IS ADD APPLICANT=>", isAddApplicant);
  // console.log("IS EDIT DISABLED=>", isEditDisabled);
  /**
   * Lifecycle to get the master data if not avaliable in the complete profile page
   */
  useEffect(() => {
    if (!masterData?.relationships)
      dispatch(getMasterData([MASTER_DATA_FIELDS.RELATIONSHIPS]));
  }, [masterData]);

  /**
   * Set LimitReached true when caregiver list length equal to or greater than 5
   */
  useEffect(() => {
    if (applicantIndex || applicantIndex === 0) {
      setLimitReached(false);
    } else {
      if (caregiversList.length >= 5) {
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    }
  }, [applicantIndex, caregiversList.length, setLimitReached]);

  /**
   * Set localStorage applicants array to caregivers list if applicant has value
   */
  useEffect(() => {
    if (isEditDisabled) {
      setLimitReached(isEditDisabled);
    }
  }, [isEditDisabled, setLimitReached]);

  /** The below code is using the `useEffect` hook to update the `limitReached` state based on certain
conditions. If `applicantIndex` is truthy, `limitReached` is set to `false`. Otherwise, if
`applicants.paymentTypeOpted` is equal to `PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD` and the
length of `caregiversList` is greater than or equal to 1, `limitReached` is set to `true`.
Otherwise, `limitReached` is set to `false`.  */
  useEffect(() => {
    if (applicantIndex || applicantIndex === 0) {
      setLimitReached(false);
    } else {
      if (
        applicants?.paymentTypeOpted ===
        PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD
      ) {
        if (caregiversList.length >= 1) {
          setLimitReached(true);
        } else {
          setLimitReached(false);
        }
      }
    }
  }, [applicantIndex, applicants, caregiversList.length, setLimitReached]);

  /**
   * Sets Applicants properties to corresponding states if showTable is false and
   * applicant has value in it
   */
  // console.log('IS ADD APLICANT=>', isAddApplicant);
  // console.log('applicants=>', applicants);
  // console.log('caregiversList=>', caregiversList);

  /** The below code is using the `useEffect` hook in a React component to update the `caregiversList`
state variable based on the `applicantsList` prop. It first checks if `isAddApplicant` is false and
`applicantsList` is truthy, then it maps over the `applicantsList` array to create a new array of
objects with modified properties. The `fullName` property is created by concatenating the
`firstName`, `middleName` (if it exists), and `lastName` properties of each object and capitalizing
every word in the resulting string */
  useEffect(() => {
    if (!isAddApplicant) {
      if (applicantsList) {
        const data = applicantsList.map((app) => ({
          ...app,
          fullName: captalizeEveryWordOfSentence(
            `${app.firstName} ${app?.middleName ? app.middleName : ''} ${
              app.lastName
            }`
          ),
          header: captalizeEveryWordOfSentence(
            `${app.firstName} ${app?.middleName ? app.middleName : ''} ${
              app.lastName
            }`
          ),
          relationToPatient: checkMasterValue(
            app?.relationToPatient,
            masterData?.relationships
          ),
        }));
        setCaregiversList(data);
      }
    }
  }, [setCaregiversList, isAddApplicant, applicantsList]);

  /**
   * This Callback will loop through the applicants and set set the
   * fullName property to each applicant and set it to caregiversList state
   */
  useEffect(() => {
    if (isAddApplicant) {
      if (applicants && applicants.content) {
        const data = applicants.content.map((app) => ({
          ...app,
          fullName: `${app.firstName} ${
            app?.middleName ? app.middleName : ''
          } ${app.lastName}`,
          header: `${app.firstName} ${app?.middleName ? app.middleName : ''} ${
            app.lastName
          }`,
          relationToPatient: checkMasterValue(
            app?.relationToPatient,
            masterData?.relationships
          ),
        }));
        setCaregiversList(data);
      }
    }
  }, [applicants, isAddApplicant]);

  /**
   * This callback will get the loanApplication from localStorage sets
   * the corresponding applicants property to its state if
   * showTable and isAddApplicant is false
   */
  useEffect(() => {
    if (!showTable && !isAddApplicant) {
      if (applicantsList.length) {
        handleEdit(applicantsList[0]);
      }
    }
  }, [showTable, isAddApplicant, applicantsList]);

  /**
   * Auto Fill all fields if the user is navigated from review application using edit button
   */
  useEffect(() => {
    if (isAddApplicant && showApplicant && applicants) {
      if (applicants.content.length) {
        handleEdit(applicants.content[0], 0);
      }
    }
  }, [showTable, isAddApplicant, showApplicant, applicants]);

  /**
   * Sets user entered to localStorage if showtable is false if
   * showtable is true it will update the detail to caregiver
   * list if applicantIndex has value and limitreached is false
   * if applicantIndex is empty it will append the details to caregiver
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showTable && !isAddApplicant) {
      const applicants = {};
      applicants.firstName = captalizeEveryWordOfSentence(firstName);
      applicants.middleName = captalizeEveryWordOfSentence(middleName);
      applicants.lastName = captalizeEveryWordOfSentence(lastName);
      applicants.age = age;
      applicants.id = applicantId;
      applicants.mobile = mobile;
      applicants.gender = gender.toUpperCase();
      applicants.email = email;
      applicants.relationToPatient = relationToPatient;
      const data = {
        applicants: [applicants],
      };

      dispatch(vbcProgramSteps(data, 3));
    } else if (showTable && !isAddApplicant && !limitReached) {
      if (applicantIndex || applicantIndex === 0) {
        const applicantList = [...caregiversList];
        applicantList[applicantIndex] = {
          fullName: captalizeEveryWordOfSentence(
            `${firstName} ${middleName} ${lastName}`
          ),
          header: captalizeEveryWordOfSentence(
            `${firstName} ${middleName} ${lastName}`
          ),
          firstName: captalizeEveryWordOfSentence(firstName),
          middleName: captalizeEveryWordOfSentence(middleName),
          lastName: captalizeEveryWordOfSentence(lastName),
          email,
          id: applicantId,
          age,
          mobile,
          gender: capitalizeFirstLetter(gender),
          relationToPatient: relationToPatient,
        };
        setCaregiversList(applicantList);
      } else {
        setCaregiversList((prevData) => [
          ...prevData,
          {
            fullName: captalizeEveryWordOfSentence(
              `${firstName} ${middleName} ${lastName}`
            ),
            header: captalizeEveryWordOfSentence(
              `${firstName} ${middleName} ${lastName}`
            ),
            firstName: captalizeEveryWordOfSentence(firstName),
            middleName: captalizeEveryWordOfSentence(middleName),
            lastName: captalizeEveryWordOfSentence(lastName),
            email,
            id: applicantId,
            age,
            mobile,
            gender: capitalizeFirstLetter(gender),
            relationToPatient: relationToPatient,
          },
        ]);
      }
      clearState();
    } else if (!showTable && isAddApplicant) {
      if (applicantIndex || applicantIndex === 0) {
        const data = {
          firstName: captalizeEveryWordOfSentence(firstName),
          middleName: captalizeEveryWordOfSentence(middleName),
          lastName: captalizeEveryWordOfSentence(lastName),
          email,
          age: parseInt(age),
          mobile,
          id: applicantId,
          gender: gender.toUpperCase(),
          relationToPatient: relationToPatient,
        };
        const onSuccess = (response) => {
          if (response.message) {
            dispatch(setToast(response.message, true, 'success'));
          }
          clearState();
          dispatch(getEnrollForVbc());
          return {
            type: SET_READ_APPLICANTS_LIST,
            payload: null,
          };
        };
        if (!isEditDisabled) {
          dispatch(updateApplicant(applicantId, data, onSuccess));
        }
      } else {
        const data = {
          firstName: captalizeEveryWordOfSentence(firstName),
          middleName: captalizeEveryWordOfSentence(middleName),
          lastName: captalizeEveryWordOfSentence(lastName),
          email,
          age: parseInt(age),
          mobile,
          gender: gender.toUpperCase(),
          relationToPatient: relationToPatient,
        };
        const onSuccess = (response) => {
          if (response.message) {
            dispatch(setToast(response.message, true, 'success'));
          }
          clearState();
          dispatch(getEnrollForVbc());
          return {
            type: SET_READ_APPLICANTS_LIST,
            payload: null,
          };
        };
        if (!isEditDisabled) {
          dispatch(createApplicant(data, onSuccess));
        }
      }
    }
  };

  /**
   * Clear all states
   */
  const clearState = () => {
    setApplicantIndex('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setEmail('');
    setAge('');
    setMobile('');
    setGender('');
    setApplicantId('');
    setRelationToPatient('');
    setisEditing(false);
  };
  /**
   * push the user to next step and set the user enter caregiversList to loanApplication localStorage
   *
   */
  const handleClickProceed = () => {
    if (!caregiversList.length) return;
    const applicants = caregiversList.map((applicant) => {
      return {
        age: applicant.age,
        email: applicant.email,
        firstName: captalizeEveryWordOfSentence(applicant.firstName),
        fullName: captalizeEveryWordOfSentence(applicant.fullName),
        gender: applicant.gender.toUpperCase(),
        header: applicant.header,
        id: applicant?.id ? applicant.id : '',
        lastName: captalizeEveryWordOfSentence(applicant.lastName),
        middleName: captalizeEveryWordOfSentence(applicant.middleName),
        mobile: applicant.mobile,
        relationToPatient: applicant.relationToPatient,
      };
    });
    const reqData = {
      applicants,
    };
    dispatch(vbcProgramSteps(reqData, 3));
  };
  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidation = (value) => {
    if (!isEditing) {
      setEmail(value);
      setEmailWarning(emailValidator(value));
    }
  };
  /**
   * Validates the Mobile Number and set warning if
   * regex test fails
   * @param {String} value
   */
  const mobileValidation = (value) => {
    if (!isEditing) {
      setMobile(value);
      setMobileWarning(mobileValidator(value));
    }
  };

  /**
   * The function validates if the input value is a positive integer and sets a warning if it is not.
   */
  const ageValidator = (value) => {
    if (!isEditing) {
      setAge(value);
      if (isNaN(parseInt(value)) || parseInt(value) <= 0) setAgeWarning(true);
      else setAgeWarning(false);
    }
  };
  /**
   * Set the value properties to corresponding states and set the applicant index
   * @param {Object} value
   * @param {Integer} indx
   */
  const handleEdit = (value, index, type) => {
    if (index || index === 0) {
      setApplicantIndex(index);
    }
    if (type === 'stop-editing') setisEditing(true);
    setFirstName(value?.firstName || '');
    setMiddleName(value?.middleName || '');
    setLastName(value?.lastName || '');
    setEmail(value?.email || '');
    setAge(value?.age || '');
    setMobile(value?.mobile || '');
    setGender(value?.gender || '');
    setApplicantId(value?.id || '');
    setRelationToPatient(value?.relationToPatient || '');
  };

  /**
   * Deletes the applicant using index passed as argument
   * @param {Integer} index
   */
  const handleDelete = (index, id) => {
    if (id) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'warning'));
        }
        dispatch(getEnrollForVbc());
        return {
          type: SET_READ_APPLICANTS_LIST,
          payload: null,
        };
      };
      dispatch(deleteApplicant(id, onSuccess));
    }
    const applicantList = [...caregiversList];
    applicantList.splice(index, 1);
    setCaregiversList(applicantList);
  };
  const handleModalClose = () => {
    setDeleteModal({...deleteModal, on: false});
  };
  const onStartDeleteApplicant = (index, id) => {
    setDeleteModal({...deleteModal, on: true, applicant: {id, index}});
  };
  const onConfirmDeleteApplicant = (applicant) => {
    // console.log('APPLICANT DELETED=>', applicant?.id, applicant.index);
    handleDelete(applicant?.index, applicant?.id);
  };

  // console.log('APPLICANT=>', applicants);

  return (
    <React.Fragment>
      <CustomModal
        Show={deleteModal.on}
        title={''}
        handleClose={handleModalClose}
        // cssClass={'privacy-modal'}
        closeButton={true}
        deleteModalText={t('confirmDelete')}
        onConfirmDelete={() => onConfirmDeleteApplicant(deleteModal.applicant)}>
        <div></div>
      </CustomModal>
      <div className="add-application">
        {!isEditDisabled && (
          <Form onSubmit={handleSubmit}>
            <div className="page-container p-4 mt-3">
              {!isAddApplicant && (
                <div className="d-flex flex-row align-items-center title mb-2">
                  <AddApplicantIcon fill="#28252e" width="20" height="20" />
                  <h4 className="ms-2 mb-0 white-space-nowrap">
                    {isLoanAgainstFinancialAssistance
                      ? t('applicants:addApplicantsUpToFive')
                      : t('applicants:addApplicant')}
                    :
                  </h4>
                </div>
              )}

              <Row>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span> {t('firstName')} :
                  </Form.Label>
                  <Form.Control
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>{t('middleName')}:</Form.Label>
                  <Form.Control
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span> {t('lastName')} :
                  </Form.Label>
                  <Form.Control
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    <span className="patient-color">*</span> {t('age')}:
                  </Form.Label>
                  <Form.Control
                    required
                    value={age}
                    isInvalid={ageWarning}
                    onChange={(e) => ageValidator(e.target.value)}
                    type="number"
                  />
                  {ageWarning && (
                    <Form.Control.Feedback type="invalid">
                      {'Enter Valid age'}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span> {t('gender')} :
                  </Form.Label>
                  <Form.Control
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    as="select">
                    <option value="" hidden>
                      {t('gender')}
                    </option>
                    <option value="MALE">{t('male')}</option>
                    <option value="FEMALE">{t('female')}</option>
                    {/* <option value="THEY">{t("they")}</option> */}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span> {t('mobile')} :
                  </Form.Label>
                  <Form.Control
                    isInvalid={mobileWarning}
                    required
                    value={mobile}
                    onChange={(e) => mobileValidation(e.target.value)}
                    type="number"
                  />
                  {mobileWarning && (
                    <Form.Control.Feedback type="invalid">
                      {t('inValidMobile')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span> {t('email')} :
                  </Form.Label>
                  <Form.Control
                    isInvalid={emailWarning}
                    required
                    value={email}
                    onChange={(e) => emailValidation(e.target.value)}
                    type="email"
                  />{' '}
                  {emailWarning && (
                    <Form.Control.Feedback type="invalid">
                      {t('inValidEmailAddress')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-sm-12 col-md-6 col-lg-4 mb-2">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>{' '}
                    {t('relationshipWithPatient')} :
                  </Form.Label>
                  <Form.Control
                    required
                    value={checkMasterValue(
                      relationToPatient,
                      masterData?.relationships
                    )}
                    onChange={(e) => setRelationToPatient(e.target.value)}
                    as="select">
                    <option value="" hidden>
                      {t('relationshipWithPatient')}
                    </option>
                    {masterData?.relationships.map(({id, name}) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>
              <p className="m-0 mt-3">
                {isNote &&
                  `Note: The loan against caregiver's FD only allows you to add one applicant on your behalf.`}
              </p>
              {isAddApplicant && (
                <div className="d-flex flex-row align-items-center pb-2">
                  <button
                    type="button"
                    onClick={clearState}
                    className="btn-patient-theme bg-dark">
                    {t('applicants:back')}
                  </button>
                  {applicantId ? (
                    <button className=" btn-patient-theme ms-3">
                      {t('applicants:update')}
                    </button>
                  ) : (
                    <button
                      disabled={
                        limitReached ||
                        emailWarning ||
                        mobileWarning ||
                        ageWarning
                      }
                      className=" btn-patient-theme ms-3">
                      {t('applicants:save')}
                    </button>
                  )}
                </div>
              )}
              {showTable && (
                <>
                  {' '}
                  <button
                    onClick={clearState}
                    type="button"
                    className="btn-patient-theme bg-dark">
                    {t('clearAll')}
                  </button>
                  <button
                    className=" btn-patient-theme ms-3"
                    disabled={
                      limitReached ||
                      emailWarning ||
                      mobileWarning ||
                      ageWarning
                    }
                    type="submit">
                    {t('save')}
                  </button>
                </>
              )}
              {showTable && caregiversList.length > 0 && (
                <>
                  <div className="px-4 py-5 d-none d-md-block">
                    <TableComponent
                      component={'applicant-listing'}
                      tableHeadersData={tableHeadersApplicant}
                      tableData={caregiversList.map((v, index) =>
                        Object.assign(v, {
                          button: (
                            <>
                              <button
                                onClick={() =>
                                  handleEdit(v, index, 'stop-editing')
                                }
                                type="button"
                                className="btn-patient-theme bg-dark">
                                {t('edit')}
                              </button>
                              <button
                                onClick={() => onStartDeleteApplicant(index)}
                                type="button"
                                className="btn-patient-theme ms-3">
                                {t('delete')}
                              </button>
                            </>
                          ),
                        })
                      )}
                      classes={'applicant-table '}
                      noCheck
                      headerClasses=""
                    />
                  </div>
                  <MobileTable
                    tableClasses="document-accordion mt-4"
                    tableData={caregiversList.map((v, index) =>
                      Object.assign(v, {
                        button: (
                          <>
                            <button
                              onClick={() =>
                                handleEdit(v, index, 'stop-editing')
                              }
                              type="button"
                              className="btn-patient-theme bg-dark">
                              {t('edit')}
                            </button>
                            <button
                              onClick={() => onStartDeleteApplicant(index)}
                              type="button"
                              className="btn-patient-theme ms-3">
                              {t('delete')}
                            </button>
                          </>
                        ),
                      })
                    )}
                    tableHeader={tableHeadersApplicant}
                  />
                </>
              )}
            </div>

            {!isAddApplicant && (
              <div className="d-flex flex-row mt-4">
                <button
                  onClick={() => handleClick('prev')}
                  className="btn-patient-theme bg-dark me-2">
                  {t('back')}
                </button>
                {showTable ? (
                  <button
                    onClick={handleClickProceed}
                    disabled={!caregiversList.length}
                    type={!showTable ? 'submit' : 'button'}
                    className="btn-patient-theme w-auto px-4">
                    {t('saveAndProceed')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-patient-theme w-auto px-4"
                    disabled={emailWarning || mobileWarning || ageWarning}>
                    {t('saveAndProceed')}
                  </button>
                )}
              </div>
            )}
          </Form>
        )}
        {isAddApplicant && caregiversList.length > 0 && (
          <>
            <div className="p-4 page-container mt-4 d-none d-md-block">
              <TableComponent
                component={'applicant-listing'}
                tableHeadersData={
                  applicants?.paymentTypeOpted ===
                  PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD
                    ? tableHeadersVbcCaregiver
                    : tableHeadersVbcApplicant
                }
                tableData={
                  applicants &&
                  !applicants.notEnrolled &&
                  caregiversList.map((v, index) =>
                    Object.assign(v, {
                      button: (
                        <>
                          {!isEditDisabled && (
                            <>
                              <button
                                onClick={() =>
                                  handleEdit(v, index, 'stop-editing')
                                }
                                type="button"
                                className="btn-patient-theme bg-dark">
                                {t('edit')}
                              </button>
                              <button
                                onClick={() =>
                                  onStartDeleteApplicant(index, v.id)
                                }
                                type="button"
                                className="btn-patient-theme ms-3">
                                {t('delete')}
                              </button>{' '}
                            </>
                          )}
                        </>
                      ),
                    })
                  )
                }
                classes={'applicant-table'}
                noCheck
                headerClasses=""
              />
            </div>
            <MobileTable
              tableClasses="document-accordion mt-3"
              tableData={
                applicants &&
                !applicants.notEnrolled &&
                caregiversList.map((v, index) =>
                  Object.assign(v, {
                    button: (
                      <>
                        {!isEditDisabled && (
                          <>
                            <button
                              onClick={() =>
                                handleEdit(v, index, 'stop-editing')
                              }
                              type="button"
                              className="btn-patient-theme bg-dark">
                              {t('edit')}
                            </button>
                            <button
                              onClick={() =>
                                onStartDeleteApplicant(index, v.id)
                              }
                              type="button"
                              className="btn-patient-theme ms-3">
                              {t('delete')}
                            </button>{' '}
                          </>
                        )}
                      </>
                    ),
                  })
                )
              }
              tableHeader={
                applicants?.paymentTypeOpted ===
                PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD
                  ? tableHeadersVbcCaregiver
                  : tableHeadersVbcApplicant
              }
            />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

AddApplicant.propTypes = {
  isNote: PropTypes.bool,
  handleClick: PropTypes.func,
  showTable: PropTypes.bool,
};
export default AddApplicant;
