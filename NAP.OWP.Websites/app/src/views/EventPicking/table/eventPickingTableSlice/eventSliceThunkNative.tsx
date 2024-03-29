import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../../Shared/Service/Service';
import { getEventPicking, netCoreURL, netFwURL } from '../../const/const.json';
import { TResult } from '../../types/dataTableType';
import { TFilter } from '../../types/filterType';

const buildUrl = (methodRoute: Required<string>) =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${methodRoute}`
    : `${window.netCoreRootUrl}/${netFwURL}/${methodRoute}`;

const getEventPickings = createAsyncThunk<TResult, TFilter>(
  'EventPicking/getEventPicking',
  async modelFilter => {
    const url = buildUrl(getEventPicking);
    const response = await post({ url, ...modelFilter });
    return response.data as TResult;
  }
);

export { getEventPickings };

