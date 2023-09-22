import { create } from 'zustand';
import update from 'immutability-helper';
import { RateIconEnum, TFeedback } from '../type';

const useStore = create<TFeedback>(set => ({
  feedBackInfo: {
    functionName: '',
    rate: RateIconEnum.DEFAULT
  },
  setRateStatus: (rate: RateIconEnum) => {
    set((state: TFeedback) =>
      update(state, {
        feedBackInfo: {
          rate: { $set: rate }
        }
      }));
  }
}));

export default useStore;
