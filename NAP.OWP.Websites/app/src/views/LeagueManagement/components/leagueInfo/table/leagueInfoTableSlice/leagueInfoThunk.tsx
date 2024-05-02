import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildRequestURL } from '../../../../../Shared/Service/serviceHelper';
import { get } from '../../../../../Shared/Service/Service';
import { TDataSource } from '../TableType';

const getLeagueInfoThunk = createAsyncThunk<TDataSource[], string>(
  'dataTable/query',
  async (league = '') => {
    const url = buildRequestURL('league-management', 'get-all-league-setting');
    const data = await get({ url, league });
    return data.data as TDataSource[];
  }
);

export { getLeagueInfoThunk };
