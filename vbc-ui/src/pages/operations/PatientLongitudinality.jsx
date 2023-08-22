/**
 * This Component renders Patient Longitudinality Details as IFrame Document.
 * This Component gets iframeUrl and getPatientLongitudinality from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getPatientLongitudinality are required
 */

import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPatientLongitudinality} from '@/actions/pharmaActions';

const PatientLongitudinality = function (props) {
  const {iframeUrl, getPatientLongitudinality} = props;
  const [sourceUrl, setSourceUrl] = useState('');
  /**
   * On Component Mount this callback will call getPatientLongitudinality
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getPatientLongitudinality();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getPatientLongitudinality]);
  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.patientLongitudinality,
});

const mapDispatchToProps = {
  getPatientLongitudinality,
};
PatientLongitudinality.propTypes = {
  iframeUrl: PropTypes.string,
  getPatientLongitudinality: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientLongitudinality);
