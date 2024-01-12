import { create } from 'zustand';

import createTableSlice from './createTableSlice';
import createPolicySlice from './createPolicySlice';

import { TQueryLiveGameAssignment, TQueryPolicy } from '../type/type';

export default create<TQueryPolicy & TQueryLiveGameAssignment>()(
  (...a) => ({
    ...createPolicySlice(...a),
    ...createTableSlice(...a)
  })
);
