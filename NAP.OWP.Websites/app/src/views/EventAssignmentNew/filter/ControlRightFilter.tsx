import React from 'react';
import GoToMyTicket from '../../Shared/TicketCenterPrematch/GoToMyTicket';
import DailyWorking from './DailyWorking';
import { useAppSelector } from '../app/hooks';

const ControlRightFilter = () => {
  const syncOffVRByUser = useAppSelector(
    state => state.eventAssignmentTable.syncOffVRByUser
  );
  const syncOffVRLastTime = useAppSelector(
    state => state.eventAssignmentTable.syncOffVRLastTime
  );
  const dateUpdated = useAppSelector(
    state => state.eventAssignmentTable.dateUpdated
  );
  return (
    <div className='filter-control-right'>
      <div className='top-info'>
        <span className='sync-off-vr-last-update'>
          Sync Off VR by {syncOffVRByUser}: {syncOffVRLastTime}
        </span>
        <span className='lastupdate'>| Last Updated: {dateUpdated}</span>
        <GoToMyTicket />
      </div>
      <DailyWorking />
    </div>
  );
};
export default ControlRightFilter;
