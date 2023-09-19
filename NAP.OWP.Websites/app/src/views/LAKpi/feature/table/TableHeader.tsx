import React from 'react';
import { keyOfTotalGameInfo } from '../../TableConst.json';
import { uniqueId } from 'lodash';
import FilterIcon from 'mdi-react/FilterIcon';
type PropsTableHeader = {
  isGap: boolean;
  isActiveIconFilter: boolean;
  openFilterHeader: () => void;
};

const TableHeader = (props: PropsTableHeader) => {
  const duplicatedList = props.isGap
    ? [...keyOfTotalGameInfo, ...keyOfTotalGameInfo]
    : keyOfTotalGameInfo;

  return (
    <>
      <tr>
        <th rowSpan={2}>#</th>
        <th rowSpan={2}>
          <span>Username</span>
          <span
            className={`icon-filter ${
              props.isActiveIconFilter ? 'active' : ''
            }`}
            onClick={props.openFilterHeader}>
            <FilterIcon size={14} />
          </span>
        </th>
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
