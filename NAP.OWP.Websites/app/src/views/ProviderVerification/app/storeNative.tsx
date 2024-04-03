import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../feature/table/tableSlice';

const store = configureStore({
  reducer: {
    events: eventReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
