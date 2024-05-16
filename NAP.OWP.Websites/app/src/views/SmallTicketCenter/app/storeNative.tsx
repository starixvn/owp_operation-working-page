import { configureStore } from '@reduxjs/toolkit';
import createTicketBoardReducer from '../../Shared/createTicketNew/createTicketBoardSliceNew';
import filterReducer from '../features/header/filter/filterSlice';
const store = configureStore({
  reducer: {
    createTicketBoard: createTicketBoardReducer,
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
