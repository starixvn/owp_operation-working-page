import { updateSubTypeTicketDetailByTicketId } from '../../Shared/chatBoardNew/chatBoardSlice';
import store from '../app/store';

const changeSubTypeIncomeHandler = (ticketInfo: any) => {
  const model = store.getState();
  const { isOpenPopup } = model.chatBoard;

  isOpenPopup &&
    store.dispatch(updateSubTypeTicketDetailByTicketId(ticketInfo));
};

export default changeSubTypeIncomeHandler;
