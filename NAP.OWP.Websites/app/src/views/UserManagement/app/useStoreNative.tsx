import { create } from 'zustand';
import createFilterSlice from './createFilterSliceNative';
import createPermissionSlice from './createPermissionSliceNative';
import createDataTableSliceNative from './createDataTableSliceNative';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { TDataTable, TFilter, TPermission } from '../type';

const useStore = create<TFilter & TPermission & TDataTable>()(
  (...a) => ({
    ...createPermissionSlice(...a),
    ...createFilterSlice(...a),
    ...createDataTableSliceNative(...a)
  })
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('user-management', useStore);
}

export default useStore;
