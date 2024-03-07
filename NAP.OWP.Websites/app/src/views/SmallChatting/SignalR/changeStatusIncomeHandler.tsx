import { setTicketStatus as setPopupTicketStatus } from '../../Shared/chatBoardNew/chatBoardSlice';
import store from '../app/store';

const changeStatusIncomeHandler = (ticketInfo: any) => {
  const model = store.getState();
  const { isOpenPopup, ticketDetail } = model.chatBoard;
  const { ticketId, ticketStatus } = ticketInfo;
  const { ticketId: openTicketId } = ticketDetail;

  isOpenPopup &&
    openTicketId === ticketId &&
    store.dispatch(setPopupTicketStatus(ticketStatus));
};

export default changeStatusIncomeHandler;
