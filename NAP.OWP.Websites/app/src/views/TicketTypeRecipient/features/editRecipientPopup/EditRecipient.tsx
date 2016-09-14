import React, { useState } from 'react';
import RecipientTable from './RecipientTable';
import { Recipient } from '../TypeNative';
import RecipientSuggestion from '../../../Shared/TicketSetting/RecipientSuggestion/RecipientSuggestion';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/storeNative';
import { Permission } from '../../../Shared/TicketSetting/TypeNative';
import useStore from '../../app/zustand/ticketTypeStore';

interface PropsType {
  recipientsDefault: Array<Recipient>;
}

const EditRecipient = (props: PropsType) => {
  const { recipientsDefault } = props;
  const [recipients, setRecipients] = useState(recipientsDefault);
  const permission = useSelector((state: RootState) => state.policy.permission);
  const siteId = (permission as Permission).SiteId;
  const storeRecipientExternal = useStore(state => state.setRecipient);

  const handleAddRecipient = (recipient: Recipient) => {
    const newRecipients = [...recipients, recipient];
    setRecipients(newRecipients);
    storeRecipientExternal(newRecipients);
  };

  const handleDeleteRecipient = (recipient: Recipient) => {
    const newRecipients = recipients.filter(
      x => !isRecipientEqual(x, recipient)
    );
    setRecipients(newRecipients);
    storeRecipientExternal(newRecipients);
  };

  const isRecipientEqual = (a: Recipient, b: Recipient) =>
    a.recipientId === b.recipientId && a.recipientType === b.recipientType;

  return (
    <>
      <RecipientSuggestion
        currentRecipients={recipients}
        isIncludeGroup
        isIncludeSection
        siteId={siteId}
        handleAddRecipient={handleAddRecipient}
      />
      <div className='tableFixHead'>
        <RecipientTable
          recipients={recipients}
          handleDeleteRecipient={handleDeleteRecipient}
        />
      </div>
    </>
  );
};

export default EditRecipient;
