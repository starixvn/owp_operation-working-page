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
  const { lstNote, remark, remark2, homeRemark, awayRemark } = dataSource[
    rowIndex
  ];
  const ref = useRef(null);
  const checkShowToolTip = checkIsShow({
    lstNote,
    remark,
    remark2,
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

  const renderRemark2 = () =>
    remark2 && (
      <span>
        <strong>Remark 2: </strong>
        {remark2}
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
        {renderRemark2()}
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
          {renderRemark2()}
          {renderHomeRemark()}
          {renderAwayRemark()}
        </UncontrolledTooltip>
      )}
    </>
  );
};

RemarkCell.propTypes = propTypes;
export default RemarkCell;
