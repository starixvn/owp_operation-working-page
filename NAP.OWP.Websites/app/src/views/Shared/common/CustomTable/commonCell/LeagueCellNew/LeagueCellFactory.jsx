import PropTypes from 'prop-types';
import OtherIssueCell from './OtherIssueCell';
import LeagueCell from './LeagueCell';
import MatchCell from './MatchCell';
import LogWorkCell from './LogWorkCell';

const propTypes = {
  data: PropTypes.object.isRequired
};

const LeagueCellFactory = ({ data }) => {
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
      return <LeagueCell leagueName={owpLeagueName} isRead={isRead} />;
    case 2:
    case 5:
      return (
        <MatchCell
          homeName={homeName}
          leagueName={owpLeagueName}
          awayName={awayName}
          koTime={koTime}
          isRead={isRead}
        />
      );
    case 6:
      return <LogWorkCell data={data} />;
    default:
      return <OtherIssueCell subject={subject || ''} isRead={isRead} />;
  }
};

LeagueCellFactory.propTypes = propTypes;

export default LeagueCellFactory;
