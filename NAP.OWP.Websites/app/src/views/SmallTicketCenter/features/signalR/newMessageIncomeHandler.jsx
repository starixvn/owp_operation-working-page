import store from '../../app/storeNative';
import { updateTicketItemIntoDataSource } from '../table/slice/tickerSlice';

const handleNewMessageIncome = (newMsgInfo, ticketInfo) => {
  const { signalR } = store.getState();
  const { filterModel } = signalR;
  store.dispatch(updateTicketItemIntoDataSource({ ticketInfo, filterModel }));
};

export { handleNewMessageIncome };
