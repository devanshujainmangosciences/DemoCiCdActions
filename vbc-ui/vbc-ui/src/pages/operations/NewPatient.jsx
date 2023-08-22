/**
 * This Component renders New Patient stats as IFrame Document.
 * This Component gets iframeUrl and getNewPatientStats from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getNewPatientStats are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getNewPatientStats} from '@/actions/pharmaActions';

const NewPatient = function (props) {
  const {iframeUrl, getNewPatientStats} = props;
  const [sourceUrl, setSourceUrl] = useState('');
  /**
   * On Component Mount this callback will call getNewPatientStats
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getNewPatientStats();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getNewPatientStats]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.newPatientStats,
});

const mapDispatchToProps = {
  getNewPatientStats,
};
NewPatient.propTypes = {
  iframeUrl: PropTypes.string,
  getNewPatientStats: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPatient);
