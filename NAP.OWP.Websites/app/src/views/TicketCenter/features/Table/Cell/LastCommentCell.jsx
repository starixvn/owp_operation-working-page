import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import MessageContentsNative from '../../../../Shared/common/CustomTable/commonCell/commonContentNew/MessageContentsNative';
import { URL } from '../../../../Shared/chatBoardNew/const/index.json';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const LastCommentCell = props => {
  const { dataSource, rowIndex } = props;
  const { messages, isRead } = dataSource[rowIndex];
  const buildComment = () => {
    return messages.map((mes, index) => {
      const { getCreatedTime, getMessageContent } = MessageContentsNative({
        ...mes,
        className: 'is-file',
        URL_DOWNLOAD_FILE: URL.DOWNLOAD_FILE
      });

      return (
        <label
          key={index}
          id={`CreatedDate${rowIndex}`}
          className='header-LastComment'>
          <span className='comment-name'>{mes.username}: </span>
          <span className='comment-time'>{getCreatedTime()}</span>
          <span className='comment-message'> {getMessageContent()}</span>
        </label>
      );
    });
  };

  return (
    <Cell
      className={
        !isRead ? 'has-unread last-comment-cell' : 'cell last-comment-cell'
      }>
      {messages.length > 0 ? (
        buildComment()
      ) : (
        <div className='no-comments'>No comments</div>
      )}
    </Cell>
  );
};

LastCommentCell.propTypes = propTypes;
export default LastCommentCell;
