import { isEqual } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import usePermission from '../../../Shared/customHook/usePermission';
import useStableDispatch from '../../../Shared/customHook/useStableDispatch';
import { getTicketTypeRecipients } from '../ticketTypeThunkNative';
import { functionKey } from '../../Const.json';
import Loading from '../../../components/Loading';
import {
  Recipient,
  Subtype,
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
        <Fragment key={entity.ticketType.typeId}>
          <tr>
            <td rowSpan={entity.subtypes.length}>
              {entity.ticketType.typeName}
            </td>
            <td className='subtype'>{entity.subtypes[0]?.subtypeName}</td>
            <td>
              {renderRecipients(
                entity.recipients,
                entity.subtypes[0]?.subtypeName
              )}
            </td>
            <td rowSpan={entity.subtypes.length}>
              <ActionWrapper {...entity} />
            </td>
          </tr>

          {entity.subtypes.length >= 2 &&
            renderSubtypeRecipient(entity.subtypes, entity.recipients)}
        </Fragment>
      )
    );

  const renderSubtypeRecipient = (
    subtypes: Subtype[],
    recipients: Recipient[]
  ) => {
    const newSubtypes = subtypes.slice(1);

    return newSubtypes.map((subtype: Subtype) => (
      <tr key={subtype.subtypeId}>
        <td className='subtype'>{subtype.subtypeName}</td>
        <td>{renderRecipients(recipients, subtype.subtypeName)}</td>
      </tr>
    ));
  };

  const renderRecipients = (recipients: Recipient[], subtypeName: string) => {
    return recipients
      .filter(item => item.subtypeName === subtypeName)
      .map(recipient => recipient.recipientName)
      .join(', ');
  };

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
