import { setNewMessage } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/store';
import {
  reloadTicketInTable,
  reloadTicketCell
} from '../league/shiftSlice/shiftSlice';
import { throttle } from 'lodash';
import { URL_QUERY_TICKET_LIST } from '../../const/const';
import { get } from '../../ImportPrematchHelperNative';

const reloadTicketCellInTable = async (id, isTicketLeague) => {
  const model = store.getState();
  const { isEdit } = model.editor;
  const { permission } = model.policy;
  const getTicketList = async () => {
    const response = await get({
      url: URL_QUERY_TICKET_LIST,
      id,
      actorId: permission.ActorId,
      isTicketLeague
    });
    return response.data;
  };
  const submitThrottle = throttle(ticketList => {
    store.dispatch(reloadTicketCell({ id, isTicketLeague, ticketList }));
  }, 500);
  const ticketList = await getTicketList();

  !isEdit && submitThrottle(ticketList);
};

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

export { reloadOpenTicketHandler, reloadPreMatch, reloadTicketCellInTable };
