/**
 * Screen component for PBP program
 */
import React, {useState, useCallback, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {application} from 'assets/icons';
import {Container, AppText, Loader} from 'components';
import {
  getDrugScheduleApiCall,
  getMasterDataApiCall,
  getVbcProgramEnrollmentApiCall,
  getVbcScheduleApiCall,
} from 'apis';
import {VBCProgramPaymentFramework} from 'constants';
import {
  saveVbcProgramDataAction,
  getVbcProgramVbcScheduleAction,
  getVbcProgramDrugScheduleAction,
} from 'actions';
import {transformGetVbcProgramEnrollmentApiData} from './formatter';
import {vbcProgramOptions} from './vbcProgramOptions';
import styles from './styles';
import {MASTER_DATA_FINANCE_PATIENT} from 'constants';

const VbcProgram = () => {
  const dispatch = useDispatch();
  const vbcProgramState = useSelector((state) => state.vbcProgram);
  const loginState = useSelector((state) => state.login);

  const {userPermissions} = loginState;

  const {
    vbcProgramVbcScheduleData: vbcScheduleData,
    vbcProgramDrugScheduleData: drugScheduleData,
    vbcProgramUserCurrentStep,
    vbcProgramStepAddApplicant,
    vbcProgramStep1,
  } = vbcProgramState;
  const {loginData} = useSelector((state) => state.login);
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(true);

  const {t} = useTranslation(['sidebar']);

  useEffect(() => {
    fetchMasterDataService();
  }, []);

  /** Fetch vbc program data whenever vbc program screen is focussed */
  useFocusEffect(
    useCallback(() => {
      fetchVbcProgramService();
    }, [])
  );

  // fetch master data based on if we jave states in master data as My Profile has dependency on states
  const fetchMasterDataService = async () => {
    const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
      MASTER_DATA_FINANCE_PATIENT
    );
    return masterDataApiResponse;
  };

  /** calling api to fetch vbc program details */
  const fetchVbcProgramService = async () => {
    const {access_token} = loginData;
    setLoading(true);
    const {apiResponse, apiError} = await getVbcProgramEnrollmentApiCall(
      access_token
    );
    if (apiResponse) {
      const transformedData = transformGetVbcProgramEnrollmentApiData(
        apiResponse.data?.data
      );
      /** saving the api data to redux store */
      dispatch(saveVbcProgramDataAction(transformedData));
      fetchVbcScheduleService(transformedData.drugId);
    } else if (apiError) {
      setLoading(false);
    }
  };

  /** calling api to fetch vbc schedule */
  const fetchVbcScheduleService = async (drugId) => {
    const {access_token} = loginData;
    const {apiResponse, apiError} = await getVbcScheduleApiCall(
      drugId,
      access_token
    );
    if (apiResponse) {
      /** saving the api data to redux store */
      dispatch(
        getVbcProgramVbcScheduleAction(
          apiResponse.data?.data.sort((a, b) => a.id - b.id)
        )
      );
      fetchDrugScheduleService();
    } else if (apiError) {
      setLoading(false);
    }
  };

  /** calling api to fetch drug schedule */
  const fetchDrugScheduleService = async () => {
    const {access_token} = loginData;
    const {apiResponse, apiError} = await getDrugScheduleApiCall(access_token);
    if (apiResponse) {
      /** saving the api data to redux store */
      dispatch(getVbcProgramDrugScheduleAction(apiResponse.data?.data));
      setLoading(false);
    } else if (apiError) {
      setLoading(false);
    }
  };

  /** handling navigation */
  const handleNavigation = (type) => () => {
    if (type === 'application') {
      const stepToBeNavigated = vbcProgramUserCurrentStep;
      let routeToBeNavigated;
      switch (stepToBeNavigated) {
        case 0: {
          routeToBeNavigated = 'VbcProgramTerms';
          break;
        }
        case 1: {
          routeToBeNavigated = 'VbcProgramStep2';
          break;
        }
        case 2: {
          if (
            vbcProgramStep1 ===
              VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE ||
            vbcProgramStep1 ===
              VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD
          ) {
            routeToBeNavigated = 'VbcProgramAddApplicant';
          } else {
            routeToBeNavigated = 'VbcProgramStep3';
          }
          break;
        }
        case 3: {
          routeToBeNavigated = 'VbcProgramStep4';
          break;
        }
        default: {
          routeToBeNavigated = 'VbcProgramStep4';
          break;
        }
      }
      navigate(routeToBeNavigated);
    } else if (type === 'applicants') {
      navigate('Applicants');
    } else if (type === 'VbcSchedule') {
      navigate('VbcSchedule');
    } else if (type === 'DrugSchedule') {
      navigate('DrugSchedule');
    }
  };

  const renderSubTitle = (label) => {
    const totalApplicants =
      vbcProgramUserCurrentStep === 4 && vbcProgramStepAddApplicant
        ? vbcProgramStepAddApplicant.length
        : 0;
    switch (label) {
      case 'application': {
        const applicationNote =
          vbcProgramUserCurrentStep === 4
            ? t('checkDetails')
            : t('startApplication');
        return applicationNote;
      }
      case 'patient-applicant': {
        const applicantNote = `${totalApplicants} ${t('applicantsAdded')}`;
        return applicantNote;
      }
      case 'vbc-schedule': {
        const vbcScheduleNote =
          vbcScheduleData?.length > 0
            ? t('viewDetails')
            : t('noSchedulesToDisplay');
        return vbcScheduleNote;
      }
      case 'drug-schedule': {
        const drugScheduleNote =
          drugScheduleData?.content?.length > 0
            ? t('viewDetails')
            : t('noSchedulesToDisplay');
        return drugScheduleNote;
      }
      default: {
        return '';
      }
    }
  };

  //renders pbp program options
  const renderOptions = (item) => {
    return (
      <>
        {item.label === 'vbc-schedule' &&
        !userPermissions?.data?.flags?.showSchedule ? null : (
          <Container
            style={styles.containerContainer}
            onPressEvent={handleNavigation(item.navigationKey)}>
            <View style={styles.containerInner}>
              <View style={styles.textContainerInner}>
                <AppText style={styles.heading}>{t(item.label)}</AppText>
                <AppText style={styles.desc}>
                  {renderSubTitle(item.label)}
                </AppText>
              </View>
              <View style={styles.iconContainerInner}>
                <View style={styles.iconContainer}>
                  <Image
                    source={application}
                    resizeMode={'contain'}
                    style={styles.icon}
                  />
                </View>
              </View>
            </View>
          </Container>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {vbcProgramOptions.map((item) => renderOptions(item))}
    </View>
  );
};

export default VbcProgram;
