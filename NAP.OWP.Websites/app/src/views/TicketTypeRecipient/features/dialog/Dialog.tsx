import React, { useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import EditRecipient from '../editRecipientPopup/EditRecipient';
import SubType from '../subType/SubTypeManagement';
import { TicketTypeRecipientDataSource } from '../TypeNative';
import Command from './Command';
import useStore from '../../app/zustand/ticketTypeStore';

interface Props extends TicketTypeRecipientDataSource {
  onClose: () => void,
  onSave: () => Promise<void>
}

const Dialog = (props: Props) => {
  const {
    onClose,
    onSave,
    ...rest
  } = props;
  const { ticketType } = rest;

  useEffect(() => {
    useStore.setState({
      recipients: rest.recipients,
      subtypes: rest.subtypes
    });
    return () => useStore.setState({
      recipients: [],
      subtypes: []
    });
  }, [rest.recipients, rest.subtypes]);

  return (
    <Modal
      isOpen
      scrollable
      className='recipient-modal'
      centered>
      <ModalBody>
        <h2 className='title'>
          <b>{`Edit Ticket: ${ticketType.typeName}`}</b>
        </h2>
        <EditRecipient
          recipientsDefault={rest.recipients}
        />
        <SubType
          subTypesDefault={rest.subtypes}
          ticketTypeId={rest.ticketType.typeId} />
        <Command
          onClose={onClose}
          onSave={onSave} />
      </ModalBody>
    </Modal>
  );
};

export default Dialog;