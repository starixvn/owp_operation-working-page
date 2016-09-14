import { getTicketDetail } from '../../../Shared/chatBoardNew/chatBoardSlice';
import store from '../../app/store';
import { getShiftByDateAndEmployeeWhenChat } from '../league/shiftSlice/shiftSlice';
import ToastsWrapper from '../../../components/ToastrWrapper';
import { throttle } from 'lodash';

const reloadPreMatch = async () => {
  await reloadOpenTicketHandler();
  await reloadPreMatchTableHandler();
};

const reloadPreMatchTableHandler = async () => {
  const model = store.getState();
  const { backupFilterModel } = model.signalR;

  const { isEdit } = model.editor;

  const submitThrottle = throttle(
    backupFilter =>
      store.dispatch(getShiftByDateAndEmployeeWhenChat(backupFilter)),
    500
  );
  !isEdit && (await submitThrottle(backupFilterModel));
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

export { reloadPreMatchTableHandler, reloadOpenTicketHandler, reloadPreMatch };
