import { post } from '../../../Shared/Service/Service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { netCoreURL, netFwURL, getEventPicking } from '../../const/const.json';
import { TFilter } from '../../types/filterType';
import TDataTable from '../../types/dataTableType';

const buildUrl = (methodRoute: Required<string>) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${methodRoute}`
    : `${window.netCoreRootUrl}/${netFwURL}/${methodRoute}`;

const getEventPickings = createAsyncThunk<TDataTable[], TFilter>(
  'EventPicking/getEventPicking',
  async modelFilter => {
    const url = buildUrl(getEventPicking);
    const response = await post({ url, ...modelFilter });
    return response.data as TDataTable[];
  }
);

export { getEventPickings };
