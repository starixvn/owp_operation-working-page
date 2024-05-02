const netCoreURL = 'api-netcore';
const netFwURL = 'api';

const buildRequestURL = (baseUrl: string, key: string) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${baseUrl}/${key}`
    : `${window.netCoreRootUrl}/${netFwURL}/${baseUrl}/${key}`;

export { buildRequestURL };
