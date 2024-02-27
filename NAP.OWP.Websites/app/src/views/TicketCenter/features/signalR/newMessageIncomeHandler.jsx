import { setNewMessage as setNewMessageOnChatBoard } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';
import { setNewMessage as setNewMessageOnTable } from '../Table/eventSlice/eventCheckingSlice';

const handleNewMessageIncome = newMsgInfo => {
  const {
    pagePolicy: { permission: ActorId }
  } = store.getState();
  store.dispatch(
    setNewMessageOnTable({
      ...newMsgInfo,
      isRead: ActorId === newMsgInfo.userId
    })
  );
  store.dispatch(setNewMessageOnChatBoard(newMsgInfo));
};

export { handleNewMessageIncome };
