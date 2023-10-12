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
  exportDataTable,
  getSectionOption
} from '../service';
import { filterData, sortData } from '../helper/LaKpiHelper';
import getPermission from '../../Shared/permission/getPermission';

const useStore = create<TState & TAction>((set, get) => ({
  dataTable: {
    loadingStatus: REQUEST_STATUS.idle,
    entities: [],
    dataSourcesFiltered: [],
    isGap: true
  },
  filterHeaderValue: '',
  permission: null,
  conditionData: [],
  levelOption: [],
  sectionOption: [],
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
    const { filterHeaderValue } = get();
    set((state: TState) =>
      update(state, {
        dataTable: {
          loadingStatus: { $set: REQUEST_STATUS.pending }
        }
      })
    );

    const data = await queryDataTable(fromDate, toDate);
    const dataFiltered = filterData(data.kpiLa, filterHeaderValue);
    set((state: TState) =>
      update(state, {
        dataTable: {
          loadingStatus: { $set: REQUEST_STATUS.idle },
          entities: { $set: data.kpiLa },
          dataSourcesFiltered: { $set: dataFiltered },
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
  },
  setFilterHeader: (value: string) => {
    set((state: TState) =>
      update(state, {
        filterHeaderValue: { $set: value }
      })
    );
  },
  queryPermissionsAndSections: async () => {
    const permission = await getPermission('LAKpi');
    const sectionOption = await getSectionOption(permission.ActorId);

    set((state: TState) =>
      update(state, {
        permission: { $set: permission },
        sectionOption: { $set: sectionOption }
      })
    );
  },
  getPermission: () => get().permission
}));

export default useStore;
