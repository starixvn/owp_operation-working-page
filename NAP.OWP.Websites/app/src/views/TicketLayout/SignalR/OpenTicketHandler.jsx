import ToastrWrapper from '../../components/ToastrWrapper';
import {
  getTicketDetail,
  getTicketSubTypes
} from '../../Shared/chatBoardNew/chatBoardThunkNative';
import store from '../store';
import { getDetailSegmentUrlByEventType } from '../../TicketCenter/Helper/TicketCenterHelper';

const handleOpenTicketDetail = async (ticketId, eventType) => {
  const { pagePolicy } = store.getState();
  const { permission } = pagePolicy;

  const requestDetailModel = {
    ticketId,
    actorId: permission.ActorId,
    detailSegmentUrl: getDetailSegmentUrlByEventType(eventType),
    eventType
  };

  const actionResult = await store.dispatch(
    getTicketDetail(requestDetailModel)
  );
  store.dispatch(getTicketSubTypes(actionResult.payload.data.ticketType));
  if (getTicketDetail.rejected.match(actionResult)) {
    ToastrWrapper.showError(actionResult.payload);
  }
};

export { handleOpenTicketDetail };
