import { StateCreator } from 'zustand';
import { TQueryPolicy } from '../type/type';
import { REQUEST_STATUS, FunctionKeys } from '../../Shared/Constants';
import axios from 'axios';
import AuthorizeService from '../../Authorize/Service';

const createPolicySlice: StateCreator<
  TQueryPolicy,
  [],
  [],
  TQueryPolicy
> = (set, get) => ({
  loadingPolicy: REQUEST_STATUS.pending,
  policy: null,
  queryPolicy: async () => {
    set({ loadingPolicy: REQUEST_STATUS.pending });
    const [
      fullBetTypesPolicy,
      pHBetTypesPolicy,
      detailInformationPolicy
    ] = await axios.all([
      AuthorizeService.authorize(FunctionKeys.LiveGameAssignment_FullBetTypes),
      AuthorizeService.authorize(FunctionKeys.LiveGameAssignment_PHBetTypes),
      AuthorizeService.authorize(FunctionKeys.DetailsInformation)
    ]);
    set({
      policy: {
        UserId: fullBetTypesPolicy.UserId,
        Username: fullBetTypesPolicy.Username,
        FullBetTypes: fullBetTypesPolicy,
        PHBetTypes: pHBetTypesPolicy,
        detailInformationPolicy
      },
      loadingPolicy: REQUEST_STATUS.idle
    });
  },
});

export default createPolicySlice;
