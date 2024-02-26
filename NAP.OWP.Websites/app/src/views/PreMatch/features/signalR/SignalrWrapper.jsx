import NetCoreSignalR from '../../../Shared/NetCoreSignalR/NetCoreSignalR';
import {
  reloadOpenTicketHandler,
  reloadPreMatch,
  reloadTicketCellInTable
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
      handler: reloadTicketCellInTable
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

  return <NetCoreSignalR handlers={handlers} hubName='preMatchNotifyHub' />;
};
export default SignalRWrapper;
