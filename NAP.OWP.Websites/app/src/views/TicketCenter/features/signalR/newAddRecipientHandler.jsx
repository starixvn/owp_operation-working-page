import store from '../../app/storeNative';
import { appendTicketItemIntoDataSource } from '../Table/eventSlice/eventCheckingSlice';

const handleNewAddRecipient = ticketInfo => {
  store.dispatch(appendTicketItemIntoDataSource(ticketInfo));
};

export { handleNewAddRecipient };
