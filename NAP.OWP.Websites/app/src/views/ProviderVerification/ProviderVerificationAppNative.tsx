import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hookNative';
import Filter from './feature/filter/Filter';
import Table from './feature/table/Table';
import { getAgentConfirm } from './feature/table/tableThunk';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';

const ProviderVerificationAppNative = () => {
  const dispatch = useAppDispatch();
  const { loadingAgentConfirmOption } = useAppSelector(state => state.events);

  useEffect(() => {
    dispatch(getAgentConfirm());
  }, [dispatch]);

  if (isEquals(loadingAgentConfirmOption, REQUEST_STATUS.pending)) {
    return <Loading />;
  }
  return (
    <div className='provider-verification'>
      <Filter />
      <Table />
    </div>
  );
};

export default ProviderVerificationAppNative;
