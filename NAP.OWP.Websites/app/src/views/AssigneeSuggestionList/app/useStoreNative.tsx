import { create } from 'zustand';
import {
  TQueryWorkScheduleInfo,
  TQueryColorExplainInfo
} from '../features/TypeNative';
import crateTableSlice from './createTableSliceNative';

import createColorExplainSlice from './createColorExplainSliceNative';

export default create<TQueryWorkScheduleInfo & TQueryColorExplainInfo>()(
  (...a) => ({
    ...crateTableSlice(...a),
    ...createColorExplainSlice(...a)
  })
);
