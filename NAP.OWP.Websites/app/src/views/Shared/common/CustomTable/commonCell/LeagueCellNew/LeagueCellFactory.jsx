import React from 'react';
import PropTypes from 'prop-types';
import OtherIssueCell from './OtherIssueCell';
import LeagueCell from './LeagueCell';
import MatchCell from './MatchCell';

const propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

const LeagueCellFactory = ({ data, onClick }) => {
  const {
    homeName,
    owpLeagueName,
    awayName,
    koTime,
    subject,
    isRead,
    eventType
  } = data;

  switch (eventType) {
    case 1:
      return (
        <LeagueCell
          leagueName={owpLeagueName}
          isRead={isRead}
          onClick={onClick}
        />
      );
    case 2:
    case 5:
      return (
        <MatchCell
          homeName={homeName}
          leagueName={owpLeagueName}
          awayName={awayName}
          koTime={koTime}
          isRead={isRead}
          onClick={onClick}
        />
      );
    default:
      return (
        <OtherIssueCell
          subject={subject || ''}
          isRead={isRead}
          onClick={onClick}
        />
      );
  }
};

LeagueCellFactory.propTypes = propTypes;

export default LeagueCellFactory;
