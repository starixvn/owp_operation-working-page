import React, { createRef, useState } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import CalendarIcon from 'mdi-react/CalendarIcon';
import { buildTimeRangeLast30Day } from '../../Shared/DateTime/dateTimeHelper';
import { useAppDispatch } from '../app/hooks';
import { updateFilterState } from './filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const DatePickerFilter = () => {
  const dispatch = useAppDispatch();
  const { filterState } = useSelector((state: RootState) => state.filter);
  const { selectedDate } = filterState;
  const datePicker = createRef<ReactDatePicker>();
  const Latest30Days = buildTimeRangeLast30Day(new Date());
  const openCalendar = () => {
    datePicker.current && datePicker.current.setOpen(true);
  };
  const handleChangeDate = (date: Date) => {
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
