import React from 'react';
import OtherIssueCell from './OtherIssueCell';
import MatchCell from './MatchCell';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

const LogWorkCell = ({ data, onClick }) => {
  const { homeName, leagueName, awayName, koTime, subject, isRead } = data;

  return leagueName ? (
    <MatchCell
      homeName={homeName}
      leagueName={leagueName}
      awayName={awayName}
      koTime={koTime}
      isRead={isRead}
      onClick={onClick}
    />
  ) : (
    <OtherIssueCell subject={subject || ''} isRead={isRead} onClick={onClick} />
  );
};

LogWorkCell.propTypes = propTypes;
export default LogWorkCell;
