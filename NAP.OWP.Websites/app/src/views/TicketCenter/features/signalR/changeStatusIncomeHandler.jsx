import { setTicketStatus as setPopupTicketStatus } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';
import { setTicketStatus as setTableTicketStatus } from '../Table/eventSlice/eventCheckingSlice';

const changeStatusIncomeHandler = async (ticketId, newStatus) => {
  const model = store.getState();
  const { isOpenPopup, ticketDetail } = model.chatBoard;
  const { ticketId: openTicketId } = ticketDetail;

  store.dispatch(setTableTicketStatus({ ticketId, newStatus }));
  isOpenPopup &&
    openTicketId === ticketId &&
    store.dispatch(setPopupTicketStatus(newStatus));
};

export default changeStatusIncomeHandler;
