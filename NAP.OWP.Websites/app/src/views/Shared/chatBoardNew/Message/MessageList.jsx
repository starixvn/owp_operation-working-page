import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { REQUEST_STATUS } from '../../Constants';
import MessageCell from './MessageCell';
import Loading from '../../../components/Loading';
import { isEquals } from 'immutability-helper';
import useStableDispatch from '../../customHook/useStableDispatch';
import { loadMoreMessageThunk } from '../chatBoardThunkNative';

const MessageList = ({ policy = 'policy', ticketId }) => {
  const listRef = useRef();
  const lastMessageIdRef = useRef(0);
  const previousScrollDiff = useRef(0);
  const dispatch = useStableDispatch();
  const {
    loading,
    ticketDetail: { messages, canShowMoreMessage }
  } = useSelector(state => state.chatBoard);
  const { permission } = useSelector(state => state[policy]);

  useLayoutEffect(() => {
    if (messages?.length) {
      const lastPosition = messages.length - 1;
      const lastMessageId = messages[lastPosition].messageId;

      if (!isEquals(lastMessageIdRef.current, lastMessageId)) {
        previousScrollDiff.current = 0;
        lastMessageIdRef.current = lastMessageId;
      }

      if (listRef.current) {
        listRef.current.scrollTop =
          listRef.current?.scrollHeight - previousScrollDiff.current;
      }
    }
  }, [messages]);

  if (isEqual(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  const renderMessageRow = (message, index) => {
    const key = `${ticketId}-${index}`;
    const className = isEquals(message.userId, permission.ActorId)
      ? 'message-row my-message'
      : 'message-row';

    return (
      <li key={key} className={className}>
        <MessageCell
          policy={policy}
          index={index}
          data={message}
          ticketId={ticketId}
        />
      </li>
    );
  };

  const handleLoadMoreMessage = () => {
    dispatch(
      loadMoreMessageThunk({
        msgOfPage: 20,
        ticketId,
        firstMsgId: messages[0]?.messageId
      })
    );
  };

  const handleScroll = () => {
    previousScrollDiff.current =
      listRef.current.scrollHeight - listRef.current.scrollTop;
  };

  return (
    <>
      <div className='message-list ' ref={listRef} onScroll={handleScroll}>
        {canShowMoreMessage && (
          <a className='load-more' onClick={handleLoadMoreMessage}>
            Load more
          </a>
        )}
        <ul>
          {messages.map((message, index) => renderMessageRow(message, index))}
        </ul>
      </div>
    </>
  );
};

MessageList.propTypes = {
  policy: PropTypes.string,
  ticketId: PropTypes.number
};
export default MessageList;
