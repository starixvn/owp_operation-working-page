import { create } from 'zustand';

import createTableSlice from './createTableSlice';

import { TQueryLiveGameAssignment } from '../type/type';

export default create<TQueryLiveGameAssignment>()(
  (...a) => ({
    ...createTableSlice(...a)
  })
);
