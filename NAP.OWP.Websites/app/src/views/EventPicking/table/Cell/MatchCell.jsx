import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MatchCell = props => {
  const { rowIndex, dataSource } = props;
  const { homeName, awayName } = dataSource[rowIndex];
  const ref = useRef(null);
  return (
    <>
      <div className='match-cell' ref={ref}>
        <div className='home'>{homeName}</div>
        <div className='away'>{awayName}</div>
      </div>
      <UncontrolledTooltip
        className='tooltip-match'
        placement='top-start'
        target={ref}>
        {homeName} vs {awayName}
      </UncontrolledTooltip>
    </>
  );
};

MatchCell.propTypes = propTypes;
export default MatchCell;
