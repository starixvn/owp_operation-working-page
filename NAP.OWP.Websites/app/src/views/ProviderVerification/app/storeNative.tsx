import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../feature/table/tableSlice';
import filterReducer from '../feature/filter/FilterSlice';

const store = configureStore({
  reducer: {
    events: eventReducer,
    filterState: filterReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
