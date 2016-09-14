import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { checkIsShow } from '../../helper/checkShowToolTipHelper';
import { UncontrolledTooltip } from 'reactstrap';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const RoundCell = props => {
  const { rowIndex, dataSource } = props;
  const { division, round, eTPK } = dataSource[rowIndex];
  const ref = useRef(null);
  const checkShowToolTip = checkIsShow({ division, round, eTPK });

  const renderDivision = () =>
    division && (
      <span>
        <strong>Division: </strong>
        {division}
      </span>
    );

  const renderRound = () =>
    round && (
      <span>
        <strong>Round: </strong>
        {round}
      </span>
    );

  const renderEtPk = () =>
    eTPK && (
      <span>
        <strong>ET_PK: </strong>
        {eTPK}
      </span>
    );

  return (
    <>
      <div className='round-cell' ref={ref}>
        {renderDivision()}
        {renderRound()}
        {renderEtPk()}
      </div>
      {checkShowToolTip && (
        <UncontrolledTooltip
          className='tooltip-content'
          placement='top-start'
          target={ref}>
          {renderDivision()}
          {renderRound()}
          {renderEtPk()}
        </UncontrolledTooltip>
      )}
    </>
  );
};

RoundCell.propTypes = propTypes;
export default RoundCell;
