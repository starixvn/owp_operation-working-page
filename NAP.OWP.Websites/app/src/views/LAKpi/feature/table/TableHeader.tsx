import React from 'react';
import { keyOfTotalGameInfo } from '../../TableConst.json';
import { uniqueId } from 'lodash';

const TableHeader = (props: { isGap: boolean }) => {
  const duplicatedList = props.isGap
    ? [...keyOfTotalGameInfo, ...keyOfTotalGameInfo]
    : keyOfTotalGameInfo;
  return (
    <>
      <tr>
        <th rowSpan={2}>#</th>
        <th rowSpan={2}>Username</th>
        {props.isGap ? (
          <>
            <th rowSpan={2}>Progress</th>
            <th rowSpan={2}>Target</th>
            <th colSpan={5}>The gap to win the target</th>
            <th colSpan={5}>Achieved matches</th>
            <th rowSpan={2}>Reward</th>
          </>
        ) : (
          <>
            <th colSpan={5}>Achieved matches</th>
          </>
        )}
      </tr>
      <tr>
        {duplicatedList.map(x => (
          <th key={uniqueId()}>{x.label}</th>
        ))}
      </tr>
    </>
  );
};

export default TableHeader;
