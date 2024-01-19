import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../Shared/Constants';
import {
  TColumnFilter,
  TQueryLiveGameAssignment,
  TUpdateAssignment
} from '../type/type';
import queryDataTableThunk from './queryDataTableThunk';
import { isEqual } from 'lodash';
import { handleFilterByColumn, updateColumnFilter } from './columnFilter';

const eventAssignmentTableSlice = createSlice({
  name: 'eventAssignmentTableSlice',
  initialState: {
    dateUpdated: '',
    syncOffVRLastTime: '',
    syncOffVRByUser: '',
    filterState: [],
    entitiesOriginal: [],
    entities: [],
    loading: REQUEST_STATUS.idle
  } as TQueryLiveGameAssignment,
  reducers: {
    onUpdatedAssignment: (state, action: PayloadAction<TUpdateAssignment>) => {
      const { assignment, bettypeName, rowIndex } = action.payload;
      if (assignment && bettypeName) {
        let assignments = state.entities[rowIndex][bettypeName];
        if (assignments) {
          const index = assignments.findIndex(
            el =>
              isEqual(el.assignmentId, assignment.AssignmentId) &&
              isEqual(el.oWPMatchId, assignment.OWPMatchId)
          );
          if (index === -1) {
            assignments.push(assignment);
          } else {
            assignments[index] = assignment;
          }

          assignments = assignments.filter(
            a => a.assignmentId === 0 || a.assignmentId === null
          );
        }
      }
    },
    onDeletedAssignment: (state, action: PayloadAction<TUpdateAssignment>) => {
      const { assignment, bettypeName, rowIndex } = action.payload;
      if (assignment && bettypeName) {
        const event = state.entities[rowIndex];
        if (assignment.AssignmentType === 1) {
          event[bettypeName] = [];
        } else {
          let assignments = event[bettypeName];
          assignments = assignments.filter(a => a.assignmentId);
          event[bettypeName] = assignments;
        }
      }
    },
    onColumnFilter: (state, action: PayloadAction<TColumnFilter>) => {
      updateColumnFilter(state.filterState, action.payload);
      state.entities =
        handleFilterByColumn(state.entitiesOriginal, state.filterState) || [];
    },
    onClearFilter: state => {
      state.filterState = [];
      /*state.entities = state.entitiesOriginal; */
    }
  },
  extraReducers: builder => {
    builder
      .addCase(queryDataTableThunk.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(queryDataTableThunk.fulfilled, (state, { payload }) => {
        state.loading = REQUEST_STATUS.idle;
        state.entities = payload.data;
        state.entitiesOriginal = payload.data;
        state.syncOffVRLastTime = payload.syncOffVRLastUpdated.item1;
        state.syncOffVRByUser = payload.syncOffVRLastUpdated.item2;
      })
      .addCase(queryDataTableThunk.rejected, state => {
        state.loading = REQUEST_STATUS.idle;
      });
  }
});
const { reducer, actions } = eventAssignmentTableSlice;
const {
  onDeletedAssignment,
  onUpdatedAssignment,
  onColumnFilter,
  onClearFilter
} = actions;

export {
  onDeletedAssignment,
  onUpdatedAssignment,
  onColumnFilter,
  onClearFilter
};
export default reducer;
