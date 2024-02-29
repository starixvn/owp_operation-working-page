import { setNewMessage as setNewMessageOnChatBoard } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';
import { setNewMessage as setNewMessageOnTable } from '../Table/eventSlice/eventCheckingSlice';

const handleNewMessageIncome = newMsgInfo => {
  debugger;
  const {
    pagePolicy: {
      permission: { ActorId }
    },
    signalR: { issueModel },
    chatBoard
  } = store.getState();
  store.dispatch(
    setNewMessageOnTable({
      ...newMsgInfo,
      isRead: ActorId === newMsgInfo.userId
    })
  );
  issueModel.ticketId === newMsgInfo.ticketId &&
    chatBoard.isOpenPopup &&
    store.dispatch(setNewMessageOnChatBoard(newMsgInfo));
};

export { handleNewMessageIncome };
