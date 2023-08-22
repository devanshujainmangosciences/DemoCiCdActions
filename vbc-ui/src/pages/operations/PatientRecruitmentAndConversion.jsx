/**
 * This Component renders Patient Recruitment And Conversion Details as IFrame Document.
 * This Component gets iframeUrl and getPatientRecruitmentAndConversion from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getPatientRecruitmentAndConversion are required
 */

import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPatientRecruitmentAndConversion} from '@/actions/pharmaActions';

const PatientRecruitmentAndConversion = function (props) {
  const {iframeUrl, getPatientRecruitmentAndConversion} = props;
  const [sourceUrl, setSourceUrl] = useState('');
  /**
   * On Component Mount this callback will call getPatientRecruitmentAndConversion
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getPatientRecruitmentAndConversion();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getPatientRecruitmentAndConversion]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.patientRecruitmentAndConversion,
});

const mapDispatchToProps = {
  getPatientRecruitmentAndConversion,
};
PatientRecruitmentAndConversion.propTypes = {
  iframeUrl: PropTypes.string,
  getPatientRecruitmentAndConversion: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientRecruitmentAndConversion);
