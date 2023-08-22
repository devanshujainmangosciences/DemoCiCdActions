/**
 * This Component renders Individual Patient Details as IFrame Document.
 * This Component gets iframeUrl and getIndividualPatientData from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getIndividualPatientData are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import {connect} from 'react-redux';
import {getIndividualPatientData} from '@/actions/pharmaActions';
import PropTypes from 'prop-types';

const IndividualPatientData = function (props) {
  const {iframeUrl, getIndividualPatientData} = props;
  const [sourceUrl, setSourceUrl] = useState('');

  /**
   * On Component Mount this callback will call getIndividualPatientData
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getIndividualPatientData();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getIndividualPatientData]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.IndividualPatientData,
});

const mapDispatchToProps = {
  getIndividualPatientData,
};
IndividualPatientData.propTypes = {
  iframeUrl: PropTypes.string,
  getDiscontinuationAndAdverseEvents: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualPatientData);
