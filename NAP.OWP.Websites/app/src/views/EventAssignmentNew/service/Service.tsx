import axios from 'axios';
import { QUERY_SIMPLE_API } from '../../Shared/Constants';
import { buildRequestURLForLGA } from '../helper/apiHelper';
import {
  syncOffVRKey,
  lastUpdateSyncOffVRKey,
  lastUpdateEventAssignment
} from '../const.json';
import { TQueryDataModel } from '../type/type';

const queryDataExcel = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' });
  return response.data;
};

const query = async (eventModel: TQueryDataModel) => {
  const url = buildRequestURLForLGA('');
  const response = await axios.post(url, eventModel);
  return response.data;
};

const getLastUpdated = async (eventDate: string) => {
  const url = `${buildRequestURLForLGA(
    lastUpdateEventAssignment
  )}?date=${eventDate}`;
  const response = await axios.get(url);

  return response.data.uploadDateTime;
};

const syncOffVRs = async (eventModel: Date) => {
  const url = buildRequestURLForLGA(syncOffVRKey);
  const response = await axios.post(url, eventModel);
  return response.data;
};

const getSyncOffVRLastUpdated = async (eventDate: string) => {
  const url = `${buildRequestURLForLGA(
    lastUpdateSyncOffVRKey
  )}?date=${eventDate}`;
  const response = await axios.get(url);

  return response.data;
};

const Service = {
  queryDataExcel,
  query,
  getLastUpdated,
  syncOffVRs,
  getSyncOffVRLastUpdated
};

export default Service;
