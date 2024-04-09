import { createSlice } from '@reduxjs/toolkit';
import { getAgentConfirm, getEvents } from './tableThunk';
import { TDataSource, TMultipleFilter, TUpdateAgentConfirm, TUpdateRow } from '../../type/table';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../../../Shared/MultipleSelection/type';
import { buildIsReadValue } from '../../../Shared/ticketEvent/helper/ticketHelper';

const buildMultipleFilterDefault = () => ({
  isFilter: false,
  selected: [],
  options: []
});

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    loadingDataTable: REQUEST_STATUS.pending,
    loadingAgentConfirmOption: REQUEST_STATUS.pending,
    dataSource: [] as TDataSource[],
    dataSourceOriginal: [] as TDataSource[],
    agentConfirmOption: [] as Option[],
    multipleFilter: {
      matchNo: buildMultipleFilterDefault(),
      matchStatus: buildMultipleFilterDefault(),
      koTime: buildMultipleFilterDefault(),
      league: buildMultipleFilterDefault(),
      match: buildMultipleFilterDefault(),
      mb: buildMultipleFilterDefault(),
      runner: buildMultipleFilterDefault(),
      otherProvider: buildMultipleFilterDefault(),
      agent: buildMultipleFilterDefault(),
      remark: buildMultipleFilterDefault(),
      remarkBy: buildMultipleFilterDefault(),
      agentConfirm: buildMultipleFilterDefault(),
      estNote: buildMultipleFilterDefault()
    } as TMultipleFilter
  },
  reducers: {
    setValue: (state, action: PayloadAction<TUpdateRow>) => {
      const { rowIndex, key, value } = action.payload;
      state.dataSource[rowIndex][key] = value;
    },
    setDataSignalR: (state, action) => {
      const { actorId, parentMatchId, userId } = action.payload;
      state.dataSource.forEach((item: TDataSource) => {
        if (item === parentMatchId) {
          item.IsRead = buildIsReadValue(actorId, userId, item.IsRead);
          item.HasTicket = true;
        }
      });
    },
    setAgentConfirm: (state, action: PayloadAction<TUpdateAgentConfirm>) => {
      const { rowIndex, value } = action.payload;
      state.dataSource[rowIndex].AgentConfirm = value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getEvents.pending, state => {
        state.loadingDataTable = REQUEST_STATUS.pending;
      })
      .addCase(
        getEvents.fulfilled,
        (state, action: PayloadAction<TDataSource[]>) => {
          state.loadingDataTable = REQUEST_STATUS.idle;
          state.dataSource = action.payload;
          state.dataSourceOriginal = action.payload;
        }
      )
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
const { setValue, setDataSignalR, setAgentConfirm } = actions;
export {
  setValue, setDataSignalR,
  setAgentConfirm
};
export default reducer;
