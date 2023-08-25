import React, { useRef, useState } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import CalendarIcon from 'mdi-react/CalendarIcon';
import ToastrWrapper from '../../../components/ToastrWrapper';
import { initDefaultFilterDate, getMonthDifference } from '../../Utils';
import update from 'immutability-helper';
import { FILTER_PARAM } from '../../const.json';

const { FROM_DATE_KEY, TO_DATE_KEY } = FILTER_PARAM;
const { defaultFromDate, defaultToDate } = initDefaultFilterDate();

const Filter = () => {
  const fromDatePicker = useRef<ReactDatePicker>(null);
  const toDatePicker = useRef<ReactDatePicker>(null);


  const [filterDate, setFilterDate] = useState({
    [FROM_DATE_KEY]: defaultFromDate,
    [TO_DATE_KEY]: defaultToDate
  });

  const validateFilterParameters = () => {
    const month = getMonthDifference(filterDate[FROM_DATE_KEY], filterDate[TO_DATE_KEY]);

    if (getMonthDifference(filterDate[FROM_DATE_KEY], filterDate[TO_DATE_KEY]) <= 24) {
      return true;
    }

    ToastrWrapper.showError(
      <h4>Time Range is only within 2 years</h4>
    );

    return false;
  };


  const handleSearch = () => {

  };

  const handleExport = () => {
    // TODO
  };

  const onDateChanged = (date: Date, key: Required<string>) => {
    const newDate = update(filterDate, {
      [key]: { $set: date }
    });
    setFilterDate(newDate);
  };

  return (
    <div className='top-control'>
      <div className='left-control'>
        <div className='filter-control calendar'>
          <div className='label'>From Date</div>
          <DatePicker
            selected={filterDate[FROM_DATE_KEY]}
            showMonthYearPicker
            dateFormat="MMM yyyy"
            ref={fromDatePicker}
            className='to-date-picker'
            onChange={date => date && onDateChanged(date, FROM_DATE_KEY)}
          />
          <span
            className='icon-calendar'
            id='icon-calendar-from-date'
            onClick={() => fromDatePicker?.current?.setOpen(true)}>
            <CalendarIcon size={14} />
          </span>
        </div>
        <div className='filter-control calendar'>
          <div className='label'>To Date</div>
          <DatePicker
            selected={filterDate[TO_DATE_KEY]}
            showMonthYearPicker
            dateFormat="MMM yyyy"
            ref={toDatePicker}
            className='to-date-picker'
            onChange={date => date && onDateChanged(date, TO_DATE_KEY)}
          />
          <span
            className='icon-calendar'
            id='icon-calendar-to-date'
            onClick={() => toDatePicker?.current?.setOpen(true)}>
            <CalendarIcon size={14} />
          </span>
        </div>
        <div className='filter-control btn-block'>
          <button className='button-submit' onClick={handleSearch}>
            Search
          </button>
          <button className='button-export' onClick={handleExport}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
