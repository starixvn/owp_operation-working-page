import React from 'react';
import DropdownNative from '../../Shared/common/Dropdown/DropdownNative';
import { useAppSelector } from '../app/hooks';
import { eventPickingListUrlNew, eventPickingOldUrl, liveGameAssignmentUrl } from '../helper/exportExcelHelpper';

const ExportSelector = () => {
  const policy = useAppSelector(state => state.policy);
  const isHostEventPicking = policy.entities.EventPicking.HasWrite;
  const handleClickExportLiveGameAssignment = () => {
    // TODO
  };
  const handleClickExportEventPickingList = () => {
    const url = buildRequestURLForLGA(eventPickingOldUrl(filterState));
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
