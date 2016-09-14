import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../Shared/Utils';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const KoTimeCell = props => {
  const { rowIndex, dataSource } = props;
  const { eventDateTime } = dataSource[rowIndex];
  return (
    <div className='ko-time-cell'>
      <span>{Utils.formatDateTimeString(new Date(eventDateTime))}</span>
    </div>
  );
};

KoTimeCell.propTypes = propTypes;
export default KoTimeCell;
