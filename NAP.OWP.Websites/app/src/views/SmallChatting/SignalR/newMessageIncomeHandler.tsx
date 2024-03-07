import { setNewMessage as setNewMessageOnChatBoard } from '../../Shared/chatBoardNew/chatBoardSlice';
import store from '../store';

const handleNewMessageIncome = (newMsgInfo: any, ticketInfo: any) => {
  const { chatBoard } = store.getState();
  const { ticketDetail, isOpenPopup } = chatBoard;
  const { ticketId } = ticketDetail;

  ticketId === newMsgInfo.ticketId &&
    isOpenPopup &&
    store.dispatch(setNewMessageOnChatBoard(newMsgInfo));
};

export default handleNewMessageIncome;
