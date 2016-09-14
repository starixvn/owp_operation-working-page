import React, { createRef } from 'react';
import { useSelector } from 'react-redux';
import { validExtension } from '../const/index.json';
import { setMessage } from '../chatBoardSlice';
import useStableDispatch from '../../customHook/useStableDispatch';
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '../../../../assets/svg-element/AttachFileIcon';

const InputMessage = ({ handleSendFile, handleSendMessage }) => {
  const dispatch = useStableDispatch();
  const inputFileRef = createRef();
  const { inputMessage } = useSelector(state => state.chatBoard);

  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    await handleSendFile(event, file);
  };

  const handleInputMessageChange = event => {
    dispatch(setMessage(event.currentTarget.value));
  };

  const handleOnKeyPress = async e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      await handleSendMessage(e);
    }
  };

  return (
    <div className='chat-box'>
      <TextField
        variant='outlined'
        placeholder='Type a message...'
        onChange={handleInputMessageChange}
        value={inputMessage}
        autoFocus
        multiline
        maxRows={4}
        onKeyPress={handleOnKeyPress}
        spellCheck={false}
      />
      <AttachFileIcon handleOnClick={() => inputFileRef.current.click()} />
      <SendIcon className='icon-send' size='24' onClick={handleSendMessage} />
      <input
        accept={validExtension}
        ref={inputFileRef}
        hidden
        type='file'
        onChange={handleFileInputChange}
      />
    </div>
  );
};
InputMessage.propTypes = {
  handleSendFile: PropTypes.func,
  handleSendMessage: PropTypes.func
};

export default InputMessage;
