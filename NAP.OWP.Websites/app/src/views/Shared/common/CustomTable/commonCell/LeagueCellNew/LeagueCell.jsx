import React from 'react';
import { Cell } from 'fixed-data-table-2';
import { nanoid } from '@reduxjs/toolkit';
import LeagueContent from '../commonContentNew/LeagueContent';
import PropTypes from 'prop-types';

const propTypes = {
  leagueName: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

const LeagueCell = ({ leagueName = '', isRead = false, onClick = f => f }) => {
  return (
    <Cell
      key={nanoid()}
      className={`league-info-cell conversation-cell ${
        !isRead ? 'has-unread' : 'cell'
      }`}>
      <LeagueContent
        leagueName={leagueName}
        onClick={onClick}
        className='conversation-cell'
      />
    </Cell>
  );
};

LeagueCell.propTypes = propTypes;

export default LeagueCell;
