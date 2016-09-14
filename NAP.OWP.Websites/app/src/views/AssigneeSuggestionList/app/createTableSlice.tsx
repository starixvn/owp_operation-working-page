import { StateCreator } from 'zustand';
import {
  TAssigneeSuggestion,
  TQueryWorkScheduleInfo,
  UserWorkingSchedule,
  TMatchInfo
} from '../features/TypeNative';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { buildRequestURL } from '../utils';
import axios from 'axios';

const crateTableSlice: StateCreator<
  TQueryWorkScheduleInfo,
  [],
  [],
  TQueryWorkScheduleInfo
> = set => ({
  loadingDataTable: REQUEST_STATUS.pending,
  workScheduleInfo: {
    matchInfo: {} as TMatchInfo,
    workingSchedules: [] as UserWorkingSchedule
  } as TAssigneeSuggestion,
  queryDataTable: async ({ matchId, betTypeId, filterDate }) => {
    set({ loadingDataTable: REQUEST_STATUS.pending });
    const url = buildRequestURL('get-trader-suggestion');
    const response = await axios.get(url, {
      params: {
        owpMatchId: matchId,
        betTypeId: betTypeId,
        filterDate: filterDate
      }
    });
    set({
      workScheduleInfo: response.data,
      loadingDataTable: REQUEST_STATUS.idle
    });
  }
});

export default crateTableSlice;
