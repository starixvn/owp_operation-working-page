import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPolicy } from '../type/type';

import { FunctionKeys } from '../../Shared/Constants';
import axios from 'axios';
import AuthorizeService from '../../Authorize/Service';


const queryPolicyThunk = createAsyncThunk<TPolicy>(
  'policy/query',
  async () => {
    const [
      fullBetTypesPolicy,
      pHBetTypesPolicy,
      detailInformationPolicy
    ] = await axios.all([
      AuthorizeService.authorize(FunctionKeys.LiveGameAssignment_FullBetTypes),
      AuthorizeService.authorize(FunctionKeys.LiveGameAssignment_PHBetTypes),
      AuthorizeService.authorize(FunctionKeys.DetailsInformation)
    ]);

    return {
      UserId: fullBetTypesPolicy.UserId,
      Username: fullBetTypesPolicy.Username,
      FullBetTypes: fullBetTypesPolicy,
      PHBetTypes: pHBetTypesPolicy,
      detailInformationPolicy
    };
  }
);

export default queryPolicyThunk;
