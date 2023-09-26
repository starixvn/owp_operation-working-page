import React, { createRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TextField } from '@mui/material';
import AttachFileIcon from '../../../assets/svg-element/AttachFileIcon';
import { BODY } from '../const.json';
import useStore from '../app/store';

const Describe = () => {
  const { inputMessage, selectedFile, selectedImage } = useStore(
    state => state.feedBackInfo
  );
  const updateFeedbackInfo = useStore(state => state.updateFeedbackInfo);
  const inputFileRef = createRef<HTMLInputElement>();
  const [urlImageValue, setUrlImageValue] = useState<string>('');

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      updateFeedbackInfo('selectedFile', file);
    }
  };

  const handleInputMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFeedbackInfo('inputMessage', event.target.value);
  };

  const handlePaste = (event: ClipboardEvent) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const imageUrl = URL.createObjectURL(blob);
        setUrlImageValue(imageUrl);
        updateFeedbackInfo('selectedImage', blob);
        break;
      }
    }
  };

  const handleRemoveImage = () => {
    updateFeedbackInfo('selectedImage', null);
    setUrlImageValue('');
  };

  return (
    <div className='describe'>
      <div className='description'>
        <p className='title'>
          {BODY.DESCRIPTION}
          <span className='required'>*</span>
        </p>
      </div>
      <div className='chat-box'>
        <div>
          {urlImageValue && selectedImage && (
            <div className='input-image'>
              <img src={urlImageValue} alt='Pasted' />
              <div className='icon-remove-div'>
                <HighlightOffIcon
                  fontSize='large'
                  onClick={handleRemoveImage}
                />
              </div>
            </div>
          )}

          <TextField
            inputRef={inputFileRef}
            variant='outlined'
            placeholder='Type a message...'
            onChange={handleInputMessageChange}
            value={inputMessage}
            autoFocus
            multiline
            onPaste={handlePaste}
            maxRows={4}
            spellCheck={false}
          />
        </div>
        <AttachFileIcon
          handleOnClick={() =>
            inputFileRef?.current && inputFileRef.current.click()
          }
        />

        <input
          ref={inputFileRef}
          hidden
          type='file'
          onChange={handleFileInputChange}
        />
      </div>
      {selectedFile && (
        <div className='file-upload'>
          <p className='file-upload-attachment'>{selectedFile.name} </p>
          <span className='remove-file'>
            <HighlightOffIcon
              fontSize='medium'
              onClick={() => updateFeedbackInfo('selectedFile', null)}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default Describe;
