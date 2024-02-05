import store from '../../app/storeNative';
import { reloadTicketCenterTable } from './signalRHelper';
import { updateSubTypeByTicketId } from '../Table/eventSlice/eventCheckingSlice';
import { updateSubTypeTicketDetailByTicketId } from '../../../Shared/chatBoardNew/chatBoardSlice';
const changeSubTypeIncomeHandler = (
  ticketId,
  ticketSubTypeId,
  ticketSubTypeName
) => {
  const model = store.getState();
  const { isOpenPopup } = model.chatBoard;
  const payload = {
    ticketId,
    ticketSubTypeId,
    ticketSubTypeName
  };
  store.dispatch(updateSubTypeByTicketId(payload));
  isOpenPopup && store.dispatch(updateSubTypeTicketDetailByTicketId(payload));
};

export default changeSubTypeIncomeHandler;
