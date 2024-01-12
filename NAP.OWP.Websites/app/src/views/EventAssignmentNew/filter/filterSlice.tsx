import { createSlice } from '@reduxjs/toolkit';
import { TFilter } from '../type/type';

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: {
    entities: {
      selectedDate: new Date()
    }
  } as TFilter,
  reducers: {},
  extraReducers: builder => { }
});
const { reducer } = filterSlice;

export default reducer;
