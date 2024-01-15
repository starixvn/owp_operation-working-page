import { createSlice } from '@reduxjs/toolkit';
import { TFilter } from '../type/type';
import update from 'immutability-helper';

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: {
    filterState: {
      selectedDate: new Date(),
      userNameFilter: '',
      userNameFilterIsValid: true
    } as TFilter
  },
  reducers: {
    updateFilterState: (state, action) => {
      const { filterState } = state;
      const { key, value } = action.payload;
      const newFilter = update(filterState, {
        [key]: {
          $set: value
        }
      });
      state.filterState = newFilter;
    }
  },
  extraReducers: builder => {}
});
const { reducer, actions } = filterSlice;
const { updateFilterState } = actions;
export { updateFilterState };
export default reducer;
