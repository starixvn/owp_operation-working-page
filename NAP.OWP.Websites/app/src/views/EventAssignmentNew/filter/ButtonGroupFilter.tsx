import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import ExportSelector from './ExportSelector';
import ToastrWrapper from '../../components/ToastrWrapper';
import Service from '../service/Service';
import queryDataTableThunk from '../table/queryDataTableThunk';

const ButtonGroupFilter = () => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(state => state.filter.filterState);
  const policy = useAppSelector(state => state.policy.entities.FullBetTypes);
  const { selectedMatchStatus, selectedOffVRs, selectedMatchType, userNameFilterIsValid } = filterState;

  const handleSubmit = () => {
    const selectedMatchStatusIsValid = selectedMatchStatus.length > 0;
    const selectedSyncOffVRIsValid = selectedOffVRs.length > 0;
    const selectedMatchTypeIsValid = selectedMatchType.length > 0;
    if (
      selectedMatchStatusIsValid &&
      userNameFilterIsValid &&
      selectedMatchTypeIsValid &&
      selectedSyncOffVRIsValid
    ) {
      dispatch(queryDataTableThunk());
    } else {
      !selectedMatchStatusIsValid &&
        ToastrWrapper.showError('Please select at least one match status');
      !selectedSyncOffVRIsValid &&
        ToastrWrapper.showError('Please select at least one sync off VR');
      !userNameFilterIsValid && ToastrWrapper.showError('User not found');
      !selectedMatchTypeIsValid &&
        ToastrWrapper.showError('Please select at least one match type');
    }
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
