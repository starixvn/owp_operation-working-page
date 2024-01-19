import { netCoreURL, netFwURL } from '../const.json';
const buildRequestURLForLGA = (key: string) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}${key}`
    : `${window.netCoreRootUrl}/${netFwURL}${key}`;

export { buildRequestURLForLGA };
