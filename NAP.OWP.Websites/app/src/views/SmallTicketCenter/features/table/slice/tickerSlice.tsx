import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import {
  getEventTickets,
 
} from './ticketSliceThunkNative';

import { REQUEST_STATUS } from '../../../../Shared/Constants';
import { TTicket } from '../../../type';

const ticketSlice = createSlice({
  name: 'ticketSlice',
  initialState: {
    entities: [] as TTicket[],
    currentRequestId: '',
    loadTicket: REQUEST_STATUS.idle
  },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getEventTickets.pending, (state, action) => {
        if (isEqual(state.loadTicket, REQUEST_STATUS.idle)) {
          state.currentRequestId = action.meta.requestId;
          state.loadTicket = REQUEST_STATUS.pending;
        }
      })
      .addCase(getEventTickets.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          isEqual(state.loadTicket, REQUEST_STATUS.pending) &&
          isEqual(state.currentRequestId, requestId)
        ) {
          state.entities.length = 0;
          state.loadTicket = REQUEST_STATUS.idle;
          state.currentRequestId = '';
          state.entities =action.payload;
        }
      })
      .addCase(getEventTickets.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          isEqual(state.loadTicket, REQUEST_STATUS.pending) &&
          isEqual(state.currentRequestId, requestId)
        ) {
          state.currentRequestId = '';
          state.loadTicket = REQUEST_STATUS.idle;
        }
      });
  }
});

const { reducer } = ticketSlice;

export default reducer;
