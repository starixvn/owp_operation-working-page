import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildRequestURL } from '../../../../../Shared/Service/serviceHelper';
import { get } from '../../../../../Shared/Service/Service';
import { TDataSource } from '../TableType';

const getLeagueInfoThunk = createAsyncThunk<TDataSource[], string>(
  'dataTable/query',
  async (league = '') => {
    const url = buildRequestURL('NewLeagueSetting', 'getAllListSettings');
    const data = await get({ url, league });
    return data.data as TDataSource[];
  }
);

const getLeagueSettingByOwpLeagueId = createAsyncThunk<TDataSource[], number>(
  'dataTable/queryById',
  async (owpLeagueId = 0) => {
    const url = buildRequestURL(
      'NewLeagueSetting',
      'get-league-setting-by-owpLeagueId'
    );
    const data = await get({ url, owpLeagueId });
    return data.data as TDataSource[];
  }
);

export { getLeagueInfoThunk, getLeagueSettingByOwpLeagueId };
