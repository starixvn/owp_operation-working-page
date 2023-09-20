import { create } from 'zustand';
import update from 'immutability-helper';
import {
  DataSource,
  SortState,
  TAction,
  TState,
  Target
} from '../feature/type/TableType.native';
import { REQUEST_STATUS } from '../../Shared/Constants';
import {
  queryDataTable,
  queryConditionData,
  queryLevelOption,
  updateTargetLevel,
  exportDataTable
} from '../service';
import { sortData } from '../helper/LaKpiHelper';

const useStore = create<TState & TAction>((set, get) => ({
  dataTable: {
    loadingStatus: REQUEST_STATUS.idle,
    entities: [],
    dataSourcesFiltered: [],
    isGap: true
  },
  conditionData: [],
  levelOption: [],
  sortState: {
    columnKeySelected: '',
    orderType: '',
    propertySelected: ''
  },
  queryConditionData: async () => {
    const data = await queryConditionData();
    set({
      conditionData: data
    });
  },
  exportDataTable: async (fromDate: Required<Date>, toDate: Required<Date>) => {
    await exportDataTable(fromDate, toDate);
  },
  queryLevelOption: async () => {
    const data = await queryLevelOption();
    set({
      levelOption: data
    });
  },
  updateTargetLevel: async (model: Target[]) => {
    await updateTargetLevel(model);
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
          dataSourcesFiltered: { $set: data.kpiLa },
          isGap: { $set: data.isGap }
        }
      })
    );
  },
  setDataSourcesFiltered: (data: DataSource[]) => {
    set((state: TState) =>
      update(state, {
        dataTable: {
          dataSourcesFiltered: { $set: data }
        }
      })
    );
  },
  sortDataSources: (sortState: SortState) => {
    const { dataTable } = get();
    const dataSorted = sortData(
      dataTable.dataSourcesFiltered,
      sortState.propertySelected,
      sortState.columnKeySelected,
      sortState.orderType
    );
    set((state: TState) =>
      update(state, {
        sortState: { $set: sortState },
        dataTable: {
          dataSourcesFiltered: { $set: dataSorted }
        }
      })
    );
  }
}));

export default useStore;
