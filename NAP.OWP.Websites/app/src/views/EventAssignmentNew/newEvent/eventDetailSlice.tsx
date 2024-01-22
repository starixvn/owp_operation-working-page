import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TDataSource } from '../type/type';

const eventDetailSlice = createSlice({
  name: 'eventDetailSlice',
  initialState: {
    event: {} as TDataSource,
  },
  reducers: {
    setEventDetailInfo: (state, action: PayloadAction<TDataSource>) => {
      debugger
      state.event = action.payload;
    }
  }
});
const { reducer, actions } = eventDetailSlice;
const { setEventDetailInfo } = actions;
export { setEventDetailInfo };
export default reducer;
