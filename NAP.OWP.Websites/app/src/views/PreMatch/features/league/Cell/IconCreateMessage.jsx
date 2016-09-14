import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircleIcon } from 'mdi-react';
import { useSelector } from 'react-redux';
import {
  openTicketPopup,
  getModelByRowIndex,
  closePopup
} from '../../../../Shared/chatBoardNew/chatBoardSlice';
import {
  changeErrorRecipient,
  closeCreatePopup,
  setDefaultRecipients,
  setSubTypeSelected,
  getSelectedRecipients
} from '../../../../Shared/createTicketNew/createTicketBoardSliceNew';
import useStableDispatch from '../../../../Shared/customHook/useStableDispatch';
import { backupGetIssueModel } from '../../signalR/signalRSlice';
import { getRecipientDefaultByType } from '../../../../Shared/createTicketNew/Helper/HelperCreateTicket';
import { ticketType } from '../../../const/const';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const IconCreateMessage = props => {
  const { dataSource, rowIndex } = props;

  const hasWrite = useSelector(state => state.policy).permission.HasWrite;

  const dispatch = useStableDispatch();

  const handleOpenCreateTicket = () => {
    const model = {
      ...dataSource[rowIndex]
    };
    dispatch(getModelByRowIndex(model));
    dispatch(backupGetIssueModel(model));
    dispatch(openTicketPopup());
    dispatch(changeErrorRecipient(false));
    dispatch(closePopup());
    dispatch(closeCreatePopup());

    dispatch(setSubTypeSelected([...[{ value: 0, label: '' }]]));
  };

  const getRecipientByType = async () => {
    const recipientSetting = await getRecipientDefaultByType(
      ticketType.EVEN_CHECKING
    );
    dispatch(setDefaultRecipients(recipientSetting));
    dispatch(getSelectedRecipients(recipientSetting));
  };

  if (!hasWrite) {
    return null;
  }

  return (
    <PlusCircleIcon
      onClick={() => {
        getRecipientByType();
        handleOpenCreateTicket();
      }}
      className='icon-plus'
    />
  );
};

IconCreateMessage.propTypes = propTypes;
export default IconCreateMessage;
