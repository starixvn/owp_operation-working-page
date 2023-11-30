import { create } from 'zustand';
import createFilterSlice from './createFilterSliceNative';
import createPermissionSlice from './createPermissionSliceNative';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { TFilter, TPermission } from '../type';

const useStore = create<TFilter & TPermission>()(
  (...a) => ({
    ...createPermissionSlice(...a),
    ...createFilterSlice(...a)
  })
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('user-management', useStore);
}

export default useStore;
