import { createSlice } from '@reduxjs/toolkit';
import { getEvents } from './tableThunk';
import { TDataSource } from '../../type/table';
import { REQUEST_STATUS } from '../../../Shared/Constants';

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    loading: REQUEST_STATUS.idle,
    dataSource: {
      matchNo: '',
      matchStatus: '',
      koTime: '',
      league: '',
      event: '',
      hasTicket: false,
      isRead: false,
      agentConfirm: [],
      runner: '',
      otherProvider: '',
      agent: '',
      mb: '',
      remark: '',
      remarkBy: '',
      estNote: ''

    } as TDataSource
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getEvents.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        state.loading = REQUEST_STATUS.idle;
        state.dataSource = payload;
      })
      .addCase(getEvents.rejected, state => {
        state.loading = REQUEST_STATUS.idle;
      });
  }
});

const { actions, reducer } = tableSlice;
const {

} = actions;
export {

};
export default reducer;
