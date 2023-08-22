/**
 * This module contains a ScrollToTop component.
 * This is a button used in privacy and terms of user to go to top its displayed in right corner of the page and only appears when scroll event is triggered
 */
import React, {useEffect, useState} from 'react';
import throttle from 'lodash/throttle';
import {USER_THEME} from '../constants';

const ScrollToTop = function () {
  const theme = localStorage.getItem(USER_THEME);
  const [showBackButton, setshowBackButton] = useState(false);

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  // document.addEventListener('scroll', function(e) {
  //   console.log('TEST SCROLLED')
  //  });

  const scrollingFunction = () => {
    // console.log('SCROLL');
    setshowBackButton(true);
    if (window.scrollY == 0) {
      setshowBackButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
  }, []);
  const throttledScroll = throttle(scrollingFunction, 500);
  if (showBackButton) {
    return (
      <div className="backToTop-container cursor-pointer" onClick={backToTop}>
        <div className={`backToTop-button bg-${theme}`}>Back To Top</div>
      </div>
    );
  } else {
    return null;
  }
};
ScrollToTop.propTypes = {};
export default ScrollToTop;
