/* eslint-disable no-warning-comments */
import { createSlice } from '@reduxjs/toolkit';
import compareValues from '../../../../Shared/Order/compareValues';
import { isEqual } from 'lodash';
import {
  getEventTickets,
  refreshEventTickets,
  pinTicket,
  deleteTicket
} from './eventSliceThunkNative';
import { filterIssueByUnreadMessageValue } from './eventSliceHelper';
import { REQUEST_STATUS } from '../../../../Shared/Constants';

const handlePendingState = state => {
  const { loading } = state;
  if (isEqual(loading, REQUEST_STATUS.idle)) {
    state.loading = REQUEST_STATUS.pending;
  }
};

const handleRejectState = (state, error) => {
  if (isEqual(state.loading, REQUEST_STATUS.pending)) {
    state.loading = REQUEST_STATUS.idle;
    state.error = error;
  }
};

const eventCheckingSlice = createSlice({
  name: 'eventChecking',
  initialState: {
    entities: [],
    entitiesOrigin: [],
    currentRequestId: undefined, // NOSONAR
    loading: REQUEST_STATUS.idle,
    error: null,
    sortState: {},
    isShowUnreadMessOnly: false,
    ticketType: [{ value: 0, label: 'All' }]
  },
  reducers: {
    updateSubTypeByTicketId: {
      reducer: (state, action) => {
        const { ticketId, ticketSubTypeId, ticketSubTypeName } = action.payload;
        state.entitiesOrigin.forEach(x => {
          if (x.ticketId === ticketId) {
            x.ticketSubTypeId = ticketSubTypeId;
            x.ticketSubTypeName = ticketSubTypeName;
          }
        });

        state.entities.forEach(x => {
          if (x.ticketId === ticketId) {
            x.ticketSubTypeId = ticketSubTypeId;
            x.ticketSubTypeName = ticketSubTypeName;
          }
        });
      }
    },
    appendTicketItemIntoDataSource: {
      reducer: (state, action) => {
        state.entities.unshift(action.payload);
        state.entitiesOrigin.unshift(action.payload);
      }
    },
    sort: {
      reducer: (state, action) => {
        const { columnKey, orderType } = action.payload;
        state.sortState = { columnKey, orderType };
        const type = isEqual(orderType, 'ORDER_ASC') ? 'asc' : 'desc';
        const pinnedEntities = state.entities.filter(x => x.isPinned);
        const unpinEntities = state.entities.filter(x => !x.isPinned);
        unpinEntities.sort(compareValues(columnKey, type));
        state.entities = pinnedEntities.concat(unpinEntities);
      }
    },
    showUnreadMessageOnly: {
      reducer: (state, action) => {
        state.isShowUnreadMessOnly = action.payload;
        state.entities = filterIssueByUnreadMessageValue(state);
      }
    },
    updatedIsReadOneRow: {
      reducer: (state, action) => {
        const rowIndex = action.payload;
        state.entities[rowIndex].isRead = true;
        state.entitiesOrigin[rowIndex].isRead = true;
      }
    },
    updatedIsReadAllRows: {
      reducer: state => {
        state.entitiesOrigin.forEach(x => {
          x.isRead = true;
        });
        state.entities = filterIssueByUnreadMessageValue(state);
      }
    },
    setTicketStatus: (state, { payload: data }) => {
      const { ticketId, newStatus } = data;
      const ticket = state.entities.find(e => e.ticketId === ticketId);
      ticket.ticketStatus = newStatus;
      const ticketOrigin = state.entitiesOrigin.find(
        e => e.ticketId === ticketId
      );
      ticketOrigin.ticketStatus = newStatus;
    },
    setNewMessage: (state, action) => {
      const {
        ticketId,
        createdDate,
        fileId,
        isFile,
        message,
        messageId,
        userId,
        username
      } = action.payload;
      const newMsg = {
        ticketId,
        createdDate,
        fileId,
        isFile,
        message,
        messageId,
        userId,
        username
      };

      const ticketTarget = state.entities.find(e => e.ticketId);
      ticketTarget.isRead = false;
      ticketTarget.messages.unshift(newMsg);
      ticketTarget.messages.pop();
      const ticketOrigin = state.entitiesOrigin.find(e => e.ticketId);
      ticketOrigin.isRead = false;
      ticketOrigin.messages.unshift(newMsg);
      ticketOrigin.messages.pop();
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getEventTickets.pending, (state, action) => {
        const { loading } = state;
        if (isEqual(loading, REQUEST_STATUS.idle)) {
          state.currentRequestId = action.meta.requestId;
          state.loading = REQUEST_STATUS.pending;
        }
      })
      .addCase(getEventTickets.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          isEqual(state.loading, REQUEST_STATUS.pending) &&
          isEqual(state.currentRequestId, requestId)
        ) {
          state.entities.length = 0;
          state.loading = REQUEST_STATUS.idle;
          state.currentRequestId = null;
          state.entitiesOrigin = [...[], ...action.payload];
          state.entities = filterIssueByUnreadMessageValue(state);
        }
      })
      .addCase(getEventTickets.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          isEqual(state.loading, REQUEST_STATUS.pending) &&
          isEqual(state.currentRequestId, requestId)
        ) {
          state.currentRequestId = null;
          state.loading = REQUEST_STATUS.idle;
          state.error = action.error;
        }
      })
      .addCase(refreshEventTickets.fulfilled, (state, action) => {
        state.entitiesOrigin = [...[], ...action.payload];
        const filteredTickets = filterIssueByUnreadMessageValue(state);
        const pinnedEntities = filteredTickets.filter(x => x.isPinned);
        const unpinEntities = filteredTickets.filter(x => !x.isPinned);
        state.entities = pinnedEntities.concat(unpinEntities);
      })
      .addCase(pinTicket.pending, state => handlePendingState(state))
      .addCase(pinTicket.fulfilled, state => {
        state.loading = REQUEST_STATUS.idle;
      })
      .addCase(pinTicket.rejected, (state, action) =>
        handleRejectState(state, action.error)
      )
      .addCase(deleteTicket.pending, state => handlePendingState(state))
      .addCase(deleteTicket.fulfilled, state => {
        state.loading = REQUEST_STATUS.idle;
      })
      .addCase(deleteTicket.rejected, (state, action) =>
        handleRejectState(state, action.error)
      );
  }
});

const { actions, reducer } = eventCheckingSlice;
const {
  sort,
  updatedIsReadOneRow,
  showUnreadMessageOnly,
  updatedIsReadAllRows,
  setNewMessage,
  setTicketStatus,
  appendTicketItemIntoDataSource,
  updateSubTypeByTicketId
} = actions;
export {
  actions,
  sort,
  updatedIsReadOneRow,
  showUnreadMessageOnly,
  updatedIsReadAllRows,
  setNewMessage,
  setTicketStatus,
  appendTicketItemIntoDataSource,
  updateSubTypeByTicketId
};
export default reducer;
