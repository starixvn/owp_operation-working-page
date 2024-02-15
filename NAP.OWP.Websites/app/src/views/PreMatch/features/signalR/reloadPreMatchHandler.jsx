import {
  getTicketDetail,
  setNewMessage
} from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/store';
import { reloadTicketInTable } from '../league/shiftSlice/shiftSlice';
import ToastsWrapper from '../../../components/ToastrWrapper';

const reloadPreMatch = async (id, isTicketLeague, data) => {
  const { ticket, messageResponse } = data;
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
  // TODO
  reloadTicketInPreMatchTableHandler(id, isTicketLeague, ticketFormatted);

  reloadOpenTicketHandler(messageResponse);
};

const reloadTicketInPreMatchTableHandler = (id, isTicketLeague, ticket) => {
  const model = store.getState();
  const { isEdit } = model.editor;
  !isEdit &&
    store.dispatch(reloadTicketInTable({ id, isTicketLeague, ticket }));
};

const reloadOpenTicketHandler = messageResponse => {
  store.dispatch(setNewMessage(messageResponse));
};

export { reloadOpenTicketHandler, reloadPreMatch };
