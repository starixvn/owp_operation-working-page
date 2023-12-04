import { StateCreator } from 'zustand';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { TDataTable, TDataTableResponse } from '../type';
import { post } from '../../Shared/Service/Service';
import update from 'immutability-helper';

const createDataTableSliceNative: StateCreator<
  TDataTable,
  [],
  [],
  TDataTable
> = set => ({
  queryDataTableStatus: REQUEST_STATUS.idle,
  dataSource: {
    users: [],
    levelOfLiveTrading: [],
    levelOfLiveAssistant: [],
    levelOfOtherSection: []
  },
  async queryUserInfo(value) {
    set(state =>
      update(state, {
        queryDataTableStatus: { $set: REQUEST_STATUS.pending }
      }));
    const dataSource = (await post({
      url: 'api-netcore/UserManagement/query-user',
      ...value
    })).data as TDataTableResponse;;

    set(state =>
      update(state, {
        queryDataTableStatus: { $set: REQUEST_STATUS.idle },
        dataSource: { $set: dataSource }
      }));
  }
});

export default createDataTableSliceNative;