import { netCoreURL, netFwURL } from '../const/const.json';

const currentDate = new Date();
const timeRange = {
  maxFeature: 10,
  maxPrevious: 20
};
const maxDate = new Date(currentDate.setDate(currentDate.getDate() + timeRange.maxFeature));
const minDate = new Date(currentDate.setDate(currentDate.getDate() - timeRange.maxPrevious));
const buildUrl = (methodRoute: Required<string>) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${methodRoute}`
    : `${window.netCoreRootUrl}/${netFwURL}/${methodRoute}`;

export {
  maxDate,
  minDate,
  buildUrl
};
