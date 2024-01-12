import { StateCreator } from 'zustand';
import { TQueryLiveGameAssignment, TQueryPolicy } from '../type/type';
import { REQUEST_STATUS } from '../../Shared/Constants';

const createPolicySlice: StateCreator<
  TQueryPolicy,
  [],
  [],
  TQueryPolicy
> = (set, get) => ({
  loadingPolicy: REQUEST_STATUS.pending,
  policy: {
    FullBetTypes: {
      HasWrite: true
    },
    PHBetTypes: {
      HasWrite: true
    },
    detailInformationPolicy: {
      HasRead: true,
      HasWrite: true
    }
  },
  queryPolicy: async () => {
    set({ loadingPolicy: REQUEST_STATUS.pending });
    // TODO
    set({
      policy: {
        FullBetTypes: {
          HasWrite: true
        },
        PHBetTypes: {
          HasWrite: true
        },
        detailInformationPolicy: {
          HasRead: true,
          HasWrite: true
        }
      },
      loadingPolicy: REQUEST_STATUS.idle
    });
  },
});

export default createPolicySlice;
