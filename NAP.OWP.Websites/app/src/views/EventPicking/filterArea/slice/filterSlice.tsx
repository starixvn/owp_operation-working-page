import { createSlice } from '@reduxjs/toolkit';
import { Option } from '../../../Shared/MultipleSelection/type';
import { TFilter, TPayloadFilter } from '../../types/filterType';
import {
  DATE,
  FILTER_MATCH,
  FILTER_MATCH_CATEGORY,
  FILTER_MATCH_CATEGORY_OPTIONS,
  FILTER_MATCH_OPTIONS,
  HAS_OTHER_PROVIDER,
  HAS_PROVIDER,
  HAS_PROVIDER_OPTIONS,
  LEAGUE,
  SELECT_GAME,
  SELECT_GAME_OPTIONS,
  UPDATE_TYPE
} from '../filterConst.json';
import { getLeagues, getUpdateTypes } from './filterThunkNative';
import Utils from '../../../Shared/Utils';

const filterSlice = createSlice({
  name: 'filter/filterSlice',
  initialState: {
    leagues: [] as Option[],
    updateTypes: [] as Option[],
    param: {
      [DATE]: Utils.formatDate(new Date()),
      [FILTER_MATCH]: FILTER_MATCH_OPTIONS.map(m => m.value),
      [SELECT_GAME]: SELECT_GAME_OPTIONS.map(m => m.value),
      [HAS_PROVIDER]: HAS_PROVIDER_OPTIONS.map(m => m.value),
      [HAS_OTHER_PROVIDER]: HAS_PROVIDER_OPTIONS.map(m => m.value),
      [FILTER_MATCH_CATEGORY]: FILTER_MATCH_CATEGORY_OPTIONS.map(m => m.value),
      [LEAGUE]: [],
      [UPDATE_TYPE]: []
    } as TFilter
  },
  reducers: {
    setFilter: (state, action: { payload: TPayloadFilter }) => {
      const { key, value } = action.payload;
      state.param[key] = value;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getLeagues.fulfilled, (state, { payload }) => {
        state.leagues = payload;
        state.param[LEAGUE] = payload.map(m => m.value);
      })
      .addCase(getUpdateTypes.fulfilled, (state, { payload }) => {
        const noneOption = { value: null, label: '-- None --' } as Option;
        state.updateTypes = payload.concat(noneOption);
        state.param[UPDATE_TYPE] = state.updateTypes.map(m => m.value);
      });
  }
});

const { reducer, actions } = filterSlice;
const { setFilter } = actions;
export { setFilter };
export default reducer;
