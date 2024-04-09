import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hookNative';
import Filter from './feature/filter/Filter';
import Table from './feature/table/Table';
import { getAgentConfirm } from './feature/table/tableThunk';
import { FunctionKeys } from '../Shared/Constants';
import usePermission from '../Shared/customHook/usePermission';
import { CreatorInfo } from './type/table';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';
import { RECIPIENT_TYPE } from '../Shared/createTicketNew/const/const';
import CreateTicketLGAView from '../Shared/createTicketNew/CreateTicketLGAView';

const ProviderVerificationAppNative = () => {
  const dispatch = useAppDispatch();
  const { loadingAgentConfirmOption } = useAppSelector(state => state.events);

  useEffect(() => {
    dispatch(getAgentConfirm());
  }, [dispatch]);

  const pagePermissionModel = usePermission(
    FunctionKeys.TicketCenter,
    'pagePolicy'
  );
  const { permission } = pagePermissionModel;
  const { Username, ActorId } = permission;

  const creatorInfo: CreatorInfo = {
    groupName: null,
    nickName: Username,
    recipientId: ActorId,
    recipientType: RECIPIENT_TYPE.INDIVIDUAL,
    userName: Username
  };

  if (
    isEquals(loadingAgentConfirmOption, REQUEST_STATUS.pending) ||
    !Username
  ) {
    return <Loading />;
  }

  return (
    <>
      <div className='provider-verification'>
        <Filter />
        <Table />
      </div>
      <CreateTicketLGAView creatorInfo={creatorInfo} />
    </>
  );
};

export default ProviderVerificationAppNative;
