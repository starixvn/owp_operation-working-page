import { getTicketDetail } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/store';
import { reloadTicketInTable } from '../league/shiftSlice/shiftSlice';
import ToastsWrapper from '../../../components/ToastrWrapper';
import { throttle } from 'lodash';
import { URL_QUERY_TICKET_LIST } from '../../const/const';
import { get } from '../../ImportPrematchHelperNative';

const reloadPreMatch = async (id, isTicketLeague) => {
  await reloadTicketInPreMatchTableHandler(id, isTicketLeague);
  await reloadOpenTicketHandler();
};

const reloadTicketInPreMatchTableHandler = async (id, isTicketLeague) => {
  const model = store.getState();
  const { isEdit } = model.editor;
  const { permission } = model.policy;

  const getTicketList = async () => {
    const response = await get({
      url: URL_QUERY_TICKET_LIST,
      id,
      actorId: permission.ActorId,
      isTicketLeague
    });

    return response.data;
  };

  const submitThrottle = throttle(ticketList => {
    store.dispatch(reloadTicketInTable({ id, isTicketLeague, ticketList }));
  }, 500);

  const ticketList = await getTicketList();
  !isEdit && submitThrottle(ticketList);
};

const reloadOpenTicketHandler = async () => {
  const model = store.getState();
  const { backupGetIssueModel } = model.signalR;
  const { isOpenPopup } = model.chatBoard;

  if (isOpenPopup) {
    const actionResult = await store.dispatch(
      getTicketDetail(backupGetIssueModel)
    );
    if (getTicketDetail.rejected.match(actionResult)) {
      ToastsWrapper.showError(actionResult.payload);
    }
  }
};

export { reloadOpenTicketHandler, reloadPreMatch };
