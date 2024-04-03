import { createSlice } from '@reduxjs/toolkit';
import { getEvents } from './tableThunk';

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {

  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getEvents.pending, state => {

      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {

      })
      .addCase(getEvents.rejected, state => {

      });
  }
});

const { actions, reducer } = tableSlice;
const {

} = actions;
export {

};
export default reducer;
