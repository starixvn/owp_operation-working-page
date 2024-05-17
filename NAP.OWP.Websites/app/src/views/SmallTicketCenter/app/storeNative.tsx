import { configureStore } from '@reduxjs/toolkit';
import createTicketBoardReducer from '../../Shared/createTicketNew/createTicketBoardSliceNew';
import filterReducer from '../features/header/filter/filterSlice';
import tickerSliceReducer from '../features/table/slice/tickerSlice';
const store = configureStore({
  reducer: {
    createTicketBoard: createTicketBoardReducer,
    tickerSlice: tickerSliceReducer,
    filter: filterReducer,
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
