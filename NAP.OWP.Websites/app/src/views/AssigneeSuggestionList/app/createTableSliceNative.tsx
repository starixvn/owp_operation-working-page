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
import { SearchAssigneeByKeyword } from '../features/helper/AssigneeSuggestionHelper';

const crateTableSlice: StateCreator<
  TQueryWorkScheduleInfo,
  [],
  [],
  TQueryWorkScheduleInfo
> = (set, get) => ({
  loadingDataTable: REQUEST_STATUS.pending,
  searchText: '',
  workScheduleInfoOrigin: {
    matchInfo: {} as TMatchInfo,
    fullyAvailable: [] as UserWorkingSchedule[],
    partiallyAvailable: [] as UserWorkingSchedule[],
    busy: [] as UserWorkingSchedule[]
  } as TAssigneeSuggestion,
  workScheduleInfo: {
    matchInfo: {} as TMatchInfo,
    fullyAvailable: [] as UserWorkingSchedule[],
    partiallyAvailable: [] as UserWorkingSchedule[],
    busy: [] as UserWorkingSchedule[]
  } as TAssigneeSuggestion,
  queryDataTable: async ({ matchId, betTypeId, filterDate, otherTime }) => {
    set({ loadingDataTable: REQUEST_STATUS.pending });
    const url = buildRequestURL('get-trader-suggestion');
    const response = await axios.get(url, {
      params: {
        owpMatchId: matchId,
        betTypeId,
        filterDate,
        otherTime
      }
    });
    set({
      workScheduleInfo: response.data,
      workScheduleInfoOrigin: response.data,
      loadingDataTable: REQUEST_STATUS.idle
    });
  },
  searchDataTable: keyword => {
    const { workScheduleInfoOrigin } = get();
    set({
      searchText: keyword,
      workScheduleInfo: SearchAssigneeByKeyword(workScheduleInfoOrigin, keyword)
    });
  }
});

export default crateTableSlice;
