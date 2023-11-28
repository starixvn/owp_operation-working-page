import React from 'react';
import NetCoreSignalR from '../../Shared/NetCoreSignalR/NetCoreSignalR';
import { handleOpenTicketDetail } from './OpenTicketHandler';

const useSignalRWrapper = () => {
  const handlers = [
    {
      method: 'NotifyUserOnClickToast',
      handler: handleOpenTicketDetail
    }
  ];
  return <NetCoreSignalR handlers={handlers} hubName='ticketCenterNotifyHub' />;
};

export default useSignalRWrapper;
