import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import CalendarIcon from 'mdi-react/CalendarIcon';
import { getDefaultDateRange } from '../../../Helper/TicketCenterHelper';
import Utils from '../../../../Shared/Utils';
import { TUpdateTimeRange } from '../../../type';


const DateRangeFilter = (props: TUpdateTimeRange) => {
  const { fromDateDefault, toDateDefault, minDate } = getDefaultDateRange();
  const [toDateFilter, setToDateFilter] = useState(toDateDefault);
  const [fromDateFilter, setFromDateFilter] = useState(fromDateDefault);

  const toDateRef = useRef<DatePicker>(null);
  const fromDateRef = useRef<DatePicker>(null);

  const handleChangeFromDate = (date: Date) => {
    setFromDateFilter(date);
    props.onUpdate('fromDate', Utils.formatDate(date));
  };

  const handleChangeToDate = (date: Date) => {
    setToDateFilter(date);
    props.onUpdate('fromDate', Utils.formatDate(date));
  };

  return (
    <>
      <div className='calendar'>
        <div className='label'>From Date</div>
        <DatePicker
          maxDate={toDateFilter}
          minDate={minDate}
          selected={fromDateFilter}
          dateFormat='MMM dd, yyyy'
          ref={fromDateRef}
          onChange={handleChangeFromDate}
        />
        <span
          className='icon-calendar'
          onClick={() => fromDateRef?.current?.setOpen(true)}>
          <CalendarIcon size={14} />
        </span>
      </div>
      <div className='calendar'>
        <div className='label'>To Date</div>
        <DatePicker
          maxDate={toDateDefault}
          minDate={fromDateFilter}
          selected={toDateFilter}
          dateFormat='MMM dd, yyyy'
          ref={toDateRef}
          onChange={handleChangeToDate}
        />
        <span
          className='icon-calendar'
          onClick={() => toDateRef?.current?.setOpen(true)}>
          <CalendarIcon size={14} />
        </span>
      </div>
    </>
  );
};

export default DateRangeFilter;
