import { create } from 'zustand';
import update from 'immutability-helper';
import { RateIconEnum, TFeedback, StatusEnum } from '../type';
import { post } from '../../Shared/Service/Service';

const useStore = create<TFeedback>((set, get) => ({
  feedBackInfo: {
    functionId: '',
    rate: RateIconEnum.DEFAULT
  },
  statusForm: StatusEnum.FEED_BACK,
  setStatusForm: (status: StatusEnum) => {
    set(state =>
      update(state, {
        statusForm: { $set: status }
      }));
  },
  setRateStatus: (rate: RateIconEnum) => {
    set(state =>
      update(state, {
        feedBackInfo: {
          rate: { $set: rate }
        }
      }));
  },
  postFeedback: async () => {
    const { feedBackInfo } = get();
    // TODO
    set(state => update(state, {
      statusForm: {
        $set: StatusEnum.THANK_YOU
      }
    }));
  }
}));

export default useStore;
