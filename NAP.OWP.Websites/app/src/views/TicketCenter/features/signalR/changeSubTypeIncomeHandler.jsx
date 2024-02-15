import store from '../../app/storeNative';
import {
  appendTicketItemIntoDataSource,
  removeTicketItemFromDataSource,
  updateSubTypeByTicketId
} from '../Table/eventSlice/eventCheckingSlice';
import { checkAllFilterCondition } from './signalRHelper';
import { updateSubTypeTicketDetailByTicketId } from '../../../Shared/chatBoardNew/chatBoardSlice';
const changeSubTypeIncomeHandler = ticketInfo => {
  const model = store.getState();
  const { isOpenPopup } = model.chatBoard;
  const { filterModel } = model.signalR;
  const { entities } = model.eventChecking;
  const isCorrectFilter = checkAllFilterCondition(filterModel, ticketInfo);
  const elementByTicketId = entities.find(
    x => x.ticketId === ticketInfo.ticketId
  );
  if (isCorrectFilter) {
    if (elementByTicketId) {
      store.dispatch(updateSubTypeByTicketId(ticketInfo));
      isOpenPopup &&
        store.dispatch(updateSubTypeTicketDetailByTicketId(ticketInfo));
    } else {
      store.dispatch(appendTicketItemIntoDataSource(ticketInfo));
    }
  } else {
    store.dispatch(removeTicketItemFromDataSource(ticketInfo));
  }
};

export default changeSubTypeIncomeHandler;
