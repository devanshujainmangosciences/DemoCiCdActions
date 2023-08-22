/**
 * This Component renders Existing Details with yearwise Calendar and monthwise Calender
 * This page renders series of question
 */
import React from 'react';
import {Col, Row} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DoctorNotesIcon} from '@/assets/icons';
import QuestionareData from '@/data/questionareData';
import YearwiseData from '@/data/yearwiseCalendar';
import {YearwiseTimeline, TitleContainer} from '@/components';

export default function Existing() {
  const {t} = useTranslation(['existing']);
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
            <label className="rating-label" htmlFor={`${opt}${id}`}>
              {opt}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <React.Fragment>
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
      <div className="page-container-existing">
        <ul className="justify-content-start">
          <li key="Q1" style={{paddingRight: 35}}>
            <input
              className="box-input"
              type="radio"
              value="Q1"
              name="Q1"
              id="Q1"
            />
            <label htmlFor="Q1" className="label active">
              {' '}
              Q1
            </label>
          </li>
          <li key="Q2" style={{paddingRight: 35}}>
            <input
              className="box-input"
              type="radio"
              value="Q2"
              name="Q2"
              id="Q2"
            />
            <label htmlFor="Q2" className="label">
              {' '}
              Q2
            </label>
          </li>
          <li key="Q3" style={{paddingRight: 35}}>
            <input
              className="box-input"
              type="radio"
              value="Q3"
              name="Q3"
              id="Q3"
            />
            <label htmlFor="Q3" className="label">
              {' '}
              Q3
            </label>
          </li>
          <li key="Q4" style={{paddingRight: 35}}>
            <input
              className="box-input"
              type="radio"
              value="Q4"
              name="Q4"
              id="Q4"
            />
            <label htmlFor="Q4" className="label">
              {' '}
              Q4
            </label>
          </li>
        </ul>
      </div>
      <p className="notes">
        {' '}
        <span className="patient-color">Note: </span> “We are interested in some
        things about you and your health. Please answer all of the questions
        yourself by selecting the answer that best applies to you. There are no
        “right” or “wrong” answers. The information that you provide will remain
        strictly confidential.”
      </p>
      <hr className="separator" />
      <h4>{t('questions')}</h4>
      <div className="table-responsive">
        <div className="table table-striped">
          <Row className="mb-3">
            <Col className="id">#</Col>
            <Col className="question">{t('question')}</Col>
          </Row>
          {QuestionareData.map(
            ({id, question, possibleResponse, answerType}, index) => (
              <React.Fragment key={id}>
                <Row className="bg-white">
                  <Col className="id py-4">{id}</Col>
                  <Col className="py-4" colSpan="5">
                    {question}
                  </Col>
                </Row>
                <Row>
                  <Col className="id py-4"> </Col>
                  <Col className="possible-text">{t('possibleResponse')}</Col>
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
    </React.Fragment>
  );
}
