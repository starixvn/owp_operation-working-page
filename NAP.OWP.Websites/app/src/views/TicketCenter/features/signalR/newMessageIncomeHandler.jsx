import { setNewMessage as setNewMessageOnChatBoard } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';
import { setNewMessage as setNewMessageOnTable } from '../Table/eventSlice/eventCheckingSlice';
import { reloadTicketCenterTable } from './signalRHelper';

const handleNewMessageIncome = newMsgInfo => {
  debugger;
  //const model = store.getState();
  store.dispatch(setNewMessageOnTable(newMsgInfo));
  store.dispatch(setNewMessageOnChatBoard(newMsgInfo));
  // TODO
  if (false) {
    reloadTicketCenterTable(model);
  }
};

export { handleNewMessageIncome };
