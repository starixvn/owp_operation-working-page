import { StateCreator } from 'zustand';
import { TQueryLiveGameAssignment } from '../type/type';
import { REQUEST_STATUS } from '../../Shared/Constants';

const createTableSlice: StateCreator<
  TQueryLiveGameAssignment,
  [],
  [],
  TQueryLiveGameAssignment
> = (set, get) => ({
  loadingDataTable: REQUEST_STATUS.pending,
  dataTable: [],
  queryDataTable: async () => {
    set({ loadingDataTable: REQUEST_STATUS.pending });
    // TODO
    set({
      dataTable: [],
      loadingDataTable: REQUEST_STATUS.idle
    });
  },
});

export default createTableSlice;
