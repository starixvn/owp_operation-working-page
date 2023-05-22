import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import { ORDER_ASC, ORDER_DESC, KOTime } from '../TableSchema.json';
import {
  FilterState,
  ISortState,
  MatchInfo,
  PopupState,
  RefreshModel
} from '../../type/TableType';
import { filterData, sortDataAsc, sortDataDesc } from '../LiveGameListTableHelper';
import { getEvents } from './tableThunk';
import { buildIsReadValue } from '../../../Shared/ticketEvent/helper/ticketHelper';
import { addOrReplaceFilterState } from '../../../Shared/Utils';
import { isEqual } from 'lodash';

const tableSlice = createSlice({
  name: 'EventInformation',
  initialState: {
    loading: REQUEST_STATUS.idle,
    isShowUnReadTicketOnly: false,
    entitiesOriginal: [] as MatchInfo[],
    entities: [] as MatchInfo[],
    userId: 0 as number,
    popupState: {
      matchId: undefined,
      isOpen: false
    } as PopupState,
    filterState: [] as FilterState[],
    sortState: {
      columnKey: KOTime.columnKey,
      orderType: ''
    } as ISortState,
    refreshModel: {} as RefreshModel
  },
  reducers: {
    filterByUnReadTicket: (state, action) => {
      const { entitiesOriginal, filterState } = state;
      state.isShowUnReadTicketOnly = action.payload;
      state.entities = filterData(entitiesOriginal)(
        state.isShowUnReadTicketOnly
      )(filterState);
      const { orderType } = state.sortState;
      if (isEqual(orderType, ORDER_ASC)) {
        state.entities = sortDataAsc(state.entities);
      }
      if (isEqual(orderType, ORDER_DESC)) {
        state.entities = sortDataDesc(state.entities);
      }
    },
    filterBySearchKey: (state, action) => {
      const { entitiesOriginal, filterState, isShowUnReadTicketOnly } = state;
      state.filterState = addOrReplaceFilterState(filterState, action.payload);
      state.entities = filterData(entitiesOriginal)(isShowUnReadTicketOnly)(
        state.filterState
      );
      const { orderType } = state.sortState;
      if (isEqual(orderType, ORDER_ASC)) {
        state.entities = sortDataAsc(state.entities);
      }
      if (isEqual(orderType, ORDER_DESC)) {
        state.entities = sortDataDesc(state.entities);
      }
    },
    clearFilter: state => {
      const { entitiesOriginal } = state;
      state.filterState = [];
      state.entities = entitiesOriginal;
      const { orderType } = state.sortState;
      if (isEqual(orderType, ORDER_ASC)) {
        state.entities = sortDataAsc(state.entities);
      }
      if (isEqual(orderType, ORDER_DESC)) {
        state.entities = sortDataDesc(state.entities);
      }
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setDataTable: (state, action) => {
      state.entities = action.payload;
    },
    setDataSignalR: (state, action) => {
      const { actorId, owpMatchId } = action.payload;
      state.entities.forEach(item => {
        if (item.OWPMatchId === owpMatchId) {
          item.IsRead = buildIsReadValue(actorId, state.userId, item.IsRead);
          item.HasTicket = true;
        }
      });
    },
    openPopupDetail: (state, action) => {
      state.popupState = {
        matchId: action.payload,
        isOpen: true
      };
    },
    closePopupDetail: state => {
      state.popupState = {
        matchId: undefined,
        isOpen: false
      };
    },
    setRefreshModel: (state, action) => {
      state.refreshModel = action.payload;
    },
    sortFunc: (state, action) => {
      state.sortState = action.payload;
      const { orderType } = action.payload;
      if (isEqual(orderType, ORDER_ASC)) {
        state.entities = sortDataAsc(state.entities);
      }
      if (isEqual(orderType, ORDER_DESC)) {
        state.entities = sortDataDesc(state.entities);
      }
    }
  },

  extraReducers: builder => {
    builder.addCase(getEvents.pending, state => {
      state.loading = REQUEST_STATUS.pending;
    }).addCase(getEvents.fulfilled, (state, { payload }) => {
      state.loading = REQUEST_STATUS.idle;
      const { filterState, isShowUnReadTicketOnly } = state;
      state.entitiesOriginal = payload;
      state.entities = filterData(payload)(isShowUnReadTicketOnly)(filterState);
      const { orderType } = state.sortState;
      if (isEqual(orderType, ORDER_ASC)) {
        state.entities = sortDataAsc(state.entities);
      }
      if (isEqual(orderType, ORDER_DESC)) {
        state.entities = sortDataDesc(state.entities);
      }
    }).addCase(getEvents.rejected, state => {
      state.loading = REQUEST_STATUS.idle;
    });
  }
});

const { actions, reducer } = tableSlice;
const {
  filterBySearchKey,
  clearFilter,
  setDataTable,
  setDataSignalR,
  setUserId,
  filterByUnReadTicket,
  openPopupDetail,
  setRefreshModel,
  closePopupDetail,
  sortFunc
} = actions;
export {
  filterBySearchKey,
  clearFilter,
  setDataTable,
  setDataSignalR,
  setUserId,
  filterByUnReadTicket,
  openPopupDetail,
  setRefreshModel,
  closePopupDetail,
  sortFunc
};
export default reducer;
