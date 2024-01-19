import React from 'react';
import { TCellModel } from '../../type/type';
import { v4 as uuidv4 } from 'uuid';

const RemarkCell = (props: TCellModel) => {
  const { dataSource, rowIndex } = props;
  const { round, division, teamRound, remark } = dataSource[rowIndex];
  const arrayCombine = [];
  remark &&
    arrayCombine.push(<p className='remark-note'>{remark}</p>);
  round &&
    arrayCombine.push(
      <p className='round-note'>
        <b>Round:</b>
        {round}
      </p>
    );
  teamRound &&
    arrayCombine.push(
      <p className='team-round-note'>
        <b>Round (H-A/T):</b>
        {teamRound}
      </p>
    );
  division &&
    arrayCombine.push(
      <p className='division-note'>
        <b>Division:</b>
        {division}
      </p>
    );
  if (!arrayCombine.length) {
    return null;
  }
  return (
    <div className='remark-col'>
      {arrayCombine.map(v => (
        <React.Fragment key={uuidv4()}>{v}</React.Fragment>
      ))}
    </div>
  );
};

export default RemarkCell;