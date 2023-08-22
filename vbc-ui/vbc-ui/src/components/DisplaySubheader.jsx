/**
 * This component is used to render only UI and recieved two state one Question value and one response value
 */
import React from 'react';

const DisplaySubheader = ({question, response, children}) => {
  return (
    <div className="mt-0 sub-text-light display-sub-header-wrap">
      <p className="mb-0">{question}</p>

      <p className="mb-0">
        <span className="d-flex align-items-center">
          <span className="mb-0 m-lg-2">:</span>{' '}
          <span className="text-patient">{response}</span>
          {children}
        </span>
      </p>
    </div>
  );
};

export default DisplaySubheader;
