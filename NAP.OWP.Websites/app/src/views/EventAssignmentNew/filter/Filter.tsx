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
import SyncLiveFilter from './SyncLiveFilter';
import OffVRFilter from './OffVRFilter';
import MatchTypeFilter from './MatchTypeFilter';

const Filter = () => {
  const loading = useSelector((state: RootState) => state.filter.loading);
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
      <MatchTypeFilter />
      <MatchStatusFilter />
      <SyncLiveFilter />
      <OffVRFilter />
      <ButtonGroupFilter />
    </>
  );
};

export default Filter;
