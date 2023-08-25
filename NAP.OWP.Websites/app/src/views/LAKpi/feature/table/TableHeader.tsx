import React, { Fragment } from 'react';
import { keyOfTotalGameInfo } from './TableConst.json';
import { uniqueId } from 'lodash';

const TableHeader = () => {
  const duplicatedList = [...keyOfTotalGameInfo, ...keyOfTotalGameInfo];
  return (
    <>
      <tr>
        <th rowSpan={2}>#</th>
        <th rowSpan={2}>UserName</th>
        <th rowSpan={2}>Progress</th>
        <th rowSpan={2}>Target</th>
        <th colSpan={5}>The gap to win the target</th>
        <th colSpan={5}>Achieved matches</th>
        <th rowSpan={2}>Reward</th>
      </tr>
      <tr>
        {duplicatedList.map(x => (
          <Fragment key={uniqueId()}>
            <th>{x.label}</th>
          </Fragment>
        ))}
      </tr>
    </>
  );
};

export default TableHeader;
