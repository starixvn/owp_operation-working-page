import React from 'react';
import PropTypes from 'prop-types';
import {
  useStableDispatch,
  updatedIsReadOneRow
} from '../../../ImportTicketCenterHelperNative';
import {
  getTicketDetail,
  getTicketSubTypes
} from '../../../../Shared/chatBoardNew/chatBoardSlice';
import {
  closeCreatePopup,
  changeErrorRecipient
} from '../../../../Shared/createTicketNew/createTicketBoardSliceNew';
import { onClickIssueModel } from '../../signalR/signalRSlice';
import ToastsWrapper from '../../../../components/ToastrWrapper';
import store from '../../../app/storeNative';
import LeagueCellFactory from '../../../../Shared/common/CustomTable/commonCell/LeagueCellNew/LeagueCellFactory';
import { getDetailSegmentUrlByEventType } from '../../../Helper/TicketCenterHelper';

const propTypes = {
  rowIndex: PropTypes.number.isRequired,
  dataSource: PropTypes.array.isRequired
};

const ConversationCell = ({ dataSource, rowIndex }) => {
  const stableDispatch = useStableDispatch();

  const handleOpenMessage = async () => {
    const { pagePolicy } = store.getState();
    const { permission } = pagePolicy;
    const { ticketId, eventType, ticketType } = dataSource[rowIndex];

    const requestDetailModel = {
      ticketId,
      actorId: permission.ActorId,
      detailSegmentUrl: getDetailSegmentUrlByEventType(eventType),
      eventType
    };

    stableDispatch(changeErrorRecipient(false));
    stableDispatch(closeCreatePopup());
    stableDispatch(updatedIsReadOneRow(rowIndex));
    stableDispatch(onClickIssueModel(requestDetailModel));
    stableDispatch(getTicketSubTypes(ticketType));
    const actionResult = await stableDispatch(
      getTicketDetail({
        ...requestDetailModel,
        isQueryMessageInLastTwoDay: true
      })
    );
    if (getTicketDetail.rejected.match(actionResult)) {
      ToastsWrapper.showError(actionResult.payload);
    }
  };

  return (
    <LeagueCellFactory
      data={dataSource[rowIndex]}
      onClick={handleOpenMessage}
    />
  );
};

ConversationCell.propTypes = propTypes;
export default ConversationCell;
