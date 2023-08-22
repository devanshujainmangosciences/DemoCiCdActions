/**
 * This Component renders Survival And Response Details as IFrame Document.
 * This Component gets iframeUrl and getSurvivalAndResponse from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getSurvivalAndResponse are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '../../components/IFrame';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSurvivalAndResponse} from '../../actions/pharmaActions';

const SurvivalAndResponse = function (props) {
  const {iframeUrl, getSurvivalAndResponse} = props;
  const [sourceUrl, setSourceUrl] = useState('');

  /**
   * On Component Mount this callback will call getSurvivalAndResponse
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getSurvivalAndResponse();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getSurvivalAndResponse]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.survivalAndResponse,
});

const mapDispatchToProps = {
  getSurvivalAndResponse,
};
SurvivalAndResponse.propTypes = {
  iframeUrl: PropTypes.string,
  getSurvivalAndResponse: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurvivalAndResponse);
