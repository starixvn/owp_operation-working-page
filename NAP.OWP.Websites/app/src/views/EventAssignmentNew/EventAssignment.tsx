import React, { useEffect } from 'react';
import Filter from './filter/Filter';
import Table from './table/Table';
import { useAppDispatch, useAppSelector } from './app/hooks';
import queryPolicyThunk from './policy/queryPolicyThunk';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';

const EventAssignment = () => {
  const stableDispatch = useAppDispatch();
  const loading = useAppSelector(state => state.policy.loading, (previous, next) => isEquals(previous, next));

  useEffect(() => {
    stableDispatch(queryPolicyThunk());
  }, [stableDispatch]);

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  return (
    <div>
      <Filter />
      <Table />
    </div>
  );
};

export default EventAssignment;