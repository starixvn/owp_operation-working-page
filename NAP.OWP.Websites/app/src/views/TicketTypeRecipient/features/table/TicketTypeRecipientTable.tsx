import { isEqual } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import usePermission from '../../../Shared/customHook/usePermission';
import useStableDispatch from '../../../Shared/customHook/useStableDispatch';
import { getTicketTypeRecipients } from '../ticketTypeThunkNative';
import { functionKey } from '../../Const.json';
import Loading from '../../../components/Loading';
import {
  Recipient,
  SubType,
  TicketTypeRecipientDataSource
} from '../TypeNative';
import { RootState } from '../../app/storeNative';
import ActionWrapper from '../cell/ActionWrapper';

const TicketTypeRecipientTable = () => {
  const permissionModel = usePermission(functionKey);
  const ticketTypeRecipient = useSelector(
    (state: RootState) => state.ticketTypeRecipient
  );
  const dispatch = useStableDispatch();

  useEffect(() => {
    dispatch(getTicketTypeRecipients());
  }, [dispatch]);

  if (
    isEqual(permissionModel.loading, REQUEST_STATUS.pending) ||
    isEqual(ticketTypeRecipient.loading, REQUEST_STATUS.pending)
  ) {
    return <Loading />;
  }

  const renderTable = () =>
    ticketTypeRecipient.entities.map(
      (entity: TicketTypeRecipientDataSource) => (
        <tr key={entity.ticketType.typeId}>
          <td>{entity.ticketType.typeName}</td>
          <td className='subtype'>{renderSubType(entity.subtypes)}</td>
          <td>{renderRecipients(entity.recipients)}</td>
          <td>
            <ActionWrapper {...entity} />
          </td>
        </tr>
      )
    );

  const renderRecipients = (recipients: Recipient[]) =>
    recipients.map(recipient => recipient.recipientName).join(', ');

  const renderSubType = (subtypes: SubType[]) =>
    subtypes.map(subtype => subtype.subtypeName).join(', ');
  return (
    <table className='ticket-recipient-table'>
      <thead>
        <tr>
          <th>Ticket type</th>
          <th>Subtype</th>
          <th>Recipient (default)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{renderTable()}</tbody>
    </table>
  );
};

export default TicketTypeRecipientTable;
