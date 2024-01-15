import React, { createRef, useState } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import CalendarIcon from 'mdi-react/CalendarIcon';
import {
  buildDefaultFilterDate,
  buildTimeRangeLast30Day
} from '../../Shared/DateTime/dateTimeHelper';
import { useAppDispatch } from '../app/hooks';
import { updateFilterState } from './filterSlice';

const DatePickerFilter = () => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date>(
    buildDefaultFilterDate()
  );
  const datePicker = createRef<ReactDatePicker>();
  const Latest30Days = buildTimeRangeLast30Day(new Date());
  const openCalendar = () => {
    datePicker.current && datePicker.current.setOpen(true);
  };
  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    const model = {
      key: 'selectedDate',
      value: date
    };
    dispatch(updateFilterState(model));
  };
  return (
    <div className='filter-control calendar'>
      <div className='label'>Date</div>
      <DatePicker
        data-testid='contextMenu-testId'
        minDate={Latest30Days}
        selected={selectedDate}
        onChange={handleChangeDate}
        dateFormat='MMM dd, yyyy'
        ref={datePicker}
      />
      <span className='icon-calendar' onClick={openCalendar}>
        <CalendarIcon size={14} />
      </span>
    </div>
  );
};
export default DatePickerFilter;
