/**
 * This component is used to render the title of the Pages
 */
import {USER_THEME} from '../constants';
import React from 'react';
import PropTypes from 'prop-types';
const TitleContainer = ({icon, title, noBg = false, iconClass}) => {
  const theme = localStorage.getItem(USER_THEME);
  // console.log('selectedRoleName=>', selectedRoleName);
  return (
    <div className="title-container">
      <div className={!noBg ? `page-icon bg-${theme}` : `me-3 ${iconClass}`}>
        {icon}
      </div>
      <h4 className="page-title text-capitalize">{title}</h4>
    </div>
  );
};
TitleContainer.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
};
export default TitleContainer;
