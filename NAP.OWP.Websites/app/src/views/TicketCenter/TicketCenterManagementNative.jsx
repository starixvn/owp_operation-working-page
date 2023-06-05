import React from 'react';
import { OWPPage, OWPHeader, OWPBody } from '../Shared/common/OWP/OPWPage';
import HeaderNative from './features/header/HeaderNative';

import TicketCenterTable from './features/Table/TicketCenterTable';

import { FunctionKeys } from '../Shared/Constants';
import Loading from '../components/Loading';
import { usePermission } from './ImportTicketCenterHelperNative';
import { RECIPIENT_TYPE } from './const/const.json';
import TicketDetailBoard from '../Shared/chatBoardNew/TicketDetailBoard';
import CreateTicketLiveIncident from '../Shared/createTicketNew/CreateTicketLiveIncident';
import CreateTicketEventChecking from '../Shared/createTicketNew/CreateTicketEventChecking';
import CreateTicketBoardOther from '../Shared/createTicketNew/CreateTicketBoardOther';
import TicketLogWorkCreator from './../Shared/createTicketNew/TicketLogWork/TicketLogWorkCreator';

const { INDIVIDUAL } = RECIPIENT_TYPE;
const TicketCenterManagementNative = () => {
  const pagePermissionModel = usePermission(
    FunctionKeys.TicketCenter,
    'pagePolicy'
  );
  usePermission(FunctionKeys.DeleteTickets, 'deletePolicy');

  const { permission } = pagePermissionModel;

  if (!permission.Username) {
    return <Loading />;
  }

  const creatorInfo = {
    groupName: null,
    nickName: permission.Username,
    recipientId: permission.ActorId,
    recipientType: INDIVIDUAL,
    userName: permission.Username
  };
  return (
    <div className='ticket-center'>
      <OWPPage className='Event-Tickets'>
        <OWPHeader className='tickets-tab'>
          <HeaderNative />
        </OWPHeader>

        <OWPBody className='tickets-tab'>
          <div className='table-EventChecking'>
            <TicketCenterTable />
          </div>
          <div className='popup-ChatBoard'>
            <TicketDetailBoard />
          </div>
          <CreateTicketEventChecking creatorInfo={creatorInfo} />
          <CreateTicketLiveIncident creatorInfo={creatorInfo} />
          <CreateTicketBoardOther creatorInfo={creatorInfo} />
          <TicketLogWorkCreator />
        </OWPBody>
      </OWPPage>
    </div>
  );
};

export default TicketCenterManagementNative;
