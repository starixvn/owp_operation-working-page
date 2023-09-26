import { create } from 'zustand';
import update from 'immutability-helper';
import { RateIconEnum, TFeedback, StatusEnum } from '../type';

const useStore = create<TFeedback>((set, get) => ({
  feedBackInfo: {
    functionName: '',
    rate: RateIconEnum.DEFAULT,
    inputMessage: '',
    selectedFile: null,
    selectedImage: null
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
  setFunctionName: (functionName: string) => {
    set(state =>
      update(state, {
        feedBackInfo: {
          functionName: { $set: functionName }
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
