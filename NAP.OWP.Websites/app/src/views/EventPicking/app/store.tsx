import { configureStore } from '@reduxjs/toolkit';
import EventPickingTableSlice from '../table/eventPickingTableSlice/reducer';
import filterSlice from '../filterArea/slice/filterSlice';
import createMultiplePolicySlice from '../../Shared/permission/multiplePolicySlice';

const store = configureStore({
  reducer: {
    eventPickingTable: EventPickingTableSlice,
    pagePolicy: createMultiplePolicySlice('pagePolicy'),
    turnOverMarginPolicy: createMultiplePolicySlice('turnOverMarginPolicy'),
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
