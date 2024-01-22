import React from 'react';
import DropdownNative from '../../Shared/common/Dropdown/DropdownNative';
import { useAppSelector } from '../app/hooks';
import store from '../app/store';
import Spinner from '../../components/Spinner';
import { buildRequestURLForLGA } from '../helper/apiHelper';
import { eventPickingListUrlNew, eventPickingOldUrl, liveGameAssignmentUrl } from '../helper/exportExcelHelpper';
import ToastrWrapper from '../../components/ToastrWrapper';

const ExportSelector = () => {
  const policy = useAppSelector(state => state.policy);
  const isHostEventPicking = policy.entities.EventPicking.HasWrite;
  const filterState = store.getState().filter.filterState;
  const { selectedMatchStatus, selectedOffVRs, selectedMatchType, userNameFilterIsValid } = filterState;

  const exportExcel = (url: string) => {
    (async () => {
      Spinner.show();
      window.location.href = url;
      Spinner.hide();
    })();
  };

  const handleClickExportLiveGameAssignment = () => {
    const selectedMatchStatusIsValid = selectedMatchStatus.length > 0;
    const selectedSyncOffVRIsValid = selectedOffVRs.length > 0;
    const selectedMatchTypeIsValid = selectedMatchType.length > 0;
    if (
      selectedMatchStatusIsValid &&
      userNameFilterIsValid &&
      selectedMatchTypeIsValid &&
      selectedSyncOffVRIsValid
    ) {
      const url = buildRequestURLForLGA(liveGameAssignmentUrl(filterState));
      exportExcel(url);
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

  const handleClickExportEventPickingList = () => {
    const url = buildRequestURLForLGA(eventPickingOldUrl(filterState));
    exportExcel(url);
  };

  const handleClickExportEventPickingListNew = () => {
    const url = eventPickingListUrlNew(filterState);
    exportExcel(url);
  };

  if (isHostEventPicking) {
    const items = [
      {
        title: 'Live Game Assignment',
        handler: handleClickExportLiveGameAssignment
      },
      {
        title: 'Event Picking List',
        handler: handleClickExportEventPickingList
      },
      {
        title: 'Misc Match',
        handler: handleClickExportEventPickingListNew
      }
    ];
    return <DropdownNative items={items} />;
  }

  return (
    <button
      className='button-export'
      onClick={handleClickExportLiveGameAssignment}>
      Export
    </button>
  );
};

export default ExportSelector;
