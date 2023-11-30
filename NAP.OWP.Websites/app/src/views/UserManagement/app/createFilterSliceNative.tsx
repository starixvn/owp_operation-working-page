import { StateCreator } from 'zustand';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TFilter, TOptionsResponse } from '../type';
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
    locationCode: []
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

    set(state =>
      update(state, {
        queryOptionsStatus: { $set: REQUEST_STATUS.idle },
        options: {
          roles: { $set: normalizeOptions(options.roles) },
          sections: { $set: normalizeOptions(options.sections) },
          departments: { $set: normalizeOptions(options.departments) },
          categories: { $set: normalizeOptions(options.categories) },
          locationCodes: { $set: normalizeOptions(options.locationCodes) },
          levels: { $set: normalizeOptions(options.levels) },
          languages: { $set: normalizeOptions(options.languages) },
          userGroups: { $set: normalizeOptions(options.userGroups) }
        },
        filterValue: {
          role: { $set: normalizeOptions(options.roles) },
          section: { $set: normalizeOptions(options.sections) },
          department: { $set: normalizeOptions(options.departments) },
          category: { $set: normalizeOptions(options.categories) },
          locationCode: { $set: normalizeOptions(options.locationCodes) }
        }
      }));

  },
  setFilterValue(value, key) {
    set(state =>
      update(state, {
        filterValue: {
          [key]: { $set: value }
        }
      }));
  },
});

export default createOptionsSliceNative;