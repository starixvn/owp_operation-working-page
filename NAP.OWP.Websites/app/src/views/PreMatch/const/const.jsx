import {
  NET_CORE_QUERY_SIMPLE_API,
  NET_CORE_UPDATE_SIMPLE_API,
  QUERY_SIMPLE_API,
  UPDATE_SIMPLE_API
} from '../../Shared/Constants';

const netCoreUrl = window.netCoreRootUrl;
const url =
  process.env.NODE_ENV === 'development'
    ? `api-netcore/PreMatchAssignment`
    : `${window.netCoreRootUrl}/api/PreMatchAssignment`;

const simpleApiQueryUrl =
  process.env.NODE_ENV === 'development'
    ? `${NET_CORE_QUERY_SIMPLE_API}`
    : `${window.netCoreRootUrl}/${QUERY_SIMPLE_API}`;

const simpleApiUpdateUrl =
  process.env.NODE_ENV === 'development'
    ? `${NET_CORE_UPDATE_SIMPLE_API}`
    : `${window.netCoreRootUrl}/${UPDATE_SIMPLE_API}`;

const URLQUERYCHANGELOG = `${url}/get-log`;

const URLQUERYWORKINGSHIFT = `${url}/get-working-shift`;

const URLQUERYINFOMATCH = `${url}/get-info-match`;
const URLQUERYASSIGNEE = `${url}/get-assignee-pre-match`;
const URLNIGHTSHIFT = `${url}/get-night-shift`;
const URLDAYSHIFT = `${url}/get-day-shift`;
const URLQUERYLEAGUEBYID = `${url}/query-league-by-id`;
const URLQUERYASSIGNEDLEAGUEID = `${url}/get-assigned-league-id`;

const LASTUPDATED = {
  apiKey: 'pre-match-assignment-get-last-updated'
};

const TAKEOVERAPIKEY = 'pre-match-assignment-get-start-time';

const QUERYDELETELEAGUEAPIKEY = 'pre-match-assignment-get-deleted-leagues';

const QUERYDELETELEAGUERECOVERAPIKEY = 'pre-match-assignment-recover';

const QUERYCHECKLEAGUECONTAINSASSIGNMENT =
  'pre-match-assignment-check-league-contains-assignment';

const URL = {
  INSERTNOTE: `${url}/post-note-message`,
  CREATENOTE: `${url}/create-note`,
  UPDATENOTE: `${url}/edit-note-message`,
  SAVE_PREMATCH_ASSIGNMENT: `${url}/save`
};

const APIKEY = {
  QUERYNOTE: 'pre-match-assignment-get-note-messages',
  DELETENOTE: 'pre-match-assignment-delete-note-messages'
};

const NOTETYPE = {
  LEAGUE: 'LEAGUE',
  MATCH: 'MATCH'
};

const ticketType = {
  EVEN_CHECKING: 1,
  TICKET_SUPPORT: 3
};

const MATCH_OFFER = [
  { value: 'Opened', label: 'Running' },
  { value: 'HDP (?)', label: 'HDP (?)' },
  { value: 'OU (?)', label: 'OU (?)' },
  { value: '', label: 'Waiting' }
];

const TradingPageUrl = 'http://deadball.oneops.net/Market/totalbet.aspx';

const BetType = {
  HDP: 1,
  OU: 3
};

export {
  ticketType,
  URLQUERYCHANGELOG,
  URLQUERYWORKINGSHIFT,
  URLQUERYINFOMATCH,
  URLQUERYASSIGNEE,
  QUERYDELETELEAGUEAPIKEY,
  QUERYDELETELEAGUERECOVERAPIKEY,
  QUERYCHECKLEAGUECONTAINSASSIGNMENT,
  LASTUPDATED,
  TAKEOVERAPIKEY,
  URLNIGHTSHIFT,
  URLDAYSHIFT,
  URLQUERYLEAGUEBYID,
  APIKEY,
  URL,
  NOTETYPE,
  netCoreUrl,
  MATCH_OFFER,
  TradingPageUrl,
  BetType,
  URLQUERYASSIGNEDLEAGUEID,
  simpleApiQueryUrl,
  simpleApiUpdateUrl
};
