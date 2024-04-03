import { useRef, useState } from 'react';
import { ReactDatePicker } from 'react-datepicker';
import update from 'immutability-helper';
import DatePickerComponent from '../../../Shared/DatePickerComponent/DatePicker';

const FilterDate = () => {
  const fromDatePicker = useRef<ReactDatePicker>(null);
  const toDatePicker = useRef<ReactDatePicker>(null);
  const [filterDate, setFilterDate] = useState({
    fromDate: new Date(),
    toDate: new Date()
  });

  const onFromDateChanged = (date: Date) => {
    const newDate = update(filterDate, {
      fromDate: { $set: date }
    });
    setFilterDate(newDate);
  };

  const onToDateChanged = (date: Date) => {
    const newDate = update(filterDate, {
      toDate: { $set: date }
    });
    setFilterDate(newDate);
  };

  return (
    <>
      <DatePickerComponent
        selectedDate={filterDate.fromDate}
        datePickerRef={fromDatePicker}
        onChangeDate={onFromDateChanged}
        name='From Date'
      />
      <DatePickerComponent
        selectedDate={filterDate.toDate}
        datePickerRef={toDatePicker}
        onChangeDate={onToDateChanged}
        name='To Date'
      />
    </>
  );
};
export default FilterDate;
