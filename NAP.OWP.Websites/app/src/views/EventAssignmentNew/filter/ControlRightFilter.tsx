import React from 'react';
import GoToMyTicket from '../../Shared/TicketCenterPrematch/GoToMyTicket';
import DailyWorking from './DailyWorking';

const ControlRightFilter = () => {
  const syncOffVRByUser = 'anything';
  const syncOffVRLastUpdated = 'anything';
  const dateUpdated = 'anything';
  return (
    <div className='filter-control-right'>
      <div className='top-info'>
        <span className='sync-off-vr-last-update'>
          Sync Off VR by {syncOffVRByUser}: {syncOffVRLastUpdated}
        </span>
        <span className='lastupdate'>| Last Updated: {dateUpdated}</span>
        <GoToMyTicket />
      </div>
      <DailyWorking />
    </div>
  );
};
export default ControlRightFilter;
