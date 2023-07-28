import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { checkIsShow } from '../../helper/checkShowToolTipHelper';
import { UncontrolledTooltip } from 'reactstrap';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const RemarkCell = props => {
  const { rowIndex, dataSource } = props;
  const { lstNote, remark, homeRemark, awayRemark } = dataSource[rowIndex];
  const ref = useRef(null);
  const checkShowToolTip = checkIsShow({
    lstNote,
    remark,
    homeRemark,
    awayRemark
  });

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
      <div className='remark-cell' ref={ref}>
        {renderLstNote()}
        {renderRemark()}
        {renderHomeRemark()}
        {renderAwayRemark()}
      </div>
      {checkShowToolTip && (
        <UncontrolledTooltip
          className='tooltip-content'
          placement='top-start'
          target={ref}>
          {renderLstNote()}
          {renderRemark()}
          {renderHomeRemark()}
          {renderAwayRemark()}
        </UncontrolledTooltip>
      )}
    </>
  );
};

RemarkCell.propTypes = propTypes;
export default RemarkCell;
