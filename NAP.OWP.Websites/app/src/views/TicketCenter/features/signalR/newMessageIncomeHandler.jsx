import store from '../../app/storeNative';
import { setNewMessage } from '../Table/eventSlice/eventCheckingSlice';
import { reloadTicketCenterTable } from './signalRHelper';

const handleNewMessageIncome = newMsgInfo => {
  debugger;
  //const model = store.getState();
  store.dispatch(setNewMessage(newMsgInfo));
  // TODO
  if (false) {
    reloadTicketCenterTable(model);
  }
};

export { handleNewMessageIncome };
