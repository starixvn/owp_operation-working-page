import React, { useRef, useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { getValueRef } from '../../Utils';
import Attachments from '../Attachments/Attachments';
import RecipientsSelect from '../../recipientSelect/RecipientsSelect';
import { useSelector } from 'react-redux';
import useStableDispatch from '../../customHook/useStableDispatch';
import Select from 'react-select';
import {
  changeErrorRecipient,
  setSelectedRecipients,
  setSubTypeSelected
} from '../createTicketBoardSliceNew';
import {
  getSubTypeByType,
  getRecipientDefaultBySubType
} from '../Helper/HelperCreateTicket';

const propTypes = {
  handleOnSubmit: PropTypes.func,
  handleOnClosePopup: PropTypes.func,
  selectedFiles: PropTypes.any,
  setSelectedFiles: PropTypes.func,
  ticketType: PropTypes.any
};

const ShareOfChatBoardTicket = props => {
  const {
    selectedFiles,
    setSelectedFiles,
    handleOnSubmit,
    handleOnClosePopup,
    ticketType
  } = props;

  const commentRef = useRef();

  const handleSubmit = () => {
    handleOnSubmit(getValueRef(commentRef));
  };
  const dispatch = useStableDispatch();
  const [subTypeOption, setSubTypeOption] = useState([]);
  const [recipientBySubTypes, setRecipientBySubTypes] = useState([]);
  const { errorRecipient, subTypeSelected } = useSelector(
    state => state.createTicketBoard
  );

  useEffect(() => {
    (async () => {
      const subType = await getSubTypeByType(ticketType);
      const option = subType.map(
        ({ subTypeId: value, subTypeName: label }) => ({
          value,
          label
        })
      );
      setSubTypeOption([...option, { value: 0, label: '' }]);
      dispatch(setSubTypeSelected(...[{ value: 0, label: '' }]));
    })();
  }, [ticketType]);

  const handleChangeSubType = async select => {
    dispatch(setSubTypeSelected(select));
    const recipient = await getRecipientDefaultBySubType(select.value);
    setRecipientBySubTypes(recipient);
    dispatch(setSelectedRecipients(recipient));
  };

  return (
    <>
      <div className='form-createTicket'>
        <div className='left-form'>
          <label className='label' htmlFor='subject'>
            SubType:
          </label>
        </div>
        <div className='right-form'>
          <div className='subtype-input'>
            <Select
              classNamePrefix='input-field-select'
              placeholder=''
              value={subTypeSelected}
              onChange={select => handleChangeSubType(select)}
              options={subTypeOption}
            />
          </div>
        </div>
      </div>
      <div className='form-createTicket'>
        <div className='left-form'>
          <label className='label' htmlFor='subject'>
            Recipient:<span className='required'>*</span>
          </label>
        </div>
        <div className='right-form'>
          <RecipientsSelect
            defaultValue={recipientBySubTypes || []}
            onChange={value => dispatch(setSelectedRecipients(value))}
            errorSubmit={errorRecipient}
            onChangeErrorSubmit={value => dispatch(changeErrorRecipient(value))}
          />
        </div>
      </div>
      <div className='form-createTicket'>
        <div className='left-form'>
          <div className='label'>Comment:</div>
        </div>
        <div className='right-form'>
          <div className='box-textmessage'>
            <Input
              type='textarea'
              id='comment'
              innerRef={commentRef}
              name='message'
              className='input-field'
              maxLength='200'
              multiple
            />
          </div>
        </div>
      </div>
      <Attachments
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <div className='btn-group-add-new'>
        <button className='button-close' onClick={handleOnClosePopup}>
          Cancel
        </button>
        <button className='button-submit' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};
ShareOfChatBoardTicket.propTypes = propTypes;
export default ShareOfChatBoardTicket;
