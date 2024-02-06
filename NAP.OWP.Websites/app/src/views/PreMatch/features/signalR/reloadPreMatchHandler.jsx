import { getTicketDetail } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/store';
import { reloadTicketInTable } from '../league/shiftSlice/shiftSlice';
import ToastsWrapper from '../../../components/ToastrWrapper';

const reloadPreMatch = async (id, isTicketLeague, ticket) => {
  const ticketFormatted = {
    EventType: ticket.eventType,
    IsRead: ticket.isRead,
    LatestCreatedDate: ticket.latestCreatedDate,
    LatestMessage: ticket.latestMessage,
    LatestUsername: ticket.latestUsername,
    OWPLeagueId: ticket.owpLeagueId,
    SubtypeId: ticket.subtypeId,
    SubtypeName: ticket.subtypeName,
    TicketId: ticket.ticketId,
    InfoSiteMatchId: ticket.infoSiteMatchId
  };
  debugger;
  // TODO
  reloadTicketInPreMatchTableHandler(id, isTicketLeague, ticketFormatted);
  await reloadOpenTicketHandler();
};

const reloadTicketInPreMatchTableHandler = (id, isTicketLeague, ticket) => {
  const model = store.getState();
  const { isEdit } = model.editor;
  !isEdit &&
    store.dispatch(reloadTicketInTable({ id, isTicketLeague, ticket }));
};

const reloadOpenTicketHandler = async () => {
  const model = store.getState();
  const { backupGetIssueModel } = model.signalR;
  const { isOpenPopup } = model.chatBoard;

  if (isOpenPopup) {
    const actionResult = await store.dispatch(
      getTicketDetail(backupGetIssueModel)
    );
    if (getTicketDetail.rejected.match(actionResult)) {
      ToastsWrapper.showError(actionResult.payload);
    }
  }
};

export { reloadOpenTicketHandler, reloadPreMatch };
