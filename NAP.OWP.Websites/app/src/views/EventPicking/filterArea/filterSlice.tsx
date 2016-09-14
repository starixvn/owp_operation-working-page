import { createSlice } from "@reduxjs/toolkit";
import { TFilter, TPayloadFilter } from "../types/filterType";
import {
  DATE, FILTER_MATCH, SELECT_GAME,
  FILTER_MATCH_OPTIONS, SELECT_GAME_OPTIONS,
  HAS_PROVIDER_OPTIONS, HAS_PROVIDER,
  HAS_OTHER_PROVIDER
} from './filterConst.json';

const filterSlice = createSlice({
  name: 'filter/filterSlice',
  initialState: {
    [DATE]: new Date(),
    [FILTER_MATCH]: FILTER_MATCH_OPTIONS.map(m => m.value),
    [SELECT_GAME]: SELECT_GAME_OPTIONS.map(m => m.value),
    [HAS_PROVIDER]: HAS_PROVIDER_OPTIONS.map(m => m.value),
    [HAS_OTHER_PROVIDER]: HAS_PROVIDER_OPTIONS.map(m => m.value)
  } as TFilter,
  reducers: {
    setFilter: (state, action: { payload: TPayloadFilter }) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

const { reducer, actions } = filterSlice;
const { setFilter } = actions;
export { setFilter };
export default reducer;
