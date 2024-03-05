import { setNewMessage as setNewMessageOnChatBoard } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';
import { updateTicketItemIntoDataSource } from '../Table/eventSlice/eventCheckingSlice';
import { checkAllFilterCondition } from './signalRHelper';
const handleNewMessageIncome = (newMsgInfo, ticketInfo) => {
  const { chatBoard, signalR } = store.getState();
  const { filterModel, issueModel } = signalR;
  const isUpdate = checkAllFilterCondition(filterModel, ticketInfo);
  isUpdate && store.dispatch(updateTicketItemIntoDataSource(ticketInfo));
  issueModel.ticketId === newMsgInfo.ticketId &&
    chatBoard.isOpenPopup &&
    store.dispatch(setNewMessageOnChatBoard(newMsgInfo));
};

export { handleNewMessageIncome };
