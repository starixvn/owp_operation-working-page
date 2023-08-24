import React from 'react';

const TableHeader = () => {
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
        <th>Virtual Matches</th>
        <th>Multiple Matches</th>
        <th>Special Products</th>
        <th>Major Leagues</th>
        <th>Multiple Products</th>
        <th>Virtual Matches</th>
        <th>Multiple Matches</th>
        <th>Special Products</th>
        <th>Major Leagues</th>
        <th>Multiple Products</th>
      </tr>
    </>
  );
};

export default TableHeader;
