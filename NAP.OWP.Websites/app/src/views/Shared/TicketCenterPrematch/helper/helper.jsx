import { EVENT_TYPE, URL, TICKET_TYPE } from '../const/const.json';
import { FunctionKeys } from '../../Constants';
import getPermission from '../../permission/getPermission';
import { isEqual } from 'lodash';

const { LEAGUE, MATCH, OTHER, SUPPORT, LIVE_INCIDENT } = EVENT_TYPE;
const {
  GET_TICKET_DETAIL_LEAGUE,
  GET_TICKET_DETAIL_MATCH,
  GET_TICKET_DETAIL_OTHER,
  GET_TICKET_DETAIL_SUPPORT
} = URL;

const getDetailSegmentUrlByEventType = eventType => {
  const detailSegmentUrlLookupTable = {
    [LEAGUE]: GET_TICKET_DETAIL_LEAGUE,
    [MATCH]: GET_TICKET_DETAIL_MATCH,
    [OTHER]: GET_TICKET_DETAIL_OTHER,
    [SUPPORT]: GET_TICKET_DETAIL_SUPPORT,
    [LIVE_INCIDENT]: URL.GET_TICKET_DETAIL_LIVE_INCIDENT
  };
  return detailSegmentUrlLookupTable[eventType];
};

const segmentPrefix = [
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'Main',
  'v1',
  'v2',
  'OWP-Staging',
  'OWP'
];

const buildGoToMyTicketLink = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return ``;
  }
  const segmentFirst = window.location.pathname.split('/')[1];
  return segmentPrefix.some(seg => isEqual(seg, segmentFirst))
    ? `/${segmentFirst}/MyTickets`
    : `/MyTickets`;
};

const getMyTicketPermission = () => getPermission(FunctionKeys.Tickets);

export {
  getDetailSegmentUrlByEventType,
  EVENT_TYPE,
  URL,
  TICKET_TYPE,
  buildGoToMyTicketLink,
  getMyTicketPermission
};
