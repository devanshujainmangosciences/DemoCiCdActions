/**
 * This module contains a MonthWiseCount component.
 * <MonthWiseCount
      months => (array) to show list of all the months
      activeMonth => (Number) to show already selected month
      onMonthChange => (callback) when we select a particular month
    </MonthWiseCount>
 */
import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import QUARTERS from '../data/quarters';
import PropTypes from 'prop-types';
import {getMonthsDataSorted} from '@/services/utility';

export default function MonthWiseCount(props) {
  const {months, activeMonth} = props;
  const [selected, setSelected] = useState(activeMonth);
  const [list, setlist] = useState('');

  // console.log('LIST=>', list);

  useEffect(() => {
    setSelected(activeMonth);
    setlist(props.isQuarter ? QUARTERS : months ? months : []);
  }, [activeMonth, props.isQuarter, months]);

  const onMonthChange = (key) => {
    props.onMonthChange(key, list[key]);
    setSelected(key);
  };

  return (
    <ol className="list-group month-list">
      {getMonthsDataSorted(list).map((key) => {
        return (
          <li
            className={cx({
              'list-group-item': true,
              hand: true,
              selected: selected === key,
            })}
            key={key}
            onClick={() => onMonthChange(key)}>
            {`${key} (${list[key].total})`}
          </li>
        );
      })}
    </ol>
  );
}
MonthWiseCount.propTypes = {
  months: PropTypes.object,
  activeMonth: PropTypes.node.isRequired,
  isQuarter: PropTypes.object,
  onMonthChange: PropTypes.func,
};
