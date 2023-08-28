import React from 'react';
import { TCondition } from '../type/TableType.native';
import ConditionColumn from './ConditionColumn';
import { uniqueId } from 'lodash';

const TableConditionConfig = () => {
  const fakeData: TCondition[] = [
    {
      level: 'New',
      conditionFirst: {
        totalVirtualMultipleMatches: 2050,
        virtualMatches: 0,
        multipleMatches: 0,
        specialProducts: 0,
        fiveMajorLeagues: 0,
        multipleProducts: 0
      },
      conditionSecond: {
        totalVirtualMultipleMatches: 0,
        virtualMatches: 0,
        multipleMatches: 0,
        specialProducts: 0,
        fiveMajorLeagues: 0,
        multipleProducts: 0
      },
      timeRange: 'Last 1 year',
      reward: '5%'
    },
    {
      level: 'D',
      conditionFirst: {
        totalVirtualMultipleMatches: 0,
        virtualMatches: 3600,
        multipleMatches: 500,
        specialProducts: 0,
        fiveMajorLeagues: 0,
        multipleProducts: 0
      },
      conditionSecond: {
        totalVirtualMultipleMatches: 0,
        virtualMatches: 3200,
        multipleMatches: 800,
        specialProducts: 0,
        fiveMajorLeagues: 0,
        multipleProducts: 0
      },
      timeRange: 'Last 2 year',
      reward: '10%'
    }
  ];
  return (
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>Condition</th>
          <th>Time range</th>
          <th>Reward</th>
        </tr>
      </thead>
      <tbody>
        {fakeData.map((x, index) => (
          <tr key={uniqueId()}>
            <td>{x.level}</td>
            {index === 0 ? (
              <td>
                <span>Virtual Matches + Multiple Matches</span>
                <span>{`>=`}</span>
                <span>{x.conditionFirst.totalVirtualMultipleMatches}</span>
              </td>
            ) : (
              <ConditionColumn
                conditionFirst={x.conditionFirst}
                conditionSecond={x.conditionSecond}
              />
            )}
            <td>{x.timeRange}</td>
            <td>{x.reward}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableConditionConfig;
