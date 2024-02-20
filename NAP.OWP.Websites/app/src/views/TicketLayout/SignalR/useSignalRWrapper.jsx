import NetCoreSignalR from '../../Shared/NetCoreSignalR/NetCoreSignalR';
import handleNewMessageIncome from './newMessageIncomeHandler';
import handleNewAddRecipient from './newAddRecipientHandler';
import handleOpenTicketDetail from './handleOpenTicketDetail';
import handleChangeTicketStatus from './changeStatusIncomeHandler';
import changeSubTypeIncomeHandler from './changeSubTypeIncomeHandler';

const useSignalRWrapper = () => {
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
      method: 'NotifyChangeStatusIncome',
      handler: handleChangeTicketStatus
    },
    {
      method: 'NotifyChangeSubTypeIncome',
      handler: changeSubTypeIncomeHandler
    },
    {
      method: 'NotifyUserOnClickToast',
      handler: handleOpenTicketDetail
    }
  ];

  return <NetCoreSignalR handlers={handlers} hubName='ticketCenterNotifyHub' />;
};

export default useSignalRWrapper;
