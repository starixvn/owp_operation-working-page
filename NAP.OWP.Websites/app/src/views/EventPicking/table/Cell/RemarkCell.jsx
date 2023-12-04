import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const RemarkCell = props => {
  const { rowIndex, dataSource } = props;
  const { lstNote, remark, homeRemark, awayRemark } = dataSource[rowIndex];

  const renderLstNote = () =>
    lstNote && (
      <span>
        <strong>LST Note: </strong>
        {lstNote}
      </span>
    );

  const renderRemark = () =>
    remark && (
      <span>
        <strong>Remark: </strong>
        {remark}
      </span>
    );

  const renderHomeRemark = () =>
    homeRemark && (
      <span>
        <strong>Home Remark: </strong>
        {homeRemark}
      </span>
    );

  const renderAwayRemark = () =>
    awayRemark && (
      <span>
        <strong>Away Remark: </strong>
        {awayRemark}
      </span>
    );

  return (
    <>
      <div className='remark-cell'>
        {renderLstNote()}
        {renderRemark()}
        {renderHomeRemark()}
        {renderAwayRemark()}
      </div>
    </>
  );
};

RemarkCell.propTypes = propTypes;
export default RemarkCell;
