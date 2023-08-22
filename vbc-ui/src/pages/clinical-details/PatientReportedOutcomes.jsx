/**
 * This Component renders Patient Reported Outcomes Details as IFrame Document.
 * This Component gets iframeUrl and getPatientReportedOutcomes from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getPatientReportedOutcomes are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import {connect} from 'react-redux';
import {getPatientReportedOutcomes} from '@/actions/pharmaActions';
import PropTypes from 'prop-types';

const PatientReportedOutcomes = function (props) {
  const {iframeUrl, getPatientReportedOutcomes} = props;
  const [sourceUrl, setSourceUrl] = useState('');
  /**
   * On Component Mount this callback will call getPatientReportedOutcomes
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getPatientReportedOutcomes();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getPatientReportedOutcomes]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.PatientReportedOutcomes,
});

const mapDispatchToProps = {
  getPatientReportedOutcomes,
};
PatientReportedOutcomes.propTypes = {
  iframeUrl: PropTypes.string,
  getPatientReportedOutcomes: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientReportedOutcomes);
