/**
 * Screen component for Reports Detail
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Loader} from 'components';
import {getReportsApiCall} from 'apis';
import {getMonthFromString} from 'utils';
import styles from './styles';
import LabReportDetail from './LabReportDetail';
import RadiologyReportDetail from './RadiologyReportDetail';
import MedicationReportDetail from './MedicationReportDetail';
import ClinicalNotesReportDetail from './ClinicalNotesReportDetail';
import RadiationTherapyReportDetail from './RadiationTherapyReportDetail';
import OtherTreatmentsReportDetail from './OtherTreatmentsReportDetail';
import SurgeryReportDetail from './SurgeryReportDetail';
import OtherTestsReportDetail from './OtherTestsReportDetail';
import {REPORT_TYPES} from 'constants/appConstants';

const ReportDetail = ({
  route: {
    params: {month, year, category, reportType},
  },
  navigation,
}) => {
  const {loginData} = useSelector((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [reportsData, setReportsData] = useState({});

  useEffect(() => {
    setHeaderTitle();
  }, []);

  // convert medication category typeds to correct convention since API is returning wrong formatright now
  const convertMedicationName = (name) => {
    if (name === 'Non Cancer medication') return `Non-Cancer Medication`;
    else if (name === 'Cancer medication') return `Cancer Medication`;
    else {
      let reqName;
      const names = name.split(' ');
      names.map((item) => {
        if (reqName)
          reqName =
            reqName +
            item.charAt(0).toUpperCase() +
            item.slice(1).toLowerCase() +
            ' ';
        else
          reqName =
            item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() + ' ';
      });
      return reqName;
    }
  };

  /** calling api to fetch report detail */
  const fetchReportsDetailService = async () => {
    setLoading(true);
    const {access_token} = loginData;

    const {apiResponse, apiError} = await getReportsApiCall(
      reportType,
      access_token,
      getMonthFromString(month),
      year,
      category
    );
    if (apiResponse) {
      setReportsData(apiResponse.data);
      setLoading(false);
    } else if (apiError) {
      setLoading(false);
    }
  };

  /** call api service to fetch report detail */
  useEffect(() => {
    if (reportType !== REPORT_TYPES.MEDICATION) {
      fetchReportsDetailService();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.fullPageLoadingContainer}>
        <Loader />
      </View>
    );
  }

  /** handling navigation */
  const renderReportDetail = () => {
    switch (reportType) {
      case REPORT_TYPES.LAB: {
        return <LabReportDetail reportsData={reportsData} />;
      }
      case REPORT_TYPES.RADIOLOGIES: {
        return <RadiologyReportDetail reportsData={reportsData} />;
      }
      case REPORT_TYPES.SURGERY: {
        return <SurgeryReportDetail reportsData={reportsData} />;
      }
      case REPORT_TYPES.MEDICATION: {
        return (
          <MedicationReportDetail
            month={month}
            year={year}
            category={category}
          />
        );
      }
      case REPORT_TYPES.OTHER_TESTS: {
        return <OtherTestsReportDetail reportsData={reportsData} />;
      }
      case REPORT_TYPES.RADIATION_THERAPY: {
        return <RadiationTherapyReportDetail reportsData={reportsData} />;
      }
      case REPORT_TYPES.OTHER_TREATMENT: {
        return <OtherTreatmentsReportDetail reportsData={reportsData} />;
      }
      case REPORT_TYPES.CLINICAL_NOTES: {
        return <ClinicalNotesReportDetail reportsData={reportsData} />;
      }
      default: {
        return <LabReportDetail reportsData={reportsData} />;
      }
    }
  };

  // set header title at runtime based on report type
  const setHeaderTitle = () => {
    if (reportType === 'medication') {
      navigation.setOptions({headerTitle: convertMedicationName(category)});
    } else {
      navigation.setOptions({headerTitle: category});
    }
  };

  return <>{renderReportDetail()}</>;
};

export default ReportDetail;
