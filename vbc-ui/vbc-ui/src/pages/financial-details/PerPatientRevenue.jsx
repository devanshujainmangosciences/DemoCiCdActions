/**
 * This Component renders Per Patient Revenue Details as IFrame Document.
 * This Component gets iframeUrl and getPerPatientRevenue from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getPerPatientRevenue are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import {connect} from 'react-redux';
import {getPerPatientRevenue} from '@/actions/pharmaActions';
import PropTypes from 'prop-types';

const PerPatientRevenue = function (props) {
  const {iframeUrl, getPerPatientRevenue} = props;
  const [sourceUrl, setSourceUrl] = useState('');

  /**
   * On Component Mount this callback will call getPerPatientRevenue
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getPerPatientRevenue();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getPerPatientRevenue]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.PerPatientRevenue,
});

const mapDispatchToProps = {
  getPerPatientRevenue,
};
PerPatientRevenue.propTypes = {
  iframeUrl: PropTypes.string,
  getPerPatientRevenue: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(PerPatientRevenue);
