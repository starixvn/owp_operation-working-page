import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import queryDataTableThunk from '../table/queryDataTableThunk';
import DatePickerFilter from './DatePickerFilter';
import UserSuggestionFilter from './UserSuggestionFilter';
import ButtonGroupFilter from './ButtonGroupFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { REQUEST_STATUS } from '../../Shared/Constants';
import Loading from '../../components/Loading';
import { isEquals } from 'immutability-helper';
import queryFilterOptionsThunk from './queryFilterOptionsThunk';
import MatchStatusFilter from './MatchStatusFilter';

const Filter = () => {
  const { loading } = useSelector((state: RootState) => state.filter);
  const stableDispatch = useAppDispatch();
  useEffect(() => {
    stableDispatch(queryFilterOptionsThunk());
  }, [stableDispatch]);

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }
  return (
    <>
      <DatePickerFilter />
      <UserSuggestionFilter />
      <MatchStatusFilter />
      <ButtonGroupFilter />
    </>
  );
};

export default Filter;
