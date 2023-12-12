import { StateCreator } from 'zustand';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TSectionName } from '../type';
import axios from 'axios';
import update from 'immutability-helper';

const createSectionNameSliceNative: StateCreator<
  TSectionName,
  [],
  [],
  TSectionName
> = set => ({
  querySectionNameStatus: REQUEST_STATUS.pending,
  sectionName: '',
  async querySectionName() {
    const url =
      process.env.NODE_ENV === 'development'
        ? `api-netcore/UserManagement/query-section-name`
        : `${window.netCoreRootUrl}/api/UserManagement/query-section-name`;
    const response = await axios.get(url);
    set(state =>
      update(state, {
        querySectionNameStatus: { $set: REQUEST_STATUS.idle },
        sectionName: { $set: response.data }
      }));
  }
});

export default createSectionNameSliceNative;