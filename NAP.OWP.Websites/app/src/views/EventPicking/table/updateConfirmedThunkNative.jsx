import { createAsyncThunk } from '@reduxjs/toolkit';
import { netCoreURL, UPDATE_CONFIRMED } from '../const/const.json';
import { post } from '../../Shared/Service/Service';

const buildRequestURL = () =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${UPDATE_CONFIRMED}`
    : `${window.netCoreRootUrl}/api/EventPicking/${UPDATE_CONFIRMED}`;

const updateConfirmedThunk = createAsyncThunk(
  'confirmed/update',
  async confirmInfo => {
    const url = buildRequestURL();
    await post({
      url,
      ...confirmInfo
    });

    return confirmInfo;
  }
);

export default updateConfirmedThunk;
