/**
 * This component is used as HOC component to wrap button/links in the Admin section to go back to previous page
 */
import React from 'react';
import {useNavigate} from 'react-router-dom';

const GoBack = ({children}) => {
  const history = useNavigate();
  return <div onClick={() => history(-1)}>{children}</div>;
};

export default GoBack;
