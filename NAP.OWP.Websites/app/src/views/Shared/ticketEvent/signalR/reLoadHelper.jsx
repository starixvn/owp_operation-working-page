import { getTicketDetail } from '../../chatBoardNew/chatBoardSlice';

const handleReload = (store, actorId, owpMatchId, setData) => {
  const model = store.getState();
  const { issueModel } = model.signalREventTicket;
  const { isOpenPopup } = model.chatBoard;
  store.dispatch(setData({ actorId, owpMatchId }));
  isOpenPopup && store.dispatch(getTicketDetail(issueModel));
};

const handleReloadEventAssignment = (
  store,
  actorId,
  userId,
  owpMatchId,
  setData
) => {
  const model = store.getState();
  const { issueModel } = model.signalREventTicket;
  const { isOpenPopup } = model.chatBoard;
  store.dispatch(setData({ actorId, owpMatchId, userId }));
  isOpenPopup && store.dispatch(getTicketDetail(issueModel));
};

const handleReloadTicketDetail = store => {
  const model = store.getState();
  const { issueModel } = model.signalREventTicket;
  const { isOpenPopup } = model.chatBoard;
  isOpenPopup && store.dispatch(getTicketDetail(issueModel));
};

export { handleReload, handleReloadEventAssignment, handleReloadTicketDetail };
