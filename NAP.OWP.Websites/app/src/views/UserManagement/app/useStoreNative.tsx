import { create } from 'zustand';
import createOptionsSlice from './createFilterSliceNative';
import createPermissionSlice from './createPermissionSliceNative';

import { TFilter, TPermission } from '../type';

export default create<TFilter & TPermission>()(
  (...a) => ({
    ...createPermissionSlice(...a),
    ...createOptionsSlice(...a)
  })
);
