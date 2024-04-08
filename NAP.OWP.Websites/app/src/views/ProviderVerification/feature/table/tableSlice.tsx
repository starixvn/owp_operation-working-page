import { createSlice } from '@reduxjs/toolkit';
import { getAgentConfirm, getEvents } from './tableThunk';
import { TDataSource, TUpdateRow } from '../../type/table';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../../../Shared/MultipleSelection/type';

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    loadingDataTable: REQUEST_STATUS.pending,
    loadingAgentConfirmOption: REQUEST_STATUS.pending,
    dataSource: [] as TDataSource[],
    agentConfirmOption: [] as Option[]
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
        state.loadingDataTable = REQUEST_STATUS.pending;
      })
      .addCase(getEvents.fulfilled, (state, action: PayloadAction<TDataSource[]>) => {
        state.loadingDataTable = REQUEST_STATUS.idle;
        state.dataSource = action.payload;
      })
      .addCase(getEvents.rejected, state => {
        state.loadingDataTable = REQUEST_STATUS.idle;
      })
      .addCase(getAgentConfirm.pending, state => {
        state.loadingAgentConfirmOption = REQUEST_STATUS.pending;
      })
      .addCase(getAgentConfirm.fulfilled, (state, { payload }) => {
        state.loadingAgentConfirmOption = REQUEST_STATUS.idle;
        state.agentConfirmOption = payload;
      })
      .addCase(getAgentConfirm.rejected, state => {
        state.loadingAgentConfirmOption = REQUEST_STATUS.idle;
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
