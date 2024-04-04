import { useRef, useState } from 'react';
import { ReactDatePicker } from 'react-datepicker';
import DatePickerComponent from '../../../Shared/DatePickerComponent/DatePicker';

const FilterDate = () => {
  const datePickerRef = useRef<ReactDatePicker>(null);
  const [filterDate, setFilterDate] = useState(new Date());

  const onChangeFilterDate = (date: Date) => {
    setFilterDate(date);
  };

  return (
    <DatePickerComponent
      selectedDate={filterDate}
      datePickerRef={datePickerRef}
      onChangeDate={onChangeFilterDate}
      name='Date'
    />
  );
};
export default FilterDate;
