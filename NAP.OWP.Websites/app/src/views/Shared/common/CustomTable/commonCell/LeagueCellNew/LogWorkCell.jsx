import React from 'react';
import OtherIssueCell from './OtherIssueCell';
import MatchCell from './MatchCell';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.object.isRequired
};

const LogWorkCell = ({ data }) => {
  const { homeName, leagueName, awayName, koTime, subject, isRead } = data;

  return leagueName ? (
    <MatchCell
      homeName={homeName}
      leagueName={leagueName}
      awayName={awayName}
      koTime={koTime}
      isRead={isRead}
    />
  ) : (
    <OtherIssueCell subject={subject || ''} isRead={isRead} />
  );
};

LogWorkCell.propTypes = propTypes;
export default LogWorkCell;
