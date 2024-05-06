import { createSlice } from '@reduxjs/toolkit';
import { getLeagueGroupOptionsThunk } from './editSettingThunk';
import { REQUEST_STATUS } from '../../../../../Shared/Constants';
import { TConditions, TEditSetting, TExpression, TOption } from '../EditType';
import { TCondition } from '../../table/TableType';

interface ConditionPayLoad {
  key: keyof TConditions;
  value: TCondition;
  index: number;
}

const EditSettingSlice = createSlice({
  name: 'editSettingSlice',
  initialState: {
    leagueGroupOptions: [] as TOption[],
    loading: REQUEST_STATUS.idle,
    editModel: {} as TEditSetting
  },
  reducers: {
    updateObject: (state, action: { payload: { key: string; value: TCondition, index: number } }) => {
      const { key, value, index } = action.payload;

      const newArray = [...state.editModel.round];
      newArray[index] = value;
      state.editModel.round = newArray;
    },
    handleUpdateRounds: (state, action: { payload: ConditionPayLoad }) => {
      const { key, value, index } = action.payload;
      const result = state.editModel[key].map((item: TCondition, i) => {
        if (i !== index) {
          return item;
        }
        return {
          ...item,
          [key]: value
        };
      });

      return {
        ...state,
        editModel: {
          ...state.editModel,
          round: result
        }
      };
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
const { updateObject, handleUpdateRounds } = actions;

export default reducer;
export {
  updateObject,
  handleUpdateRounds
};
