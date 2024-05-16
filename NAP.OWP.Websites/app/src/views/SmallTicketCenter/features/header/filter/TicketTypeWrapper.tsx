
import TicketType from './TicketType';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooksNative';
import { REQUEST_STATUS } from '../../../../Shared/Constants';
import Loading from '../../../../components/Loading';
import { getTicketTypeOption } from './filterThunkNative';

const TicketTypeWrapper = () => {
  const dispatch= useAppDispatch();
  const loading = useAppSelector(s=>s.filter.loadingTicketTypeOptions);

  useEffect(() => {
    (async () => {
      dispatch(getTicketTypeOption());
    })();
  }, [dispatch]);

  if(loading===REQUEST_STATUS.pending){
    return <Loading/>;
  }
  return (
   <TicketType/>
  );
};

export default TicketTypeWrapper;