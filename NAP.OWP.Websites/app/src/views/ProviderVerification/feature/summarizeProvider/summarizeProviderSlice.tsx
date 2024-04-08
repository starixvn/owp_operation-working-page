import { createSlice } from '@reduxjs/toolkit';
import { summarize } from './helper';
import { TProviderCount } from '../../type/provider';
import { TDataSource } from '../../type/table';

const sumProviderSlice = createSlice({
  name: 'filter/filterSlice',
  initialState: {
    sumTable: [] as Array<TProviderCount>
  },
  reducers: {
    sumProvider: (
      state,
      action: { payload: { data: TDataSource[] } }
    ) => {
      const { data } = action.payload;
      state.sumTable = summarize(data);
    }
  },
  extraReducers: {}
});

const { reducer, actions } = sumProviderSlice;
const { sumProvider } = actions;
export { sumProvider };
export default reducer;
