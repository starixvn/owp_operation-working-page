import { create } from 'zustand';
import update from 'immutability-helper';
import { TAction, TState } from '../feature/type/TableType.native';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { queryDataTable } from '../service';

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

    const data = await queryDataTable(fromDate, toDate);
    debugger
    set((state: TState) =>
      update(state, {
        dataTable: {
          loadingStatus: { $set: REQUEST_STATUS.idle },
          entities: { $set: data }
        }
      })
    );
  }
}));

export default useStore;