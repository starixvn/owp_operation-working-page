import { createSelector, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../../../Shared/Constants';
import { RootState } from '../../app/storeNative';
import { TCondition, TDataSource } from '../../table/TableType';
import { TOption } from '../EditType';
import { getLeagueGroupOptionsThunk } from './editSettingThunk';
import { mapEditSettingFromDataSource } from '../helper/helper';
import type { PayloadAction } from '@reduxjs/toolkit';
import { forEach } from 'lodash';

interface ConditionPayLoad {
  key: 'type' | 'value';
  property: TAddExpressionKey;
  value: ('Contains' | 'Equals') | (string | number | undefined);
  index: number;
}

type TAddExpressionKey = "ipTv" | "round" | "division";

const EditSettingSlice = createSlice({
  name: 'editSettingSlice',
  initialState: {
    leagueGroupOptions: [] as TOption[],
    loading: REQUEST_STATUS.idle,
    leagueSettingId: 0,
    league: '',
    owpLeagueId: 0,
    leagueGroupId: 0,
    leagueGroup: '',
    spread: '',
    maxbetWD_HDP: '',
    wD_NoOfHDP: '',
    maxbetWK_HDP: '',
    wK_NoOfHDP: '',
    lstNote: '',
    remark2: '',
    comment: '',
    hasTv: false,
    hasIpTv: false,
    remark: '',
    ipTv: [] as Array<TCondition>,
    round: [] as Array<TCondition>,
    division: [] as Array<TCondition>,
  },
  reducers: {
    setInitSetting: (state, action: PayloadAction<TDataSource>) => {
      const { ipTv,
        leagueSettingId,
        league,
        owpLeagueId,
        leagueGroupId,
        leagueGroup,
        spread,
        maxbetWD_HDP,
        wD_NoOfHDP,
        maxbetWK_HDP,
        wK_NoOfHDP,
        lstNote,
        remark2,
        comment,
        hasTv,
        hasIpTv,
        remark,
        round,
        division } = mapEditSettingFromDataSource(action.payload);
      state.ipTv = ipTv;
      state.leagueSettingId = leagueSettingId;
      state.league = league;
      state.owpLeagueId = owpLeagueId;
      state.leagueGroupId = leagueGroupId;
      state.leagueGroup = leagueGroup;
      state.spread = spread;
      state.maxbetWD_HDP = maxbetWD_HDP;
      state.wD_NoOfHDP = wD_NoOfHDP;
      state.maxbetWK_HDP = maxbetWK_HDP;
      state.wK_NoOfHDP = wK_NoOfHDP;
      state.lstNote = lstNote;
      state.remark2 = remark2;
      state.comment = comment;
      state.hasTv = hasTv;
      state.hasIpTv = hasIpTv;
      state.remark = remark;
      state.round = round;
      state.division = division;
    },
    updateObject: (state, action: PayloadAction<{ property: string; value: string | number | boolean }>) => {
      const { property, value } = action.payload;
      state[property] = value;
    },
    addRowExpressions: (state, action: { payload: TAddExpressionKey }) => {
      state[action.payload].push({ type: "Contains", value: '' });
    },
    removeRowExpressions: (state, action: { payload: { index: number, property: TAddExpressionKey } }) => {
      const { property } = action.payload;

      state[property] = state[property].filter((_, index) => index !== action.payload.index);
    },
    updateExpression: (state, action: PayloadAction<ConditionPayLoad>) => {
      const { key, property, value, index } = action.payload;

      if (key === 'type' && (value === "Contains" || value === "Equals")) {
        state[property][index].type = value;
      }
      if (key === 'value') {
        state[property][index].value = value;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getLeagueGroupOptionsThunk.pending, state => {
        state.loading = REQUEST_STATUS.pending;
      })
      .addCase(getLeagueGroupOptionsThunk.fulfilled, (state, { payload }) => {
        state.leagueGroupOptions = payload;
        state.loading = REQUEST_STATUS.idle;
      });
  }
});

const { reducer, actions } = EditSettingSlice;
const { updateObject, updateExpression, setInitSetting, addRowExpressions, removeRowExpressions } = actions;

export default reducer;
export {
  updateExpression, setInitSetting, updateObject,
  addRowExpressions, removeRowExpressions
};

