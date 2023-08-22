/**
 * This module contains a footer component which is needed at almost all the pages.
 * this is pure components which render reponsive footer 
 * <IFrame
      title, => (string) to show title of iframe when hover
      allowfullscreen, => (boolean to decide fullscreen)
      height, => height of the iframe
      width, => width of the iframe
      source, => url to load in iframe  
    </IFrame>
 */
import React from 'react';
import PropTypes from 'prop-types';

const IFrame = function (props) {
  const {title = '', allowfullscreen = true, height, width, source} = props;
  return (
    <iframe
      src={source}
      title={title}
      height={height}
      width={width}
      allowFullScreen={allowfullscreen}
    ></iframe>
  );
};
IFrame.propTypes = {
  title: PropTypes.string,
  allowfullscreen: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  source: PropTypes.string,
};
export default IFrame;
