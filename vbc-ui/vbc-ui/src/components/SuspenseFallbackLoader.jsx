/**
 * Loader to show in the suspense fallback when js is being loaded
 */
import {Image} from '@themesberg/react-bootstrap';
import {MangoLoader} from '../assets/images';
import React from 'react';

const SuspenseFallbackLoader = () => {
  return (
    <div className="preloader bg-loader flex-column justify-content-center align-items-center">
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={MangoLoader}
        height={40}
      />
    </div>
  );
};

export default SuspenseFallbackLoader;
