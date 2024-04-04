import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../../Shared/Service/Service';
import Utils from '../../../Shared/Utils';
import { netCoreURL, netFwURL } from './TableSchema.json';

const getUrl = (methodRoute: string) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${methodRoute}`
    : `${window.netCoreRootUrl}/${netFwURL}/${methodRoute}`;

const getEvents = createAsyncThunk(
  'provider-verification/get-event',
  async (eventDate: Date) => {
    const url = getUrl('get-provider-verification');
    const response = await get({
      url,
      eventDate: Utils.formatDate(eventDate)
    });
    return response.data;
  }
);

export { getEvents };
