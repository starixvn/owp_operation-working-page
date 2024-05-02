import { configureStore } from '@reduxjs/toolkit';
import LeagueInfoTableSlice from '../table/leagueInfoTableSlice/reducer';
const store = configureStore({
  reducer: {
    leagueInfoTableSlice: LeagueInfoTableSlice
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
