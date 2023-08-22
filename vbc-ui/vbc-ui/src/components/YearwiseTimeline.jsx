/**
 * This module contains a YearwiseTimeline.
 * <YearwiseTimeline
      data => (object) to show list of all the years
      show => (Number) to show no. of years in a row.
      onYearChange => (callback) when we select a particular year
    </YearwiseTimeline>
 */
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import PropTypes from 'prop-types';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {getReportSyncFlag} from '../actions';

const YearwiseTimeline = (props) => {
  const dispatch = useAppDispatch();
  const {data, show, onYearChange} = props;
  const [selected, setSelected] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(Object.keys(data).length);
  const [touchPosition, setTouchPosition] = useState(null);
  const dataSynchronized = useAppSelector(
    (state) => state.clinicalDetails.dataSynchronized
  );

  useEffect(() => {
    if (!dataSynchronized) {
      dispatch(getReportSyncFlag());
    }
  }, [dataSynchronized]);

  useEffect(() => {
    setLength(Object.keys(data).length);
  }, [data]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {length >= show && (
          <button
            onClick={prev}
            className={cx({
              'left-arrow ': true,
              active: currentIndex === 0,
              disabled: currentIndex < 0,
            })}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}>
          <div
            className={`carousel-content show-${show} year-items`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}>
            {Object.keys(data)
              .reverse()
              .map((key, index) => (
                <>
                  <div
                    className={cx({
                      item: true,
                      active: selected === index,
                    })}
                    key={key}
                    onClick={() => {
                      onYearChange(data[key], key);
                      setSelected(index);
                    }}>
                    <span> {key}</span>{' '}
                    <span className="ms-1">({data[key].total})</span>
                  </div>
                </>
              ))}
          </div>
        </div>

        {currentIndex < length - show && (
          <button
            onClick={next}
            className={cx({
              'right-arrow ': true,
              active: currentIndex === length - show,
            })}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};
YearwiseTimeline.propTypes = {
  data: PropTypes.object,
  show: PropTypes.number,
  onYearChange: PropTypes.func,
};
export default YearwiseTimeline;
