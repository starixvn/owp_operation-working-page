import { throttle } from 'lodash';
import { refreshEventTickets } from '../../ImportTicketCenterHelperNative';
import { getTicketDetail } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/storeNative';

const reloadTicketCenterTable = model => {
  const { filterModel, issueModel } = model.signalR;
  const { isOpenPopup } = model.chatBoard;

  const submitThrottle = throttle(
    backupFilter => store.dispatch(refreshEventTickets(backupFilter)),
    500
  );
  isOpenPopup && store.dispatch(getTicketDetail(issueModel));
  submitThrottle(filterModel);
};

export { reloadTicketCenterTable };
