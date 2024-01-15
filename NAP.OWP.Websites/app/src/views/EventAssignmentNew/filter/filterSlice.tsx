import { createSlice } from '@reduxjs/toolkit';
import { TFilter, TFilterQueryOptions, TOptions } from '../type/type';
import update from 'immutability-helper';
import { REQUEST_STATUS } from '../../Shared/Constants';
import queryFilterOptionsThunk from './queryFilterOptionsThunk';
import { buildDefaultFilterDate } from '../../Shared/DateTime/dateTimeHelper';
import Utils from '../../Shared/Utils';

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: {
    filterState: {
      selectedDate: buildDefaultFilterDate(),
      userNameFilter: '',
      userNameFilterIsValid: true,
      selectedMatchStatus: [] as TOptions[]
    } as TFilter,
    loading: REQUEST_STATUS.pending,
    filterOptions: {} as TFilterQueryOptions
  },
  reducers: {
    updateFilterState: (state, action) => {
      const { filterState } = state;
      const { key, value } = action.payload;
      const newFilter = update(filterState, {
        [key]: {
          $set: value
        }
      });
      state.filterState = newFilter;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(queryFilterOptionsThunk.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(queryFilterOptionsThunk.fulfilled, (state, { payload }) => {
        state.loading = REQUEST_STATUS.idle;
        state.filterOptions = payload;
        const matchStatusOptions = Utils.buildMatchStatusOption(
          payload.MatchStatus
        );
        state.filterState.selectedMatchStatus =
          Utils.buildSelectedMatchStatus(matchStatusOptions);
      })
      .addCase(queryFilterOptionsThunk.rejected, state => {
        state.loading = REQUEST_STATUS.pending;
      });
  }
});
const { reducer, actions } = filterSlice;
const { updateFilterState } = actions;
export { updateFilterState };
export default reducer;
