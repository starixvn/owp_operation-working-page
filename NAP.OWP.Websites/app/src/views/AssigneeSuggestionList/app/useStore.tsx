import { create } from 'zustand';
import {
  TQueryWorkScheduleInfo,
  TQueryColorExplainInfo
} from '../features/TypeNative';
import crateTableSlice from './createTableSlice';

import createColorExplainSlice from './createColorExplainSlice';

export default create<TQueryWorkScheduleInfo & TQueryColorExplainInfo>()(
  (...a) => ({
    ...crateTableSlice(...a),
    ...createColorExplainSlice(...a)
  })
);
