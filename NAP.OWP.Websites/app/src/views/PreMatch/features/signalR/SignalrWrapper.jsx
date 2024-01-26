import NetCoreSignalR from '../../../Shared/NetCoreSignalR/NetCoreSignalR';
import {
  reloadOpenTicketHandler,
  reloadPreMatch
} from './reloadPreMatchHandler';
import { handleOpenTicketDetail } from './openTicketDetailHandler';

const SignalRWrapper = () => {
  const handlers = [
    {
      method: 'NotifyNewMessageIncome',
      handler: reloadPreMatch
    },
    {
      method: 'NotifyNewAddRecipient',
      handler: reloadPreMatch
    },
    {
      method: 'NotifyUserOnClickToast',
      handler: handleOpenTicketDetail
    },
    {
      method: 'NotifyChangeStatusIncome',
      handler: reloadOpenTicketHandler
    }
  ];

  return <NetCoreSignalR handlers={handlers} hubName='prematchNotifyHub' />;
};
export default SignalRWrapper;
