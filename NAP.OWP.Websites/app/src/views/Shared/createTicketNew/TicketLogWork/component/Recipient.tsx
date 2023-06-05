import React from 'react';
import RecipientsSelect from '../../../recipientSelect/RecipientsSelect';

type Props = {
  selectedRecipients: Recipient[];
  handleOnChange: (recipients: Recipient[]) => void;
  isErrorRecipient: boolean;
  handleOnErrorSubmit: (value: boolean) => void;
};

const Recipient = ({
  selectedRecipients,
  handleOnChange,
  handleOnErrorSubmit,
  isErrorRecipient
}: Props) => {
  return (
    <div className='form-createTicket'>
      <div className='left-form'>
        <label className='label' htmlFor='subject'>
          Recipient:<span className='required'>*</span>
        </label>
      </div>
      <div className='right-form'>
        <RecipientsSelect
          defaultValue={selectedRecipients || []}
          onChange={handleOnChange}
          errorSubmit={isErrorRecipient}
          onChangeErrorSubmit={handleOnErrorSubmit}
        />
      </div>
    </div>
  );
};

export default Recipient;
