import isEqual from 'lodash.isequal';

const buildWritePermission = (bettypeName, policy) => {
  const { FullBetTypes, PHBetTypes } = policy;
  if (!FullBetTypes.HasWrite && !PHBetTypes.HasWrite) {
    return false;
  }
  if (FullBetTypes.HasWrite) {
    return true;
  }
  if (
    (isEqual(bettypeName, 'FM') || isEqual(bettypeName, 'AIO')) &&
    PHBetTypes.HasWrite
  ) {
    return true;
  }
  return false;
};

export { buildWritePermission };
