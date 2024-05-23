import { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { validExtension } from '../const/index.json';
import { setMessage, setModelQuoteMessage, setIsBlinkTitle } from '../chatBoardSlice';
import useStableDispatch from '../../customHook/useStableDispatch';
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TextField } from '@mui/material';
import AttachFileIcon from '../../../../assets/svg-element/AttachFileIcon';
import QuoteIcon from '../../../../assets/svg-element/QuoteIcon';
import { formatTime } from '../../DateTime/dateTimeHelper';

const InputMessage = ({ handleSendFile, handleSendMessage }) => {
  const dispatch = useStableDispatch();
  const inputFileRef = createRef();
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const { inputMessage, modelQuoteMessage, isBlinkTitle } = useSelector(
    state => state.chatBoard
  );
  const { message, messageId, username, createdDate } = modelQuoteMessage;
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
    if (textFieldValue && selectedImage) {
      setTextFieldValue('');
      await handleSendFile(event, selectedImage);
      setSelectedImage(null);
    }
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

  const handleRemoveQuoteMessage = () => {
    dispatch(setModelQuoteMessage({}));
  };

  const handleOnfocus = () => {
    isBlinkTitle && dispatch(setIsBlinkTitle(false));
  };
  return (
    <div className='chat-box'>
      <div>
        {textFieldValue && (
          <div className='input-image'>
            <img src={textFieldValue} alt='Pasted' />
            <div className='icon-remove-div'>
              <HighlightOffIcon fontSize='large' onClick={handleRemoveImage} />
            </div>
          </div>
        )}
        {messageId && (
          <div className='quote-text-box'>
              <div className='icon-wrapper'>
                <div className='icon-quote'>
                  <QuoteIcon />
                </div>
                <div className='icon-remove'>
                  <HighlightOffIcon
                    fontSize='large'
                    onClick={handleRemoveQuoteMessage}
                  />
                </div>
              </div>
              <span className='quote-message-text-box'>{message}</span>
              <span className='quote-info-text-box'>
                {username},{' '}
                {formatTime(createdDate, 'minute', 'DD MMM YYYY hh:mm A')}
              </span>
          </div>
        )}

        <TextField
          inputRef={textFieldRef => textFieldRef?.focus()}
          variant='outlined'
          placeholder='Type a message...'
          onChange={handleInputMessageChange}
          value={inputMessage}
          autoFocus
          multiline
          onFocus={handleOnfocus}
          onPaste={handlePaste}
          maxRows={4}
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
