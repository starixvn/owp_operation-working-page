import React, { useEffect } from 'react';
import Filter from './filter/Filter';
import Table from './table/Table';
import { useAppDispatch, useAppSelector } from './app/hooks';
import queryPolicyThunk from './policy/queryPolicyThunk';
import { isEquals } from 'immutability-helper';
import { FunctionKeys, REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';
import CreateTicketLGAView from '../Shared/createTicketNew/CreateTicketLGAView';
import CreateTicketBoardOther from '../Shared/createTicketNew/CreateTicketBoardOther';
import CreateTicketLiveIncident from '../Shared/createTicketNew/CreateTicketLiveIncident';
import usePermission from '../Shared/customHook/usePermission';
import { RECIPIENT_TYPE } from '../Shared/createTicketNew/const/const';
import { CreatorInfo } from './type/type';
import TicketDetailBoard from '../Shared/chatBoardNew/TicketDetailBoard';

const EventAssignment = () => {
  const stableDispatch = useAppDispatch();
  const loading = useAppSelector(
    state => state.policy.loading,
    (previous, next) => isEquals(previous, next)
  );

  const pagePermissionModel = usePermission(
    FunctionKeys.TicketCenter,
    'pagePolicy'
  );

  const { permission } = pagePermissionModel;
  const { Username, ActorId } = permission;

  const creatorInfo: CreatorInfo = {
    groupName: null,
    nickName: Username,
    recipientId: ActorId,
    recipientType: RECIPIENT_TYPE.INDIVIDUAL,
    userName: Username
  };

  useEffect(() => {
    stableDispatch(queryPolicyThunk());
  }, [stableDispatch]);

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  return (
    <div className='event-assignment'>
      <div className='filter'>
        <Filter />
      </div>
      <Table />
      <CreateTicketLGAView creatorInfo={creatorInfo} />
      <CreateTicketBoardOther creatorInfo={creatorInfo} />
      <CreateTicketLiveIncident creatorInfo={creatorInfo} />
      <TicketDetailBoard />
    </div>
  );
};

export default EventAssignment;
