import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import ExportSelector from './ExportSelector';
import ToastrWrapper from '../../components/ToastrWrapper';
import Service from '../service/Service';
import queryDataTableThunk from '../table/queryDataTableThunk';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../Shared/Constants';
import Loading from '../../components/Loading';

const ButtonGroupFilter = () => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(state => state.filter.filterState);
  const policy = useAppSelector(state => state.policy.entities.FullBetTypes);
  const loading = useAppSelector(state => state.eventAssignmentTable.loading);

  const handleSubmit = () => {
    dispatch(queryDataTableThunk());
  };

  const handleSyncOffVR = () => {
    ToastrWrapper.confirm(
      'Are you sure to TURN OFF VR for ALL the matches containing OFF VR?'
    ).then(async confirmResult => {
      if (confirmResult.value) {
        const model = { date: filterState.selectedDate };
        await Service.syncOffVRs(model);
      }
    });
  };

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }
  return (
    <div className='filter-control btn-block'>
      <button className='button-submit' onClick={handleSubmit}>
        Submit
      </button>
      <ExportSelector />
      {policy.HasWrite && (
        <button
          hidden
          disabled
          className='button-submit button-sync-off-vr'
          onClick={handleSyncOffVR}>
          Sync OFF VR
        </button>
      )}
    </div>
  );
};
export default ButtonGroupFilter;
