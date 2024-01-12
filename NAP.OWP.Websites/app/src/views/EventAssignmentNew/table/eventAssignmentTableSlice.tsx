import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TQueryLiveGameAssignment } from '../type/type';
import queryDataTableThunk from './queryDataTableThunk';

const eventAssignmentTableSlice = createSlice({
  name: 'eventAssignmentTableSlice',
  initialState: {
    entities: [],
    loading: REQUEST_STATUS.idle
  } as TQueryLiveGameAssignment,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(queryDataTableThunk.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(queryDataTableThunk.fulfilled, (state, { payload }) => {
        state.loading = REQUEST_STATUS.idle;
        state.entities = payload;
      })
      .addCase(queryDataTableThunk.rejected, state => {
        state.loading = REQUEST_STATUS.idle;
      });
  }
});
const { reducer } = eventAssignmentTableSlice;

export default reducer;
