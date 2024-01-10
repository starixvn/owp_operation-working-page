import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const TurnOverCell = props => {
  const { rowIndex, dataSource } = props;
  const { turnover } = dataSource[rowIndex];

  return (
    <div
      className='margin-cell'
      style={{
        color: turnover.color
      }}>
      {turnover.value}
    </div>
  );
};

TurnOverCell.propTypes = propTypes;
export default TurnOverCell;
