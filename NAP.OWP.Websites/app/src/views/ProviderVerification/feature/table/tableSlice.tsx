import { createSlice } from '@reduxjs/toolkit';
import { getEvents } from './tableThunk';
import { TDataSource, TUpdateRow } from '../../type/table';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import type { PayloadAction } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    loading: REQUEST_STATUS.idle,
    dataSource: [] as TDataSource[]
  },
  reducers: {
    setValue: (state, action: PayloadAction<TUpdateRow>) => {
      const { rowIndex, key, value } = action.payload;
      state.dataSource[rowIndex][key] = value;
    }
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
  setValue
} = actions;
export {
  setValue
};
export default reducer;
