import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  subject: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

const OtherIssueContent = props => {
  const { subject, onClick } = props;
  return (
    <span
      className='new-add-league-name ticket-title-link'
      role='link'
      onClick={onClick}>
      {subject}
    </span>
  );
};
OtherIssueContent.propTypes = propTypes;

export default OtherIssueContent;
