import { createSelector, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../../../Shared/Constants';
import { RootState } from '../../app/storeNative';
import { TCondition, TDataSource } from '../../table/TableType';
import { TConditions, TEditSetting, TOption } from '../EditType';
import { getLeagueGroupOptionsThunk } from './editSettingThunk';
import { mapEditSettingFromDataSource } from '../helper/helper';

interface ConditionPayLoad {
  key: string;
  property: keyof TConditions;
  value: string | number;
  index: number;
}

const EditSettingSlice = createSlice({
  name: 'editSettingSlice',
  initialState: {
    leagueGroupOptions: [] as TOption[],
    loading: REQUEST_STATUS.idle,
    editModel: {} as TEditSetting,
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
    setInitSetting: (state, action) => {
      const data: TDataSource = action.payload;
      return {
        ...state,
        ...mapEditSettingFromDataSource(data)
      };
    },
    updateObject: (state, action: { payload: { inputKey: string; newValue: string | number | boolean } }) => {
      const { inputKey, newValue } = action.payload;
      return { ...state, [inputKey]: newValue };
    },
    handleUpdateRounds: (state, action: { payload: ConditionPayLoad }) => {
      const { key, property, value, index } = action.payload;
      state[property] = state[property]?.map((item: TCondition, i) => {
        if (i !== index) {
          console.log(item);
          return item;
        }
        return {
          ...item,
          [key]: value
        };
      });
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
const { updateObject, handleUpdateRounds, setInitSetting } = actions;

const selectData = createSelector(
  (state: RootState) => state.editSettingSlice.leagueSettingId,
  (state: RootState) => state.editSettingSlice.league,
  (state: RootState) => state.editSettingSlice.owpLeagueId,
  (state: RootState) => state.editSettingSlice.leagueGroupId,
  (state: RootState) => state.editSettingSlice.leagueGroup,
  (state: RootState) => state.editSettingSlice.spread,
  (state: RootState) => state.editSettingSlice.maxbetWD_HDP,
  (state: RootState) => state.editSettingSlice.wD_NoOfHDP,
  (state: RootState) => state.editSettingSlice.maxbetWK_HDP,
  (state: RootState) => state.editSettingSlice.wK_NoOfHDP,
  (state: RootState) => state.editSettingSlice.lstNote,
  (state: RootState) => state.editSettingSlice.remark2,
  (state: RootState) => state.editSettingSlice.comment,
  (state: RootState) => state.editSettingSlice.hasTv,
  (state: RootState) => state.editSettingSlice.hasIpTv,
  (state: RootState) => state.editSettingSlice.remark,
  (state: RootState) => state.editSettingSlice.ipTv,
  (state: RootState) => state.editSettingSlice.round,
  (state: RootState) => state.editSettingSlice.division,
  (
    leagueSettingId,
    league,
    owpLeagueId,
    leagueGroupId,
    leagueGroup,
    spread,
    maxbetWD_HDP,
    maxbetWD_NoOfHDP,
    maxbetWK_HDP,
    maxbetWK_NoOfHDP,
    lstNote,
    remark2,
    comment,
    hasTv,
    hasIpTv,
    remark,
    ipTv,
    round,
    division,
  ): TEditSetting => ({
    leagueSettingId,
    league,
    owpLeagueId,
    leagueGroupId,
    leagueGroup,
    spread: spread,
    maxbetWD_HDP,
    wD_NoOfHDP: maxbetWD_NoOfHDP,
    maxbetWK_HDP,
    wK_NoOfHDP: maxbetWK_NoOfHDP,
    lstNote,
    remark2,
    comment,
    hasTv,
    hasIpTv,
    remark,
    ipTv,
    round,
    division
  })
);

export default reducer;
export {
  handleUpdateRounds, selectData, setInitSetting, updateObject
};

