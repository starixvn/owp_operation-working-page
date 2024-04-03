import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../../Shared/Service/Service';
import Utils from '../../../Shared/Utils';
import { netCoreURL, netFwURL } from './TableSchema.json';
import { TDataSource } from '../../type/table';

const getUrl = (methodRoute: string) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${methodRoute}`
    : `${window.netCoreRootUrl}/${netFwURL}/${methodRoute}`;

const getEvents = createAsyncThunk<TDataSource[]>(
  'provider-verification/get-event',
  async eventDate => {
    const url = getUrl('query');
    const response = await get({
      url,
      eventDate: Utils.formatDate(eventDate)
    });
    return response.data;
  }
);

export { getEvents };
