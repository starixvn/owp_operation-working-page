import { get, post } from '../Shared/Service/Service';
import Utils from '../Shared/Utils';
import { netCoreURL, netFwURL } from './const.json';
import { Target } from './feature/type/TableType.native';

const buildRequestURL = (key: string | null) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${key}`
    : `${window.netCoreRootUrl}/${netFwURL}/${key}`;

const queryDataTable = async (
  filterFromDate: Date,
  filterToDate: Date,
  sectionIds: string
) => {
  const url = buildRequestURL('');
  const fromDate = Utils.formatDate(filterFromDate);
  const toDate = Utils.formatDate(filterToDate);

  const response = await get({
    url,
    fromDate,
    toDate,
    sectionIds
  });
  return response.data;
};

const exportDataTable = async (
  filterFromDate: Date,
  filterToDate: Date,
  sectionIds: string
) => {
  const url = buildRequestURL('export');
  const fromDate = Utils.formatDate(filterFromDate);
  const toDate = Utils.formatDate(filterToDate);
  window.location.href = `${url}?fromDate=${fromDate}&toDate=${toDate}&sectionIds=${sectionIds}`;
};

const queryConditionData = async () => {
  const url = buildRequestURL('get-condition');
  const response = await get({
    url
  });

  return response.data;
};

const queryLevelOption = async () => {
  const url = buildRequestURL('get-level-option');
  const response = await get({ url });

  return response.data;
};

const updateTargetLevel = async (model: Target[]) => {
  const url = buildRequestURL('update-target-level');
  const response = await post({ url, targetLevel: model });

  return response.data;
};

const getSectionOption = async (userId: number) => {
  const url = buildRequestURL('get-all-section');
  const response = await get({
    url,
    userId
  });
  return response.data;
};

export {
  queryDataTable,
  queryConditionData,
  queryLevelOption,
  updateTargetLevel,
  exportDataTable,
  getSectionOption
};
