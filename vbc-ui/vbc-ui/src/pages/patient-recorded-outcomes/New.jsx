/**
 * This Component renders New Details with yearwise Calendar and monthwise Calender
 * This page renders series of question
 */
import React from 'react';
import {useTranslation} from 'react-i18next';
import YearwiseData from '@/data/yearwiseCalendar';
import QuestionareData from '@/data/questionareData';
import {DoctorNotesIcon} from '@/assets/icons';
import {Col, Row, Tab} from '@themesberg/react-bootstrap';
import {MonthWiseCount, YearwiseTimeline, TitleContainer} from '@/components';

export default function SurgicalDetails() {
  const {t} = useTranslation(['neww']);
  /**
   * Submits the form
   * @param {String} value
   * @param {Integer} id
   */
  const submitAnswer = () => {};
  const Radio = ({possibleResponse, index, id}) => {
    return (
      <React.Fragment key={id}>
        <Col className="opt">
          <div className="pretty-radio">
            <input
              value={possibleResponse.one}
              onChange={(e) => submitAnswer(e.target.value, id)}
              type="radio"
              className="radio"
              name={`my-radio${index}`}
            />
            <span className="radio-look"></span>
            {possibleResponse.one}
          </div>
        </Col>
        <Col className="opt">
          <div className="pretty-radio">
            <input
              value={possibleResponse.two}
              onChange={(e) => submitAnswer(e.target.value, id)}
              type="radio"
              className="radio"
              name={`my-radio${index}`}
            />
            <span className="radio-look"></span>
            {possibleResponse.two}
          </div>
        </Col>
        <Col className="opt">
          <div className="pretty-radio">
            <input
              value={possibleResponse.three}
              onChange={(e) => submitAnswer(e.target.value, id)}
              type="radio"
              className="radio"
              name={`my-radio${index}`}
            />
            <span className="radio-look"></span>
            {possibleResponse.three}
          </div>
        </Col>
        <Col className="opt">
          <div className="pretty-radio">
            <input
              value={possibleResponse.four}
              onChange={(e) => submitAnswer(e.target.value, id)}
              type="radio"
              className="radio"
              name={`my-radio${index}`}
            />
            <span className="radio-look"></span>
            {possibleResponse.four}
          </div>
        </Col>
      </React.Fragment>
    );
  };

  const Rating = ({possibleResponse, id}) => {
    return (
      <ul key={id}>
        {possibleResponse.options.map((opt) => (
          <li key={`${opt}${id}`}>
            <input
              onChange={(e) => submitAnswer(e.target.value, id)}
              className="box-input"
              type="radio"
              value={opt}
              name={id}
              id={`${opt}${id}`}
            />
            <label htmlFor={`${opt}${id}`}>{opt}</label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <TitleContainer
        icon={<DoctorNotesIcon fill="#fff" />}
        title={t('breastCancerStandardSet')}
      />
      <div className="yearly-timeline">
        <Row>
          <Col lg={12}>
            <YearwiseTimeline data={YearwiseData} show={6} />
          </Col>
        </Row>
      </div>
      <div className="page-container">
        <div className="py-5">
          <p className="notes">
            {' '}
            <span className="patient-color">Note: </span> “We are interested in
            some things about you and your health. Please answer all of the
            questions yourself by selecting the answer that best applies to you.
            There are no “right” or “wrong” answers. The information that you
            provide will remain strictly confidential.”
          </p>
          <hr className="separator" />
          <Row>
            <Col lg={3}>
              <div className="ps-5">
                <MonthWiseCount isQuarter="true"></MonthWiseCount>
              </div>
            </Col>
            <Col lg={9}>
              <Tab.Container defaultActiveKey="home">
                <Row>
                  <Col lg={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="home" className="py-4">
                        <div className="d-flex">
                          <h4 className="page-title">{t('questions')} </h4>
                        </div>
                        <div className="mx-3 mt-4">
                          <div className="table-responsive">
                            <div className="table table-striped">
                              <Row className="mb-3">
                                <Col className="id">#</Col>
                                <Col className="question">{t('question')}</Col>
                              </Row>
                              {QuestionareData.map(
                                (
                                  {id, question, possibleResponse, answerType},
                                  index
                                ) => (
                                  <React.Fragment key={id}>
                                    <Row className="bg-white">
                                      <Col className="id py-4">{id}</Col>
                                      <Col className="py-4" colSpan="5">
                                        {question}
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col className="id py-4"> </Col>
                                      <Col className="possible-text">
                                        {t('possibleResponse')}
                                      </Col>
                                      {answerType === 'radio' ? (
                                        <Radio
                                          possibleResponse={possibleResponse}
                                          index={index}
                                          id={id}
                                        />
                                      ) : (
                                        <Rating
                                          possibleResponse={possibleResponse}
                                          id={id}
                                          index={index}
                                        />
                                      )}
                                    </Row>
                                  </React.Fragment>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
