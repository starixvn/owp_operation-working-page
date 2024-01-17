import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import { getEventPickings } from './eventSliceThunkNative';
import updateNoOfferMatchThunk from '../updateNoOfferMatchThunkNative';
import updateConfirmedThunk from '../updateConfirmedThunkNative';
import {
  updateNoOfferMatch,
  updateConfirmedMatch
} from '../../helper/reducerHelper';
import {
  TTableSlice,
  TFilterState,
  FilterAllColumn,
  ISortState
} from '../../types/dataTableType';
import {
  addOrReplaceFilterState,
  filterDataTable,
  pushOrUpdateObject
} from '../../../Shared/Utils';
import filterByKeyword from '../filterByKeyword';
import { isEqual } from 'lodash';
import {
  sortDataAsc,
  sortDataDesc,
  sortData
} from '../EventPickingTableHelper';
import { ORDER_ASC, ORDER_DESC } from '../TableSchema.json';

const EventPickingTableSlice = createSlice({
  name: 'EventPickingTableSlice',
  initialState: {
    entities: [],
    entitiesOriginal: [],
    isNoOfferAll: false,
    isConfirmAll: false,
    valueFilterAllColumn: {} as FilterAllColumn,
    columnKeyFilterCurrent: '',
    filterState: [] as TFilterState[],
    loading: REQUEST_STATUS.idle,
    sortState: {
      columnKeySelected: '',
      orderType: ''
    } as ISortState
  } as TTableSlice,
  reducers: {
    setColumnKeyValue: (state, action) => {
      state.columnKeyFilterCurrent = action.payload;
    },
    setValueFilter: (state, action) => {
      const { valueFilterAllColumn } = state;
      state.valueFilterAllColumn = pushOrUpdateObject(
        valueFilterAllColumn,
        action.payload
      );
    },
    filterBySearchKey: (state, action) => {
      const { filterState, sortState } = state;
      const { orderType, columnKeySelected } = sortState;
      state.filterState = addOrReplaceFilterState(filterState, action.payload);
      state.entities = filterDataTable(
        state.entitiesOriginal,
        state.filterState,
        filterByKeyword
      );
      state.entities = sortData(orderType, state.entities, columnKeySelected);
      if (state.entities.length) {
        state.isConfirmAll = state.entities.every(x => x.isCheck);
        state.isNoOfferAll = state.entities.every(x => x.isNoOffer);
      }
    },
    clearFilter: state => {
      const { entitiesOriginal, sortState } = state;
      const { orderType, columnKeySelected } = sortState;
      state.filterState = [];
      state.valueFilterAllColumn = {};
      state.entities = sortData(orderType, entitiesOriginal, columnKeySelected);
      if (state.entities.length) {
        state.isConfirmAll = state.entities.every(x => x.isCheck);
        state.isNoOfferAll = state.entities.every(x => x.isNoOffer);
      }
    },
    sortFunc: (state, action) => {
      state.sortState = action.payload;
      const { orderType, columnKeySelected } = action.payload;
      state.entities = sortData(orderType, state.entities, columnKeySelected);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateNoOfferMatchThunk.fulfilled, (state, { payload }) => {
        const noOfferMatch = payload;
        updateNoOfferMatch(state.entitiesOriginal, noOfferMatch);
        updateNoOfferMatch(state.entities, noOfferMatch);
        if (state.entities.length) {
          state.isNoOfferAll = state.entities.every(x => x.isNoOffer);
        }
      })
      .addCase(updateConfirmedThunk.fulfilled, (state, { payload }) => {
        const confirmInfo = payload;
        updateConfirmedMatch(state.entitiesOriginal, confirmInfo);
        updateConfirmedMatch(state.entities, confirmInfo);
        if (state.entities.length) {
          state.isConfirmAll = state.entities.every(x => x.isCheck);
        }
      })
      .addCase(getEventPickings.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(getEventPickings.fulfilled, (state, { payload }) => {
        state.loading = REQUEST_STATUS.idle;
        state.entitiesOriginal = payload;
        state.entities = filterDataTable(
          state.entitiesOriginal,
          state.filterState,
          filterByKeyword
        );
        const { orderType, columnKeySelected } = state.sortState;
        state.entities = sortData(orderType, state.entities, columnKeySelected);
        if (state.entities.length) {
          state.isConfirmAll = state.entities.every(x => x.isCheck);
          state.isNoOfferAll = state.entities.every(x => x.isNoOffer);
        }
      })
      .addCase(getEventPickings.rejected, state => {
        state.loading = REQUEST_STATUS.idle;
      });
  }
});
const { reducer, actions } = EventPickingTableSlice;
const {
  filterBySearchKey,
  clearFilter,
  setColumnKeyValue,
  setValueFilter,
  sortFunc
} = actions;
export {
  filterBySearchKey,
  clearFilter,
  setColumnKeyValue,
  setValueFilter,
  sortFunc
};
export default reducer;
