import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const TurnOverCell = props => {
  const { rowIndex, dataSource } = props;
  const { turnOver } = dataSource[rowIndex];

  return <div className='turn-over-cell'>{turnOver}</div>;
};

TurnOverCell.propTypes = propTypes;
export default TurnOverCell;
