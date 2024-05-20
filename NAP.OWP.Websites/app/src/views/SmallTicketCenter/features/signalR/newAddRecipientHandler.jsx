import { checkAllFilterCondition } from './signalRHelper';
import store from '../../app/storeNative';
import { appendTicketItemIntoDataSource } from '../table/slice/tickerSlice';

const handleNewAddRecipient = ticketInfo => {
  const model = store.getState();
  const { filterModel } = model.signalR;
  const isAppend = checkAllFilterCondition(filterModel, ticketInfo);
  isAppend && store.dispatch(appendTicketItemIntoDataSource(ticketInfo));
};

export { handleNewAddRecipient };
