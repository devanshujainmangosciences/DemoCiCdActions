/**
 * This Component renders Patient Timeline Details as IFrame Document.
 * This Component gets iframeUrl and getIframeUrl from redux store
 * as props. On Component mount getIframeUrl function is called
 * to get iframe Url which is passed to IFrame tag.
 * IMPORTANT:
 * iframeUrl and getIframeUrl are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPatientTimeLineUrl} from '@/actions';

const PatientTimeline = function (props) {
  const {iframeUrl, getPatientTimeLineUrl, patientId} = props;
  const [sourceUrl, setSourceUrl] = useState('');

  /**  This is a useEffect hook that runs only once when the component mounts. It calls the
`getPatientTimeLineUrl` function with `patientId` and `false` as arguments to fetch the patient
timeline URL. Since the dependency array is empty, this hook will not run again even if the
component re-renders. */
  useEffect(() => {
    getPatientTimeLineUrl(patientId, false);
  }, []);

  /**
   * On Component Mount this callback will call getPatientTimeLineUrl
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl]);
  // console.log('SOURCE URL=>', sourceUrl);
  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.clinicalDetails.patientTimelineUrl,
});

const mapDispatchToProps = {
  getPatientTimeLineUrl,
};
PatientTimeline.propTypes = {
  iframeUrl: PropTypes.string,
  getPatientTimeLineUrl: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientTimeline);
