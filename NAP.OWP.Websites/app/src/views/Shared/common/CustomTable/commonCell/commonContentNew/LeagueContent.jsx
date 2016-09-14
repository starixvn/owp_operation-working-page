import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  leagueName: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

const LeagueContent = props => {
  const { leagueName, onClick } = props;
  return (
    <span
      className='league-Name ticket-title-link'
      role='link'
      onClick={onClick}>
      {leagueName}
    </span>
  );
};
LeagueContent.propTypes = propTypes;

export default LeagueContent;
