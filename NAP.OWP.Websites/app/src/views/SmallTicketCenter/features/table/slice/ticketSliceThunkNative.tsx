import { post } from '../../../../Shared/Service/Service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  netCoreURL,
  netFwURL,
  getEventTicket
} from '../../../const/const.json';
import { TTicket, TFilerParam } from '../../../type';

const genUrl = (routePostfix:string) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${routePostfix}`
    : `${window.netCoreRootUrl}/${netFwURL}/${routePostfix}`;

const getEventTickets = createAsyncThunk<Array<TTicket>, TFilerParam>(
  'TicketCenter/getEventChecking',
  async filterParam => {
    const url = genUrl(getEventTicket);
    const response = await post({ url, ...filterParam });
    return response.data;
  }
);


export { getEventTickets};
