import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import queryDataTableThunk from '../table/queryDataTableThunk';
import DatePickerFilter from './DatePickerFilter';
import UserSuggestionFilter from './UserSuggestionFilter';
import ButtonGroupFilter from './ButtonGroupFilter';

const Filter = () => {
  const stableDispatch = useAppDispatch();
  useEffect(() => {
    stableDispatch(queryDataTableThunk());
  });
  return (
    <>
      <DatePickerFilter />
      <UserSuggestionFilter />
      <ButtonGroupFilter />
    </>
  );
};

export default Filter;
