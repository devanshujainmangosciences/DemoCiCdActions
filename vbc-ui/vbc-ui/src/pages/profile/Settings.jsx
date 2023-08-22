/**
 * This component is used to render Setting page for Applicant, Patient,Doctor and ME
 * The Settings pafe consist of password change,language change and verifying mobile and email
 */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {i18nLanguages} from '../../i18n/resources';
import {
  EmailNotVerifiedIcon,
  EmailVerifiedIcon,
  LanguageIcon,
  MobileNotVerifiedIcon,
  MobileVerifiedIcon,
  SettingsIcon,
} from '../../assets/icons';
import TitleContainer from '@/components/TitleContainer';
import {Form} from '@themesberg/react-bootstrap';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {
  myProfile,
  sendVerificationOtp,
  updateChangePasswordStatus,
  verifyOtp,
} from '@/actions';
import {SELECTED_ROLE_NAME} from '../../constants';
import {secureLocalStorage} from '@/services/web.storage';

const Settings = () => {
  const {t} = useTranslation(['myProfile,settings']);
  const {i18n} = useTranslation(['myProfile']);
  const selectedRole = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
  const isApplicant = selectedRole === 'applicant';
  const isPatient = selectedRole === 'patient';
  const isOther = isApplicant || isPatient;
  // console.log('IS OTHER=>', isOther);

  const dispatch = useAppDispatch();
  const [isShowLanguage, setIsShowLanguage] = useState(false);
  const myProfileData = useAppSelector((state) => state.app.myProfile);
  const [emailMobile, setemailMobile] = useState({
    email: false,
    mobile: false,
  });

  /** This is a `useEffect` hook that is used to fetch the user's profile data (`myProfileData`) if it is
not already available and the user is an applicant or a patient (`isOther`). It depends on the
`dispatch` and `myProfileData` variables, and will be triggered whenever either of them changes. The
`myProfile` action is dispatched with the `isApplicant` flag to determine which type of user profile
to fetch. */
  useEffect(() => {
    if (!myProfileData && isOther) {
      dispatch(myProfile(isApplicant));
    }
  }, [dispatch, myProfileData]);

  const {email, mobile} = emailMobile;

  const [otpEntered, setotpEntered] = useState({
    email: '',
    mobile: '',
  });

  /** handle language selection */
  const handlePressChangeLanguage = (event) => {
    const value = event.target.value;
    i18n.changeLanguage(value);
  };

  const languages = [...i18nLanguages];

  const handleClickSave = () => {};

  /**
   *
   * @param {String} type
   * Sends the verification otp to mobile or email depending on the type
   */
  const handleVerify = (type) => {
    let reqBody;
    if (type === 'email')
      reqBody = {
        email: myProfileData?.email,
      };
    else
      reqBody = {
        phone: myProfileData?.mobile,
      };

    const customOnSuccess = () => {
      setemailMobile({...emailMobile, [type]: true});
    };

    dispatch(sendVerificationOtp(reqBody, isApplicant, customOnSuccess));
  };
  const handleOtpChange = (e, type) => {
    setotpEntered({...otpEntered, [type]: e.target.value});
  };

  /**
   *
   * @param {*} e Javascript event, Used for submitting the OTP when submit button it clicked
   */
  const handleSubmitOtp = (e) => {
    // if (otpEntered) setisVerifyClicked(false);
    e.preventDefault();

    if (email && myProfileData?.email && otpEntered?.email) {
      const reqData = {
        email: myProfileData?.email,
        otp: otpEntered?.email,
        phone: '',
      };
      const onSuccess = () => {
        setemailMobile({...emailMobile, email: false});
        setotpEntered({...otpEntered, email: ''});
      };
      dispatch(verifyOtp(reqData, isApplicant, onSuccess));
    } else if (mobile && myProfileData?.mobile && otpEntered?.mobile) {
      const reqData = {
        email: '',
        phone: myProfileData?.mobile,
        otp: otpEntered?.mobile,
      };

      const onSuccess = () => {
        setemailMobile({...emailMobile, email: false});
        setotpEntered({...otpEntered, email: ''});
      };

      dispatch(verifyOtp(reqData, isApplicant, onSuccess));
    }
  };

  /**
   *
   * @param {Boolean} ifVerified
   * @returns Component
   */

  const renderBadge = (ifVerified, type) => {
    if (type === 'email') {
      return ifVerified ? (
        <EmailVerifiedIcon fill="#4f4d53" />
      ) : (
        <EmailNotVerifiedIcon fill="#4f4d53" />
      );
    } else {
      return ifVerified ? (
        <MobileVerifiedIcon fill="#4f4d53" />
      ) : (
        <MobileNotVerifiedIcon fill="#4f4d53" />
      );
    }
  };

  /** The above code is a JavaScript React function that renders a button based on certain conditions. If
the value is not verified and there is a value present, it checks if the email or mobile number is
present. If it is not present, it renders a button with the text "verify". If it is present, it
renders an input field for entering OTP and a submit button. The function takes in three parameters:
isValue (boolean), isVerified (boolean), and type (string).
 * @param {Boolean} isValue 
 * @param {Boolean} isVerified 
 * @param {String} type 
*/

  const renderVerifyButton = (isValue, isVerified, type) => {
    if (!isVerified && isValue) {
      if (!emailMobile[type]) {
        return (
          <div className="col">
            <button
              type="submit"
              onClick={() => handleVerify(type)}
              className={`btn-patient-theme ${!isOther && 'bg-admin'}`}>
              {t('settings:verify')}
            </button>
          </div>
        );
      } else {
        return (
          <>
            <div className="mb-3">
              <div className="">
                <p className="mb-1">{t('settings:enterOtp')}:</p>
                <input
                  type="text"
                  value={otpEntered[type]}
                  onChange={(e) => handleOtpChange(e, type)}
                  required
                  className="input-normal"
                />
              </div>
            </div>
            <div className="">
              <button
                onClick={handleSubmitOtp}
                type="submit"
                className={`btn-patient-theme px-4  ${!isOther && 'bg-admin'}`}>
                {t('settings:submit')}
              </button>
            </div>
          </>
        );
      }
    }
  };

  // const changePasswordStatus = (value) => {
  //   dispatch(updateChangePasswordStatus(value));
  //   if (!value) forceLogout();
  // };

  /**
   * The function opens a new window to change the user's password using a URL from an environment
   * variable.
   */
  const onChangePasswordClick = () => {
    window.open(import.meta.env.VITE_CHANGE_USER_PASSWORD);
  };

  return (
    <>
      {/* 
      TO DO: Show modal when clicking on change password
      <CustomModal
        Show={showModal}
        title={'Password Changed has been triggred'}
        // handleClose={() => dispatch(updateChangePasswordStatus(false))}
      >
        <p>Please logout and login again to avoid any issues</p>
        <button
          type="button"
          onClick={() => changePasswordStatus(false)}
          className=" btn-patient-theme">
          Logout
        </button>
      </CustomModal> */}
      <TitleContainer
        icon={<SettingsIcon fill="#fff" />}
        title={t('settings:settings')}
      />
      {!isShowLanguage ? (
        <>
          <div className="d-flex flex-row mt-4">
            {/* <Link
              to={{pathname: import.meta.env.VITE_CHANGE_USER_PASSWORD}}
              // onClick={() => changePasswordStatus(true)}
              target="_blank"> */}
            <button
              className="btn-patient-theme-small bg-dark px-4"
              onClick={onChangePasswordClick}>
              {t('settings:changePassword')}
            </button>
            {/* </Link> */}
            {/* To-Do :- Need to include this button when implementing language change in settings page*/}
            {/* <button
              onClick={() => setIsShowLanguage(!isShowLanguage)}
              className={`btn-patient-theme px-4 ms-3 ${
                !isOther && 'bg-admin'
              }`}>
              {t('settings:changeLanguage')}
            </button> */}
          </div>
          <div className="h-auto mt-4">
            {myProfileData?.email && (
              <>
                <div className="item p-4 settings-item mb-3">
                  <div className="settings-verify mb-3">
                    <div>
                      <label className="fw-normal pb-1">
                        {t('settings:email')}:
                      </label>
                      <input
                        type="text"
                        value={myProfileData?.email}
                        name="email"
                        disabled
                        required
                        className="input-normal"
                      />
                    </div>
                    <div className="badge">
                      {renderBadge(myProfileData?.emailVerified, 'email')}
                    </div>
                  </div>
                  {renderVerifyButton(
                    myProfileData?.email,
                    myProfileData?.emailVerified,
                    'email'
                  )}
                </div>
              </>
            )}

            {myProfileData?.mobile && (
              <>
                <div className="item p-4 settings-item mb-3">
                  <div className="settings-verify mb-3">
                    <div>
                      <label className="fw-normal pb-1">
                        {t('settings:mobile')}:
                      </label>
                      <input
                        type="text"
                        value={myProfileData?.mobile}
                        name="mobile"
                        disabled
                        required
                        className="input-normal"
                      />
                    </div>
                    <div className="badge">
                      {renderBadge(myProfileData?.mobileVerified, 'mobile')}
                    </div>
                  </div>
                  {renderVerifyButton(
                    myProfileData?.mobile,
                    myProfileData?.mobileVerified,
                    'mobile'
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="settings-container">
          <div>
            <div className="d-flex align-items-center flex-row title ps-3 pb-2">
              <LanguageIcon fill="#28252e" width="20" height="20" />
              <span>{t('settings:accountLanguage')} :</span>
            </div>
            <Form.Group className="form-group">
              <Form.Label>{t('settings:language')} :</Form.Label>
              <Form.Control onChange={handlePressChangeLanguage} as="select">
                {languages.map(({name, value, hidden}) => {
                  if (name !== 'French')
                    return (
                      <option key={value} hidden={hidden} value={value}>
                        {name}
                      </option>
                    );
                })}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="d-flex flex-row mt-4 ms-6">
            <button
              onClick={() => setIsShowLanguage(!isShowLanguage)}
              className="btn-patient-theme bg-dark px-5">
              {t('settings:cancel')}
            </button>
            <button
              onClick={handleClickSave}
              className={`btn-patient-theme px-5 ms-3 ${
                !isOther && 'bg-admin'
              }`}>
              {t('settings:save')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
