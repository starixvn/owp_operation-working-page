import { create } from 'zustand';
import update from 'immutability-helper';
import { TAction, TState } from '../feature/type/TableType.native';
import { REQUEST_STATUS } from '../../Shared/Constants';

const useStore = create<TState & TAction>(set => ({
  dataTable: {
    loadingStatus: REQUEST_STATUS.idle,
    entities: []
  },
  queryDataTable: async (fromDate: Required<Date>, toDate: Required<Date>) => {
    set((state: TState) =>
      update(state, {
        dataTable: {
          loadingStatus: { $set: REQUEST_STATUS.pending }
        }
      })
    );

    const response = await queryDataTable(fromDate, toDate);

    set((state: TState) =>
      update(state, {
        dataTable: {
          loadingStatus: { $set: REQUEST_STATUS.idle },
          entities: { $set: response }
        }
      })
    );
  }
}));

export default useStore;