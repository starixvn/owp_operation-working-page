import { configureStore } from '@reduxjs/toolkit';
import eventAssignmentTableSlice from '../table/eventAssignmentTableSlice';
import policySlice from '../policy/policySlice';
import filterSlice from '../filter/filterSlice';

const store = configureStore({
  reducer: {
    eventAssignmentTable: eventAssignmentTableSlice,
    policy: policySlice,
    filter: filterSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
