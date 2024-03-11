import { isEqual } from 'lodash';
import store from '../app/store';

const notifyChangedInformationData = data => {
  const { chatBoard } = store.getState();
  const { ticketDetail } = chatBoard;
  const { ticketId } = ticketDetail;
  isEqual(process.env.NODE_ENV, 'production') &&
    ticketId === data.ticketId &&
    documentTitle.BlinkDocumentTitle(data.message);
};

export default notifyChangedInformationData;
