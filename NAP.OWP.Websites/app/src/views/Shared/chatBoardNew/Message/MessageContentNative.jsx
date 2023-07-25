import React from 'react';
import Linkify from 'react-linkify';
import { formatTime } from '../../DateTime/dateTimeHelper';
import { isImage } from '../helper/chatBoardHelper';
import { URL } from '../const/index.json';
import {
  NET_CORE_FILE_UPLOAD,
  NET_FW_FILE_UPLOAD
} from '../../../Shared/Constants';

const MessageContents = ({
  createdDate = '',
  fileId = '',
  messageContent = ''
}) => {
  const getCreatedTime = () => formatTime(createdDate, 'minute', 'hh:mm A');

  const handleOnClick = () => {
    const basicUrl =
      process.env.NODE_ENV === 'development'
        ? `${NET_CORE_FILE_UPLOAD}/${URL.DOWNLOAD_FILE}`
        : `${window.netCoreRootUrl}/${NET_FW_FILE_UPLOAD}/${URL.DOWNLOAD_FILE}`;

    const url = `${basicUrl}?fileId=${fileId}`;

    if (isImage(messageContent)) {
      window.open(url);
    } else {
      window.location.href = url;
    }
  };

  const getMessageContent = () => {
    return (
      <>
        {!fileId && (
          <p className='message-div'>
            <Linkify
              properties={{ target: '_blank' }}
              className='message-content'>
              {messageContent}
            </Linkify>
          </p>
        )}
        {fileId && (
          <p className='message-div'>
            <span className='is-file' onClick={handleOnClick}>
              {messageContent}
            </span>
          </p>
        )}
      </>
    );
  };

  return { getCreatedTime, getMessageContent };
};
export default MessageContents;
