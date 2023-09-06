import { create } from 'zustand';
import update from 'immutability-helper';
import { TAction, TState } from '../feature/type/TableType.native';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { queryDataTable, queryConditionData } from '../service';

const useStore = create<TState & TAction>(set => ({
  dataTable: {
    loadingStatus: REQUEST_STATUS.idle,
    entities: [],
    isGap: true
  },
  conditionData: [],
  queryConditionData: async () => {
    const data = await queryConditionData();
    set({
      conditionData: data
    });
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

    set((state: TState) =>
      update(state, {
        dataTable: {
          loadingStatus: { $set: REQUEST_STATUS.idle },
          entities: { $set: data.kpiLa },
          isGap: { $set: data.isGap }
        }
      })
    );
  }
}));

export default useStore;
