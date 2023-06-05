import React from 'react';
import { Input } from 'reactstrap';
type Props = {
  comment: string;
  handleOnChange: (value: string) => void;
};

const Comment = ({ comment, handleOnChange }: Props) => {
  return (
  <div className='form-createTicket'>
      <div className='left-form'>
        <div className='label'>Comment:</div>
      </div>
      <div className='right-form'>
        <div className='box-textmessage'>
          <Input
            type='textarea'
            id='comment'
            name='message'
            className='input-field'
            maxLength={200}
            multiple
            onChange={event => handleOnChange(event.target.value)}
            value={comment}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
