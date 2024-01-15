import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../Shared/Utils';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MarginCell = props => {
  const { rowIndex, dataSource } = props;
  const { margin } = dataSource[rowIndex];

  return (
    <div
      className='margin-cell'
      style={{
        color: margin.color,
        textAlign: 'center'
      }}>
      {Utils.formatNumberWithCommas(margin.value)}
    </div>
  );
};

MarginCell.propTypes = propTypes;
export default MarginCell;
