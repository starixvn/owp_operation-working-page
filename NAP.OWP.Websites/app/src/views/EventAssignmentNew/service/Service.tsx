import axios from 'axios';
import { QUERY_SIMPLE_API } from '../../Shared/Constants';
import { buildRequestURL as buildRequestURLForLiveDetail } from '../../LiveDetail/buildUrlHelper';
import { buildRequestURLForLGA } from '../helper/apiHelper';
import { syncOffVRKey, lastUpdateSyncOffVRKey } from '../const.json';

const queryDataExcel = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' });
  return response.data;
};

const query = async (eventModel: any) => {
  const url = buildRequestURLForLGA('');
  const response = await axios.post(url, eventModel);
  return response.data;
};

// const addNew = async formModel => {
//   const response = await axios.post(
//     'api/event-assignment/add-event',
//     formModel
//   );
//   return response.data;
// };

// const editEvent = async formModel => {
//   const response = await axios.post(
//     'api/event-assignment/edit-event',
//     formModel
//   );
//   return response.data;
// };

// const getBettypeForTraderInfo = async () => {
//   const postModel = {
//     apiKey: 'live-game-assignment-get-bettype-for-trading-info'
//   };
//   const response = await axios.post(QUERY_SIMPLE_API, postModel);
//   return response.data;
// };

// const getInfoSiteMatch = async postModel => {
//   const response = await axios.post(
//     buildRequestURLForLiveDetail('infosite-match/get'),
//     postModel
//   );
//   return response.data;
// };

// const getBettypeForMatchInfo = async parentMatchId => {
//   const postModel = {
//     ApiKey: 'live-game-assignment-get-bettype-for-special-event',
//     ParentMatchId: parentMatchId
//   };
//   const response = await axios.post(QUERY_SIMPLE_API, postModel);
//   return response.data;
// };

// const getSpecialEventTemplate = async (parentMatchId, minorBettypeId) => {
//   const postModel = {
//     ApiKey: 'live-game-assignment-get-special-event-template',
//     ParentMatchId: parentMatchId,
//     MinorBettypeId: minorBettypeId
//   };
//   const response = await axios.post(QUERY_SIMPLE_API, postModel);
//   return response.data[0];
// };

// const getLastUpdated = async eventDate => {
//   const postModel = {
//     ApiKey: 'get-last-updated',
//     EventDate: eventDate
//   };
//   const response = await axios.post(QUERY_SIMPLE_API, postModel);

//   return response.data.length === 0 ? null : response.data[0].UploadDateTime;
// };

const syncOffVRs = async (eventModel: any) => {
  const url = buildRequestURLForLGA(syncOffVRKey);
  const response = await axios.post(url, eventModel);
  return response.data;
};

const getSyncOffVRLastUpdated = async (eventDate: any) => {
  const url = `${buildRequestURLForLGA(
    lastUpdateSyncOffVRKey
  )}?date=${eventDate}`;
  const response = await axios.get(url);

  return response.data;
};

const Service = {
  queryDataExcel,
  query,
  // addNew,
  // editEvent,
  // getBettypeForTraderInfo,
  // getInfoSiteMatch,
  // getBettypeForMatchInfo,
  // getSpecialEventTemplate,
  // getLastUpdated,
  syncOffVRs,
  getSyncOffVRLastUpdated
};

export default Service;
