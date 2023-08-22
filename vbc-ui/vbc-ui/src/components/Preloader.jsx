/**
 * This module contains a loader component.
 * <Preloader
      show, => (boolean to decide show Overlay on screen with loader)
    </Preloader>
 */
import React from 'react';
import {Image} from '@themesberg/react-bootstrap';
import {MangoLoader} from '../assets/images';
import PropTypes from 'prop-types';

const Preloader = function (props) {
  const {show} = props;

  return (
    <div
      className={`preloader bg-loader flex-column justify-content-center align-items-center ${
        show ? '' : 'show'
      }`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={MangoLoader}
        height={40}
      />
    </div>
  );
};
Preloader.propTypes = {
  show: PropTypes.bool,
};
export default Preloader;
