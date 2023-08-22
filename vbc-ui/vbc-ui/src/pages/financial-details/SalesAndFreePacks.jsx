/**
 * This Component renders Sales And Free Packs Details as IFrame Document.
 * This Component gets iframeUrl and getSalesAndFreePacks from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getSalesAndFreePacks are required
 */

import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import {connect} from 'react-redux';
import {getSalesAndFreePacks} from '@/actions/pharmaActions';
import PropTypes from 'prop-types';

const SalesAndFreePacks = function (props) {
  const {iframeUrl, getSalesAndFreePacks} = props;
  const [sourceUrl, setSourceUrl] = useState('');
  /**
   * On Component Mount this callback will call getSalesAndFreePacks
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getSalesAndFreePacks();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getSalesAndFreePacks]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.SalesAndFreePacks,
});

const mapDispatchToProps = {
  getSalesAndFreePacks,
};
SalesAndFreePacks.propTypes = {
  iframeUrl: PropTypes.string,
  getSalesAndFreePacks: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(SalesAndFreePacks);
