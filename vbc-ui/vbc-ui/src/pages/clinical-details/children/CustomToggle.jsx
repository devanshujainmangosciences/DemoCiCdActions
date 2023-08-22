/**
 * Custom toggle component is used to toggle the Accordation that are being used in Reports components
 * eventKey:- String value of the event that needs toggeling
 * callback:- Function triggred in parent component when toggle button is clicked
 */
import React, {useContext} from 'react';
import {
  useAccordionButton,
  AccordionContext,
} from '@themesberg/react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';

export default function CustomToggle({eventKey, callback}) {
  const {activeEventKey} = useContext(AccordionContext);

  /**  `useAccordionButton` is a hook provided by the `@themesberg/react-bootstrap` library that returns a
function to toggle the accordion. The `decoratedOnClick` constant is assigned the value returned by
this hook, which is a function that toggles the accordion associated with the `eventKey` passed as
the first argument. The second argument is a callback function that is executed when the toggle
button is clicked, and it passes the `eventKey` as an argument to the callback function if it
exists. */
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      {isCurrentEventKey ? (
        <button
          type="button"
          className="accordion-minus"
          onClick={decoratedOnClick}>
          <FontAwesomeIcon icon={faMinus} color="white" />
        </button>
      ) : (
        <button
          type="button"
          className="accordion-plus"
          onClick={decoratedOnClick}>
          <FontAwesomeIcon icon={faPlus} color="orange" />
        </button>
      )}
    </>
  );
}
