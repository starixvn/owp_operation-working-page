import store from '../../app/storeNative';
import { updateTicketItemIntoDataSource } from '../Table/eventSlice/eventCheckingSlice';

const handleNewMessageIncome = (newMsgInfo, ticketInfo) => {
  const { signalR } = store.getState();
  const { filterModel } = signalR;
  store.dispatch(updateTicketItemIntoDataSource({ ticketInfo, filterModel }));
};

export { handleNewMessageIncome };
