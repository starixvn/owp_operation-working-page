import React, { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { validExtension } from '../const/index.json';
import { setMessage } from '../chatBoardSlice';
import useStableDispatch from '../../customHook/useStableDispatch';
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TextField } from '@mui/material';
import AttachFileIcon from '../../../../assets/svg-element/AttachFileIcon';

const InputMessage = ({ handleSendFile, handleSendMessage }) => {
  const dispatch = useStableDispatch();
  const inputFileRef = createRef();
  const textFieldRef = createRef(null);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
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
      sendMessage(e);
    }
  };

  const sendMessage = async event => {
    selectedImage && (await handleSendFile(event, selectedImage));
    await handleSendMessage(event);
  };

  const handlePaste = event => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const imageUrl = URL.createObjectURL(blob);
        setTextFieldValue(imageUrl);
        setSelectedImage(blob);
        break;
      }
    }
  };

  const handleRemoveImage = () => {
    setTextFieldValue('');
  };

  return (
    <div className='chat-box'>
      <div>
        <div>
          {textFieldValue && (
            <div
              className='input-image'
              style={{
                padding: '4px',
                position: 'relative',
                border: '1px solid #bdbdbd'
              }}>
              <img
                src={textFieldValue}
                alt='Pasted'
                style={{ width: '80px', height: '80px', borderRadius: '5px' }}
              />
              <div className='icon-remove-div'>
                <HighlightOffIcon
                  fontSize='large'
                  onClick={handleRemoveImage}
                />
              </div>
            </div>
          )}
        </div>

        <TextField
          inputRef={textFieldRef}
          variant='outlined'
          placeholder='Type a message...'
          onChange={handleInputMessageChange}
          value={inputMessage}
          autoFocus
          multiline
          onPaste={handlePaste}
          onKeyPress={handleOnKeyPress}
          spellCheck={false}
        />
      </div>

      <AttachFileIcon handleOnClick={() => inputFileRef.current.click()} />
      <SendIcon className='icon-send' size='24' onClick={sendMessage} />
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
