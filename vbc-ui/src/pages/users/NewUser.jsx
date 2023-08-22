/**
 * This Component renders a Form to Create a new User or Update a existing User.
 * This Component gets showUser, user, allRoles, rolesList
 * from Redux as props and  match, history is mapped to props
 * which is used to navigate and get url details.
 * This component reads the User id if it is present in url and retrieve the User
 * details with User id and allow the user to edit
 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Form, Container, Card} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {Multiselect} from 'multiselect-react-dropdown';
import {createUser, showUser, updateUser} from '../../actions/userActions';
import {rolesList, setToast} from '@/actions';
import {Routes} from '@/routes';
import InputForm from '@/pages/profile/children/InputForm';
import {
  ALERT_MESSAGE,
  EMAIL_REGEX,
  MOBILE_NUMBER_REGEX,
  ROLES,
} from '../../constants';
import {
  addationSelect,
  dobValidator,
  // onRemoveItem,
  // onSelectItem,
} from '@/services/utility';
import GoBack from '@/components/GoBack';
import RoutePage from '@/components/RoutePage';
import {Can} from '@/components';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CustomReactSelect from '@/components/CustomReactSelect';
import {genderData} from '@/data/genericData';

const NewUser = (props) => {
  const {t} = useTranslation(['newUser']);
  const {showUser, user, allRoles, rolesList, setToast, paginationInRoleList} =
    props;
  const totalRolesAvaliableInRoleList = paginationInRoleList?.totalElements;

  const history = useNavigate();
  const [field, setField] = useState(null);

  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailWarning, setEmailWarning] = useState(false);
  const [mobileWarning, setMobileWarning] = useState(false);
  const [dobWarning, setDobWarning] = useState(false);
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [isView, setisView] = useState(false);
  const location = useLocation();
  const urlParams = useParams();
  const user_id = urlParams.id;
  const stateRecieved = location?.state;

  /**
   * Dispatch rolesList when allRoles is empty
   */
  useEffect(() => {
    if (
      !allRoles ||
      (totalRolesAvaliableInRoleList &&
        totalRolesAvaliableInRoleList !== allRoles?.length)
    ) {
      rolesList();
    }
  }, [rolesList, allRoles, totalRolesAvaliableInRoleList]);

  /**
   * Set the converted allRoles to the state when allRoles has value in it
   */
  useEffect(() => {
    if (allRoles) {
      const converted = allRoles
        .map((object) => ({
          value: object.id,
          label: object.name,
        }))
        .filter(
          (item) =>
            !(item.label === ROLES.DOCTOR || item.label === ROLES.APPLICANT)
        );
      converted.unshift(...addationSelect);
      setRoles(converted);
    }
  }, [allRoles]);

  /**
   * Set user properties to corresponding states if user and user_id has value
   * else it will clear all the state
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === 'View Details') setisView(true);
    if (user && user_id) {
      setEmail(user.email);
      setGender(user.gender);
      setFirstName(user.firstName);
      setMiddleName(user.middleName);
      setLastName(user.lastName);
      setMobile(user.mobile);
      setBirthDate(user.birthDate);
      if (parseInt(user_id) === parseInt(user.id)) {
        setField(
          Object.keys(user.roles).map((item) => ({
            value: parseInt(item),
            label: user.roles[item],
          }))
        );
      }
    } else {
      setEmail('');
      setGender('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setMobile('');
      setBirthDate('');
      setField([]);
    }

    return () => {
      setField(null);
    };
  }, [user, user_id, roles, stateRecieved]);

  /**
   * Dispatch showUser when user_id has value in it
   */
  useEffect(() => {
    if (user_id) {
      showUser(user_id);
    }
  }, [user_id, showUser]);

  /**
   * Handle submit pass the user enter data to updateUser and dispatch it when user_id have value in it
   * else it will pass the data to createUser and dispatch
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      firstName: firstName,
      middleName: middleName,
      birthDate: birthDate,
      lastName: lastName,
      gender: gender,
      mobile: mobile ? mobile : null,
      roles: field
        .map((item) => parseInt(item.value))
        .filter((item) => !isNaN(item)),
    };
    if (!emailWarning && !mobileWarning && !dobWarning) {
      const onSuccess = (response) => {
        history(Routes.Users.path);
        if (response.message) {
          return setToast(response.message, true, 'success');
        }
      };
      if (field && field.length > 0) {
        if (user_id) {
          props.updateUser(user_id, data, onSuccess);
        } else {
          props.createUser(data, onSuccess);
        }
      } else setToast(ALERT_MESSAGE.ROLE_REQUIRED, true, 'warning');
    }
  };
  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidator = (value) => {
    setEmail(value);
    // const regex = new RegExp(EMAIL_REGEX).test(value);
    const regex = value.match(EMAIL_REGEX);
    if (regex || value === '') {
      setEmailWarning(false);
    } else {
      setEmailWarning(true);
    }
  };
  /**
   * Validates the Mobile Number and set warning if
   * regex test fails
   * @param {String} value
   */
  const mobileValidator = (value) => {
    setMobile(value);
    // const regex = new RegExp(MOBILE_NUMBER_REGEX).test(value);
    const regex = value.match(MOBILE_NUMBER_REGEX);
    if (regex || value === '') {
      setMobileWarning(false);
    } else {
      setMobileWarning(true);
    }
  };
  /**
   * Validates the Date of Birth and set warning if
   * regex test fails
   * @param {String} value
   */
  const handleDob = (value) => {
    setBirthDate(value);
    // var myDate = new Date(value);
    // var today = new Date();
    // if (myDate > today) {
    //   setDobWarning(true);
    //   return;
    // }
    setDobWarning(dobValidator(value));
  };

  /**
   * This function updates a field based on the input data, with a special case for removing the first
   * element if it is 'all'.
   * @param {Array} data
   * @param {Object} singleData
   */
  const onMultiSelectInputChange = (data, singleData) => {
    if (singleData?.option?.value === 'all') {
      const newRoles = [...roles];
      newRoles.shift();
      setField(newRoles);
    } else {
      setField(data);
    }
  };

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>
          {user_id && isView
            ? 'View User'
            : user_id
            ? 'Update User'
            : 'Create User'}
        </h3>
        <Form onSubmit={handleSubmit} className="admin-user-add-container">
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('firstName')}
                    ipValue={firstName}
                    lablevalue={firstName}
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    type="text"
                    placeholder={t('enterFirstName')}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('middleName')}
                    ipValue={middleName}
                    lablevalue={middleName}
                    name="middleName"
                    onChange={(e) => setMiddleName(e.target.value)}
                    required={false}
                    type="text"
                    placeholder={t('enterMiddleName')}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('Last Name')}
                    ipValue={lastName}
                    lablevalue={lastName}
                    name="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                    required={false}
                    type="text"
                    placeholder={t('enterLastName')}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('email')}
                    ipValue={email}
                    lablevalue={email}
                    name="email"
                    onChange={(e) => emailValidator(e.target.value)}
                    required
                    type="email"
                    placeholder={t('enterEmail')}
                    isInvalid={emailWarning}
                    warningText="Please enter a valid email address"
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('Gender')}
                    ipValue={gender}
                    lablevalue={gender}
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                    type="select"
                    options={genderData}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('dob')}
                    ipValue={birthDate}
                    lablevalue={birthDate}
                    name="birthDate"
                    onChange={(e) => handleDob(e.target.value)}
                    required={false}
                    type="date"
                    isInvalid={dobWarning}
                    warningText={t('invalidDob')}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    isView={false}
                    readOnly={isView}
                    label={t('mobileNumber')}
                    ipValue={mobile}
                    lablevalue={mobile}
                    name="mobile"
                    onChange={(e) => mobileValidator(e.target.value)}
                    required={false}
                    type="text"
                    isInvalid={mobileWarning}
                    warningText={'Please enter a valid mobile number'}
                    placeholder={t('enterMobileNumber')}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Form.Group controlId="userRole">
                <Form.Label>{t('userRole')}</Form.Label>
                <>
                  <CustomReactSelect
                    isDisabled={isView}
                    onInputChange={onMultiSelectInputChange}
                    optionData={roles}
                    defaultData={field}
                    backgroundColor="#09a6e0"
                    classes="remove-seperator-span-padding"
                  />
                  {/* <Multiselect
                    options={roles}
                    selectedValues={field}
                    closeOnSelect={false}
                    onSelect={(data) => onSelectItem(data, roles, setField)} // Function will trigger on select event
                    onRemove={(data) => onRemoveItem(data, roles, setField)} // Function will trigger on remove event
                    displayValue="label" // Property name to display in the dropdown options
                    showCheckbox={true}
                    disable={isView}
                  /> */}
                </>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <div className="d-flex gap-2">
            <GoBack>
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="button">
                {t('Back')}
              </button>
            </GoBack>
            {isView ? (
              <Can
                performingAction={{
                  component: 'user-listing',
                  action: 'can view editDetails',
                }}>
                <RoutePage url={Routes.UpdateUser.path} id={user_id}>
                  <button
                    className="btn-patient-theme-small bg-dark px-4"
                    type="button"
                    onClick={() => setisView(false)}>
                    Edit
                  </button>
                </RoutePage>
              </Can>
            ) : (
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="submit"
                onSubmit={handleSubmit}>
                {user_id ? 'Update' : 'Add'}
              </button>
            )}
          </div>
        </Form>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.users.usersList,
  allRoles: state.template.rolesList,
  user: state.users.selectedUser,
  paginationInRoleList: state.role.pagination,
});

const mapDispatchToProps = {
  createUser,
  showUser,
  updateUser,
  rolesList,
  setToast,
};
NewUser.propTypes = {
  usersList: PropTypes.array,
  allRoles: PropTypes.array,
  user: PropTypes.object,
  createUser: PropTypes.func,
  showUser: PropTypes.func,
  updateUser: PropTypes.func,
  rolesList: PropTypes.func,
  setToast: PropTypes.func,
  paginationInRoleList: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
