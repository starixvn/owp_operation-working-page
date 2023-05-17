import React from 'react';
import PropTypes from 'prop-types';
import CreateTicketHandler from '../handler/CreateTicketHandler';
import OpenTicketListHandler from '../handler/OpenTicketListHandler';
import { useDispatch } from 'react-redux';
import {
  closePopup,
  getModelByRowIndex
} from '../../chatBoardNew/chatBoardSlice';
import {
  changeErrorRecipient,
  closeCreatePopup,
  getSelectedRecipients,
  openPopupCreateTicketInLGA,
  setDefaultRecipients,
  setSubTypeSelected
} from '../../createTicketNew/createTicketBoardSliceNew';
import { TICKET_TYPE } from '../../TicketCenterPrematch/helper/helper';

const { LIVE_INCIDENT } = TICKET_TYPE;

const propTypes = {
  dataSource: PropTypes.any,
  rowIndex: PropTypes.number,
  onShowTicketList: PropTypes.func,
  updateDataSources: PropTypes.func
};

const TicketCellCommon = props => {
  const { dataSource, rowIndex, onShowTicketList, updateDataSources } = props;
  const stableDispatch = useDispatch();
  const closeAnotherPopup = () => {
    stableDispatch(closePopup());
    stableDispatch(closeCreatePopup());
  };

  const handleOpenCreateTicket = () => {
    closeAnotherPopup();
    stableDispatch(getModelByRowIndex(dataSource[rowIndex]));
    stableDispatch(openPopupCreateTicketInLGA());
    stableDispatch(changeErrorRecipient(false));
  };

  return (
    <div className='ticket-cell'>
      {dataSource[rowIndex].HasTicket ? (
        <OpenTicketListHandler
          dataSources={dataSource}
          index={rowIndex}
          onShowTicketList={onShowTicketList}
          updateDataSources={updateDataSources}
          handleOpenCreateTicket={handleOpenCreateTicket}
        />
      ) : (
        <CreateTicketHandler handleOpenCreateTicket={handleOpenCreateTicket} />
      )}
    </div>
  );
};

TicketCellCommon.propTypes = propTypes;

export default TicketCellCommon;
