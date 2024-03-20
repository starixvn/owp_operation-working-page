import NetCoreSignalR from '../../Shared/NetCoreSignalR/NetCoreSignalR';
import handleNewMessageIncome from './newMessageIncomeHandler';
import handleChangeTicketStatus from './changeStatusIncomeHandler';
import changeSubTypeIncomeHandler from './changeSubTypeIncomeHandler';

const useSignalRWrapper = () => {
  const handlers = [
    {
      method: 'NotifyNewMessageIncome',
      handler: handleNewMessageIncome
    },
    {
      method: 'NotifyChangeStatusIncome',
      handler: handleChangeTicketStatus
    },
    {
      method: 'NotifyChangeSubTypeIncome',
      handler: changeSubTypeIncomeHandler
    }
  ];

  return <NetCoreSignalR handlers={handlers} hubName='ticketCenterNotifyHub' />;
};

export default useSignalRWrapper;
