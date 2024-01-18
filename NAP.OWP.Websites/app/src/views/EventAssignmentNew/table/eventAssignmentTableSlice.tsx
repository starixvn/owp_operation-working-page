import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TQueryLiveGameAssignment, TUpdateAssignment } from '../type/type';
import queryDataTableThunk from './queryDataTableThunk';
import { isEqual } from 'lodash';

const eventAssignmentTableSlice = createSlice({
  name: 'eventAssignmentTableSlice',
  initialState: {
    filterState: [],
    entities: [],
    loading: REQUEST_STATUS.idle
  } as TQueryLiveGameAssignment,
  reducers: {
    saveAssignment: (state, action: PayloadAction<TUpdateAssignment>) => {
      const { assignment, bettypeName, rowIndex } = action.payload;
      if (assignment && bettypeName) {
        let assignments = state.entities[rowIndex][bettypeName];
        if (assignments) {
          const index = assignments.findIndex(
            el =>
              isEqual(el.assignmentId, assignment.assignmentId) &&
              isEqual(el.oWPMatchId, assignment.oWPMatchId)
          );
          if (index === -1) {
            assignments.push(assignment);
          } else {
            assignments[index] = assignment;
          }

          assignments = assignments.filter(a => a.assignmentId === 0 || a.assignmentId === null);
        }
      }
    },
    onDeletedAssignment: (state, action: PayloadAction<TUpdateAssignment>) => {
      const { assignment, bettypeName, rowIndex } = action.payload;
      if (assignment && bettypeName) {
        const event = state.entities[rowIndex];
        if (assignment.assignmentType === 1) {
          event[bettypeName] = [];
        } else {
          let assignments = event[bettypeName];
          assignments = assignments.filter(a => a.assignmentId);
          event[bettypeName] = assignments;
        }
      }
    }
  },
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
