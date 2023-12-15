import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { TimePicker } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const propTypes = {
  isNightShift: PropTypes.bool
};
const format = 'h:mm A';
const ShowLeague = props => {
  const { isNightShift } = props;
  const defaultTime = isNightShift
    ? dayjs('10:59 PM', format)
    : dayjs('05:31 AM', format);
  const [startTimeSelected, setStartTimeSelected] = useState(defaultTime);
  const handleClick = () => {
    console.log('abc');
  };
  return (
    <div className='checkbox'>
      <Input
        id='prematch-filter-issuse-message'
        type='checkbox'
        defaultChecked={false}
        className='form-check-input'
        onClick={handleClick}
      />
      <label
        className='form-check-label'
        htmlFor='prematch-filter-issuse-message'>
        Show league
      </label>
      {isNightShift ? <label>After</label> : <label>Before</label>}
      <TimePicker
        inputReadOnly
        className='input-field'
        id='startTime'
        use12Hours
        defaultValue={startTimeSelected}
        // onSelect={value => setStartTimeSelected(value)}
        // value={startTimeSelected}
        format={format}
        allowClear={false}
        showNow={false}
      />
    </div>
  );
};

ShowLeague.propTypes = propTypes;
export default ShowLeague;
