import { get } from '../Shared/Service/Service';
import { netCoreURL, netFwURL } from './const.json';

const buildRequestURL = (key: string | null) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${key}`
    : `${window.netCoreRootUrl}/${netFwURL}/${key}`;

const queryDataTable = async (fromDate: Date, toDate: Date) => {
  const url = process.env.NODE_ENV === 'development'
    ? `${netCoreURL}`
    : `${window.netCoreRootUrl}/${netFwURL}`;;
  const response = await get({
    url,
    fromDate,
    toDate
  });

  return response.data;
};

const queryConditionData = async () => {
  const url = buildRequestURL('get-condition');
  const response = await get({
    url
  });

  return response.data;
};

export { queryDataTable, queryConditionData };
