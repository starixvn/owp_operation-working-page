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
  const { division, round, etpk, teamRound } = dataSource[rowIndex];
  const ref = useRef(null);
  const checkShowToolTip = checkIsShow({ division, round, etpk });

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

  const renderTeamRound = () =>
    teamRound && (
      <span>
        <strong>Round (H-A/T): </strong>
        {teamRound}
      </span>
    );

  const renderEtPk = () =>
    etpk && (
      <span>
        <strong>ET_PK: </strong>
        {etpk}
      </span>
    );

  return (
    <>
      <div className='round-cell' ref={ref}>
        {renderDivision()}
        {renderRound()}
        {renderTeamRound()}
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
