import { createSlice } from '@reduxjs/toolkit';
import { getLeagueGroupOptionsThunk } from './editSettingThunk';
import { REQUEST_STATUS } from '../../../../../Shared/Constants';
import { TOption } from '../EditType';

const EditSettingSlice = createSlice({
  name: 'editSettingSlice',
  initialState: {
    leagueGroupOptions: [] as TOption[],
    loading: REQUEST_STATUS.idle
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLeagueGroupOptionsThunk.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(getLeagueGroupOptionsThunk.fulfilled, (state, { payload }) => {
        state.leagueGroupOptions = payload;
        state.loading = REQUEST_STATUS.idle;
      });
  }
});
const { reducer } = EditSettingSlice;

export default reducer;
