import { StateCreator } from 'zustand';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TFilter, TOptions, TOptionsResponse, TRefResource } from '../type';
import axios from 'axios';
import update from 'immutability-helper';
import { normalizeOptions } from '../utils';

const createOptionsSliceNative: StateCreator<
  TFilter,
  [],
  [],
  TFilter
> = (set, get) => ({
  queryOptionsStatus: REQUEST_STATUS.pending,
  filterValue: {
    userName: '',
    role: [],
    section: [],
    department: [],
    category: [],
    locationCode: [],
    level: [],
    language: [],
    userGroup: [],
  },
  options: {
    roles: [],
    sections: [],
    departments: [],
    categories: [],
    locationCodes: [],
    levels: [],
    languages: [],
    userGroups: []
  },
  async queryOptions() {
    const options = (await axios.get('api-netcore/UserManagement/query-options')).data as TOptionsResponse;
    debugger;
    set(state =>
      update(state, {
        queryOptionsStatus: { $set: REQUEST_STATUS.idle },
        options: {
          roles: { $set: normalizeOptions(options.roles) },
          sections: { $set: normalizeOptions(options.roles) },
          departments: { $set: normalizeOptions(options.departments) },
          categories: { $set: normalizeOptions(options.categories) },
          locationCodes: { $set: normalizeOptions(options.locationCodes) },
          levels: { $set: normalizeOptions(options.levels) },
          languages: { $set: normalizeOptions(options.languages) },
          userGroups: { $set: normalizeOptions(options.userGroups) }
        },
        filterValue: {
          role: { $set: normalizeOptions(options.roles) },
          section: { $set: normalizeOptions(options.roles) },
          department: { $set: normalizeOptions(options.departments) },
          category: { $set: normalizeOptions(options.categories) },
          locationCode: { $set: normalizeOptions(options.locationCodes) },
          level: { $set: normalizeOptions(options.levels) },
          language: { $set: normalizeOptions(options.languages) },
          userGroup: { $set: normalizeOptions(options.userGroups) }
        }
      }));
    debugger
  }
});

export default createOptionsSliceNative;