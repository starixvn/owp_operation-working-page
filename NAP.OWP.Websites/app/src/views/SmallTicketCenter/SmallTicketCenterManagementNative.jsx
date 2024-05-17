import { useEffect } from 'react';
import { OWPPage, OWPHeader } from '../Shared/common/OWP/OPWPage';
import Filter from './features/header/filter/Filter';
import { FunctionKeys } from '../Shared/Constants';
import Loading from '../components/Loading';
import { usePermission } from './ImportTicketCenterHelperNative';
import { useAppDispatch } from './app/hooksNative';
import {
  getTicketDetail,
  getTicketSubTypes
} from '../Shared/chatBoardNew/chatBoardThunkNative';

const SmallTicketCenterManagementNative = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    /* (async () => {
      if (actorId && eventType && ticketId) {
        dispatch(getTicketSubTypes(actionResult.payload.data.ticketType));
        if (getTicketDetail.rejected.match(actionResult)) {
          ToastrWrapper.showError(actionResult.payload);
        }
      }
    })(); */
  }, []);

  return (
    <div className='small__ticket-center'>
      <OWPPage className='Event-Tickets'>
        <OWPHeader className='tickets-tab'>
          <Filter />
        </OWPHeader>
      </OWPPage>
    </div>
  );
};

export default SmallTicketCenterManagementNative;
