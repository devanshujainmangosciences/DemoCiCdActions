import React from 'react';

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div id="header-wrapper">{import.meta.env.VITE_HEADER}</div>
      </div>
    </>
  );
};

export default Header;
