import React from 'react';
import PropTypes from 'prop-types';
import MessageContents from './MessageContentNative';
import useStableDispatch from '../../customHook/useStableDispatch';
import { UncontrolledTooltip } from 'reactstrap';
import { ContentSaveOutlineIcon } from 'mdi-react';
import { URL } from '../const/index.json';
import { saveMessage } from '../chatBoardThunkNative';
import { setModelQuoteMessage } from '../../chatBoardNew/chatBoardSlice';
import { useSelector } from 'react-redux';
import ToastrWrapper from '../../../components/ToastrWrapper';
import ReplyIcon from '../../../../assets/svg-element/ReplyIcon';

const url =
  process.env.NODE_ENV === 'development'
    ? `${URL.NET_Core_TICKET_CENTER}/${URL.UPDATE_SAVE_MESSAGE}`
    : `${window.netCoreRootUrl}/${URL.NET_FW_TICKET_CENTER}/${URL.UPDATE_SAVE_MESSAGE}`;

const propTypes = {
  data: PropTypes.object.isRequired,
  policy: PropTypes.string.isRequired,
  ticketId: PropTypes.number,
  isMyMessage: PropTypes.bool
};

const MessageCell = ({ data, policy = 'policy', ticketId, isMyMessage }) => {
  const {
    createdDate,
    message,
    username,
    fileId,
    messageId,
    isSaved,
    quoteMessage,
    quoteUsername,
    quoteCreatedDate,
    imageContent
  } = data;
  const dispatch = useStableDispatch();
  const { permission } = useSelector(state => state[policy]);
  const { HasWrite } = permission;
  const { getCreatedTime, getMessageContent } = MessageContents({
    createdDate,
    fileId,
    messageContent: message,
    quoteMessage,
    quoteUsername,
    quoteCreatedDate,
    imageContent
  });

  const handleSaveMessages = async value => {
    const model = {
      url,
      messageId,
      isSaved: value,
      ticketId,
      actorId: permission.ActorId
    };
    const actionResult = dispatch(saveMessage(model));
    if (saveMessage.rejected.match(actionResult)) {
      ToastrWrapper.showError(actionResult.payload);
    }
  };

  const handleClickQuoteIcon = () => {
    const model = {
      messageId,
      message,
      createdDate,
      username
    };

    dispatch(setModelQuoteMessage(model));
  };

  const renderSaveIcon = () =>
    HasWrite && (
      <span className='icon-hover-wrapper'>
        <span className='icon-save-message'>
          <ContentSaveOutlineIcon
            onClick={() => handleSaveMessages(true)}
            id={`name${messageId}`}
          />
        </span>
        <span className='icon-reply-message'>
          {!fileId && (
            <ReplyIcon handleOnClick={() => handleClickQuoteIcon()} />
          )}
        </span>
        <UncontrolledTooltip placement='top' target={`name${messageId}`}>
          Click to save your message or it is deleted after 30 days
        </UncontrolledTooltip>
      </span>
    );
  const renderUnSaveIcon = () =>
    HasWrite && (
      <span className='icon-hover-wrapper-unsave'>
        <span className='icon-save-message unsave-message'>
          <span className='text-saved'> Saved </span>
          <span className='icon-unsave-message'>
            <ContentSaveOutlineIcon onClick={() => handleSaveMessages(false)} />
          </span>
        </span>
        <span className='icon-reply-message'>
          {!fileId && (
            <ReplyIcon handleOnClick={() => handleClickQuoteIcon()} />
          )}
        </span>
      </span>
    );

  if (message) {
    return (
      <>
        <div className='info-user'>
          <div className='name-user'>
            {!isMyMessage && <>{username},</>} {getCreatedTime()}
          </div>
        </div>
        <div className='message-group' style={{ whiteSpace: 'pre-wrap' }}>
          {isSaved ? renderUnSaveIcon() : renderSaveIcon()}
          {getMessageContent()}
        </div>
      </>
    );
  }
  return <div>No comments</div>;
};
MessageCell.propTypes = propTypes;
export default MessageCell;
