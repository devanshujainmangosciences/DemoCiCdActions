/**
 * This module contains a Sandwitch Button component.
 * <SandwichButton
      setToggleSidebar, => (callback) to call to toggle sidebar)
      sidebar, => (boolean) to decide svg icons to render with sidebar)
    </SandwichButton>
 */
import React from 'react';
import PropTypes from 'prop-types';

const SandwichButton = ({setToggleSidebar, isSidebarPresent}) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center flex-row`}
      onClick={() => setToggleSidebar()}
    >
      {isSidebarPresent ? (
        <svg
          className="SideBurgerIcon-image"
          style={{
            width: '35px',
            height: '30px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
          viewBox="0 0 50 32"
        >
          <path d="M49,4H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,4,49,4z"></path>
          <path d="M49,16H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,16,49,16z"></path>
          <path d="M49,28H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,28,49,28z"></path>
          <path d="M8.1,22.8c-0.3,0-0.5-0.1-0.7-0.3L0.7,15l6.7-7.8c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4L3.3,15l5.5,6.2   c0.4,0.4,0.3,1-0.1,1.4C8.6,22.7,8.4,22.8,8.1,22.8z"></path>
        </svg>
      ) : (
        <svg
          className="Icon ThinBurgerIcon"
          style={{
            width: '25px',
            height: '20px',
            marginRight: '30px',
            cursor: 'pointer',
          }}
          focusable="false"
          viewBox="0 0 32 32"
        >
          <path d="M31,4H1C0.4,4,0,3.6,0,3s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,4,31,4z M31,16H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,16,31,16z M31,28H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,28,31,28z"></path>
        </svg>
      )}
    </div>
  );
};
SandwichButton.propTypes = {
  setToggleSidebar: PropTypes.func,
  isSidebarPresent: PropTypes.bool,
};
export default SandwichButton;
