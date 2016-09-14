import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarIcon from 'mdi-react/CalendarIcon';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
import { DATE } from './filterConst.json';
import { setFilter } from './filterSlice';
import { maxDate, minDate } from '../helper/filterHelper';
import { v4 as uuidv4 } from 'uuid';

function DateTimePicker() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useStableDispatch();

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setOpenCalendar(false);
      setDate(newDate);
      dispatch(
        setFilter({
          key: DATE,
          value: newDate
        })
      );
    }
  };

  return (
    <div key={uuidv4()} className='calendar'>
      <div className='label'>Date</div>
      <DatePicker
        selected={date}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat='MMM dd, yyyy'
        className='from-date-picker'
        open={openCalendar}
        onClickOutside={_ => setOpenCalendar(false)}
        onChange={handleDateChange}
      />
      <span className='icon-calendar' onClick={() => setOpenCalendar(true)}>
        <CalendarIcon size={14} />
      </span>
    </div>
  );
}

export default DateTimePicker;
