import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildRequestURL } from '../../../../../Shared/Service/serviceHelper';
import { get } from '../../../../../Shared/Service/Service';

const getLeagueInfoThunk = createAsyncThunk<any>(
  'dataTable/query',
  async (league: string) => {
    console.log(league);
    const url = buildRequestURL('leagueManagement', 'getAllListSettings');
    const data = await get({ url, league });
  }
);

export { getLeagueInfoThunk };
