/**
 * This component is rendered when user is not allowed to access VBC program
 */
import React from 'react';

const NotAllowed = ({note, onButtonClick}) => {
  return (
    <div className="item p-4 mt-4">
      <div className="note">
        <p>{note && note}</p>
      </div>
      <button className="btn-patient-theme mt-2" onClick={onButtonClick}>
        Complete Application
      </button>
    </div>
  );
};

export default NotAllowed;
