import { StateCreator } from 'zustand';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TFilter, TFilterOptionsResponse } from '../type';
import axios from 'axios';
import update from 'immutability-helper';
import {
  normalizeOptions,
  normalizeLocationCodeOptions,
  buildOptions
} from '../utils';

const defaultNoneOption = {
  value: 0,
  label: 'None'
};

const defaultLocationCodeNoneOption = {
  value: 'None',
  label: 'None'
};

const createOptionsSliceNative: StateCreator<TFilter, [], [], TFilter> = (
  set,
  get
) => ({
  queryFilterOptionsStatus: REQUEST_STATUS.pending,
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
  async queryFilterOptions() {
    const options = (
      await axios.get('api-netcore/UserManagement/query-filter-options')
    ).data as TFilterOptionsResponse;

    set(state =>
      update(state, {
        queryFilterOptionsStatus: { $set: REQUEST_STATUS.idle },
        options: {
          roles: { $set: normalizeOptions(options.roles, defaultNoneOption) },
          sections: {
            $set: normalizeOptions(options.sections, defaultNoneOption)
          },
          departments: {
            $set: normalizeOptions(options.departments, defaultNoneOption)
          },
          categories: {
            $set: normalizeOptions(options.categories, defaultNoneOption)
          },
          locationCodes: {
            $set: normalizeLocationCodeOptions(
              options.locationCodes,
              defaultLocationCodeNoneOption
            )
          },
          levels: { $set: normalizeOptions(options.levels, defaultNoneOption) },
          languages: { $set: buildOptions(options.languages) },
          userGroups: {
            $set: normalizeOptions(options.userGroups, defaultNoneOption)
          }
        },
        filterValue: {
          role: { $set: normalizeOptions(options.roles, defaultNoneOption) },
          section: {
            $set: normalizeOptions(options.sections, defaultNoneOption)
          },
          department: {
            $set: normalizeOptions(options.departments, defaultNoneOption)
          },
          category: {
            $set: normalizeOptions(options.categories, defaultNoneOption)
          },
          locationCode: {
            $set: normalizeOptions(
              options.locationCodes,
              defaultLocationCodeNoneOption
            )
          }
        }
      })
    );
  },
  setFilterValue(value, key) {
    set(state =>
      update(state, {
        filterValue: {
          [key]: { $set: value }
        }
      })
    );
  }
});

export default createOptionsSliceNative;
