import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import { formatTime, getMMDDYYYYStringFromDateTime } from '../../../Shared/DateTime/dateTimeHelper';
import { MATCH_OFFER } from '../../const/const';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterDate: getMMDDYYYYStringFromDateTime(new Date()),
    employer: undefined,
    loading: REQUEST_STATUS.idle,
    currentRequestId: undefined,
    error: null,
    backupFilterModel: null,
    matchOffers: [...MATCH_OFFER.map(m => m.value)]
  },
  reducers: {
    updateFilterDate: {
      reducer: (state, action) => {
        const { selectedDate } = action.payload;
        state.filterDate = selectedDate;
      },
      prepare: selectedDate => {
        return {
          payload: {
            selectedDate: selectedDate
              ? formatTime(
                selectedDate,
                'minute',
                'LLL'
              )
              : null
          }
        };
      }
    },
    updateFilterMatchOffers: {
      reducer: (state, action) => {
        state.matchOffers = action.payload;
      }
    },
    updateFilterEmployer: {
      reducer: (state, action) => {
        const { employer } = action.payload;
        state.employer = employer;
      }
    }
  }
});

const { actions, reducer } = filterSlice;
const {
  updateFilterDate,
  updateFilterEmployer,
  updateFilterMatchOffers
} = actions;
export {
  actions,
  updateFilterDate,
  updateFilterEmployer,
  updateFilterMatchOffers
};

export default reducer;
