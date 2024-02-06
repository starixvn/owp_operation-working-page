import { setNewMessage as setNewMessageOnChatBoard } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';
import { setNewMessage as setNewMessageOnTable } from '../Table/eventSlice/eventCheckingSlice';

const handleNewMessageIncome = newMsgInfo => {
  debugger;

  store.dispatch(setNewMessageOnTable(newMsgInfo));
  store.dispatch(setNewMessageOnChatBoard(newMsgInfo));
  // TODO
};

export { handleNewMessageIncome };
