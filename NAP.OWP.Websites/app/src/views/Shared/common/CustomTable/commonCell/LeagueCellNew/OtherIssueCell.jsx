import React from 'react';
import { Cell } from 'fixed-data-table-2';
import OtherIssueContent from '../commonContentNew/OtherIssueContent';
import PropTypes from 'prop-types';

const propTypes = {
  subject: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

const OtherIssueCell = ({ subject = '', isRead = false, onClick = f => f }) => {
  return (
    <Cell
      className={
        !isRead
          ? 'new-add-info-cell has-unread conversation-cell'
          : 'new-add-info-cell cell conversation-cell'
      }>
      <OtherIssueContent subject={subject} onClick={onClick} />
    </Cell>
  );
};

OtherIssueCell.propTypes = propTypes;
export default OtherIssueCell;
