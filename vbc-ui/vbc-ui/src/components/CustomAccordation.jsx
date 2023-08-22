/*

This accordation is currently used in help component.
props=> it recieves accordationData array with header,item and question list
function=>  renderAccordationItems-> Renders accordation with header as the title
            renderBodyData-> Renders question list under accordation body

State=> questionButton is used to manage which question is open by comparing the questionIndex property


*/

import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Accordion} from '@themesberg/react-bootstrap';
import React, {useState} from 'react';

const CustomAccordation = ({accordationData}) => {
  //   console.log("accordationData=>", accordationData);
  const [questionButton, setquestionButton] = useState(null);
  /**
   * Rendering Accordian Items
   * @param {Array} accordationData
   * @returns {Element}
   */
  const renderAccordationItems = (accordationData) => {
    if (accordationData.length > 0) {
      return accordationData.map((accordation, index) => {
        return (
          <Accordion.Item
            eventKey={accordation?.item}
            data-testid={accordation?.header}
            key={index + accordation?.header}
            className="mb-3">
            <Accordion.Header>{accordation?.header}</Accordion.Header>
            <Accordion.Body>
              {renderBodyData(accordation?.questionList)}
            </Accordion.Body>
          </Accordion.Item>
        );
      });
    } else {
      <div> No Data present</div>;
    }
  };
  /**
   *
   * @param {Array} bodyData
   */
  const renderBodyData = (bodyData) => {
    // console.log("bodyData=>", bodyData);
    if (bodyData.length > 0) {
      return bodyData.map((data) => (
        <div key={data.questionIndex} className="mb-3">
          <div>
            <div className="ques-body">
              <div className="mb-2 mb-sm-0">{data?.question}</div>
              <button
                className="patient-theme-color-button"
                onClick={() =>
                  setquestionButton({
                    [data.questionIndex]:
                      questionButton && questionButton[data.questionIndex]
                        ? !questionButton[data.questionIndex]
                        : true,
                  })
                }>
                {questionButton && questionButton[data.questionIndex] ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            </div>
            {questionButton && questionButton[data.questionIndex] && (
              <div className="answer-body p-3">{data?.answer}</div>
            )}
          </div>
        </div>
      ));
    } else {
      <div>{bodyData}</div>;
    }
  };
  return (
    <div className="custom-accordation">
      <Accordion
        defaultActiveKey="0"
        id="custom-accord"
        data-testid="accordian">
        {renderAccordationItems(accordationData)}
      </Accordion>
    </div>
  );
};

export default CustomAccordation;
