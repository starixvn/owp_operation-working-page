import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
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
import ControlRightFilter from './ControlRightFilter';
import ShowUnreadMessage from './ShowUnreadMessage';

const Filter = () => {
  const loading = useAppSelector(state => state.filter.loading);
  const stableDispatch = useAppDispatch();
  useEffect(() => {
    const fetchMyAPI = async () => {
      await stableDispatch(queryFilterOptionsThunk());
      await stableDispatch(queryDataTableThunk());
    };

    fetchMyAPI();
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
      <ShowUnreadMessage />
      <ControlRightFilter />
    </>
  );
};

export default Filter;
