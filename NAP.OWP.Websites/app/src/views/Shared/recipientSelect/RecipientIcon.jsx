import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SectionIcon from './SectionIcon';
import PropTypes from 'prop-types';

export const RecipientIcon = ({ type = 1 }) => {
  const icon = new Map();
  icon.set(1, <PersonIcon />);
  icon.set(2, <GroupIcon />);
  icon.set(3, <SectionIcon />);
  return <>{icon.get(type)}</>;
};

RecipientIcon.propTypes = {
  type: PropTypes.number
};
