/**
 * This Component renders Discontinuation And Adverse Events Details as IFrame Document.
 * This Component gets iframeUrl and getDiscontinuationAndAdverseEvents from redux store
 * as props
 * IMPORTANT:
 * iframeUrl and getDiscontinuationAndAdverse are required
 */
import React, {useEffect, useState} from 'react';
import IFrame from '@/components/IFrame';
import {connect} from 'react-redux';
import {getDiscontinuationAndAdverseEvents} from '@/actions/pharmaActions';
import PropTypes from 'prop-types';

const DiscontinuationAndAdverseEvents = function (props) {
  const {iframeUrl, getDiscontinuationAndAdverseEvents} = props;
  const [sourceUrl, setSourceUrl] = useState('');

  /**
   * On Component Mount this callback will call getDiscontinuationAndAdverseEvents
   * and get the IFrameUrl and set it to state
   */
  useEffect(() => {
    if (!iframeUrl) {
      getDiscontinuationAndAdverseEvents();
    }
    if (iframeUrl) {
      setSourceUrl(iframeUrl);
    }
  }, [iframeUrl, sourceUrl, getDiscontinuationAndAdverseEvents]);

  return (
    <>
      <IFrame source={sourceUrl} width="100%" height="800px"></IFrame>
    </>
  );
};

const mapStateToProps = (state) => ({
  iframeUrl: state.pharma.DiscontinuationAndAdverseEvents,
});

const mapDispatchToProps = {
  getDiscontinuationAndAdverseEvents,
};
DiscontinuationAndAdverseEvents.propTypes = {
  iframeUrl: PropTypes.string,
  getDiscontinuationAndAdverseEvents: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscontinuationAndAdverseEvents);
