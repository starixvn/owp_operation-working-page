import React from 'react';
import NetCoreSignalR from '../../../Shared/NetCoreSignalR/NetCoreSignalR';
import { reloadOpenTicketHandler, reloadPreMatch } from './reloadPreMatchHandler';
import { handleOpenTicketDetail } from './openTicketDetailHandler';

const SignalRWrapper = () => {
  const handleNewMessageIncome = () => reloadPreMatch();
  const handleNewAddRecipient = () => reloadPreMatch();
  const handleChangeTicketStatus = () => reloadOpenTicketHandler();

  const handlers = [
    {
      method: 'NotifyNewMessageIncome',
      handler: handleNewMessageIncome
    },
    {
      method: 'NotifyNewAddRecipient',
      handler: handleNewAddRecipient
    },
    {
      method: 'NotifyUserOnClickToast',
      handler: handleOpenTicketDetail
    },
    {
      method: 'NotifyChangeStatusIncome',
      handler: handleChangeTicketStatus
    }
  ];

  return (
    <NetCoreSignalR
      handlers={handlers}
      hubName='prematchNotifyHub'
    />
  );
};
export default SignalRWrapper;
