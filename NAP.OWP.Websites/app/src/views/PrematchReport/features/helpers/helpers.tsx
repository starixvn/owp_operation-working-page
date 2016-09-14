import {
  netCoreURL,
  netFwURL,
  dateRangeDefault,
  dateRangeValid,
  time
} from '../../Const.json';

const buildRequestURL = (key: string) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${key}`
    : `${window.netCoreRootUrl}/${netFwURL}/${key}`;

const curr = new Date(Date.now());
const toDateDefault = new Date(curr.setDate(curr.getDate() - 1));
const fromDateDefault = new Date(
  curr.setDate(curr.getDate() - dateRangeDefault)
);

const validDateRange = (fromDate: Date, toDate: Date) => {
  const dateRange = (toDate.getTime() - fromDate.getTime()) / time;
  return dateRange > dateRangeValid;
};

const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export {
  buildRequestURL,
  validDateRange,
  toDateDefault,
  fromDateDefault,
  getKeyValue
};
