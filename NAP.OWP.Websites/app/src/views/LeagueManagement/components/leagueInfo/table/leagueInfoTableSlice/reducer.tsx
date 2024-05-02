import { createSlice } from '@reduxjs/toolkit';
import { TFilterState, TTableSlice } from '../TableType';
import { getLeagueInfoThunk } from './leagueInfoThunk';
import { REQUEST_STATUS } from '../../../../../Shared/Constants';
const LeagueInfoTableSlice = createSlice({
  name: 'leagueInfoTableSlice',
  initialState: {
    entities: [],
    entitiesOriginal: [],
    filterState: [] as TFilterState[],
    loading: REQUEST_STATUS.idle
  } as TTableSlice,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLeagueInfoThunk.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(getLeagueInfoThunk.fulfilled, (state, { payload }) => {
        state.entities = payload;
        state.entitiesOriginal = payload;
        state.loading = REQUEST_STATUS.idle;
      });
  }
});
const { reducer, actions } = LeagueInfoTableSlice;

export default reducer;
