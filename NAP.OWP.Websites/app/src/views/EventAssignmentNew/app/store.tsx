import { configureStore } from '@reduxjs/toolkit';
import eventAssignmentTableSlice from '../table/eventAssignmentTableSlice';
import policySlice from '../policy/policySlice';
import filterSlice from '../filter/filterSlice';
import ticketListSlice from '../../Shared/ticketEvent/component/ticketListSlice';
import createMultiplePolicySlice from '../../Shared/permission/multiplePolicySlice';
import chatBoardNew from '../../Shared/chatBoardNew/chatBoardSlice';
import createTicketBoardReducer from '../../Shared/createTicketNew/createTicketBoardSliceNew';
const store = configureStore({
  reducer: {
    eventAssignmentTable: eventAssignmentTableSlice,
    policy: policySlice,
    pagePolicy: createMultiplePolicySlice('pagePolicy'),
    filter: filterSlice,
    ticketList: ticketListSlice,
    chatBoard: chatBoardNew,
    createTicketBoard: createTicketBoardReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
