import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { DataSource } from '../type/TableType.native';
import InfoIcon from '../../../../assets/svg-element/InfoIcon';

const LAKpiTable = () => {
  const dataSource: DataSource[] = [
    {
      userName: 'sa',
      progress: 'Level B',
      target: 'Level A',
      gapWithTarget: {
        virtualMatches: 414,
        multipleMatches: 513565,
        specialProducts: 1345,
        fiveMajorLeagues: 155551,
        multipleProducts: 124
      },
      achievedGames: {
        virtualMatches: 414,
        multipleMatches: 513565,
        specialProducts: 1345,
        fiveMajorLeagues: 155551,
        multipleProducts: 124
      },
      reward: 5
    },
    {
      userName: 'starix1',
      progress: 'Level C',
      target: 'Level B',
      gapWithTarget: {
        virtualMatches: 414,
        multipleMatches: 513565,
        specialProducts: 1345,
        fiveMajorLeagues: 155551,
        multipleProducts: 124
      },
      achievedGames: {
        virtualMatches: 414,
        multipleMatches: 513565,
        specialProducts: 1345,
        fiveMajorLeagues: 155551,
        multipleProducts: 124
      },
      reward: 5
    }
  ];

  return (
    <div className='table-content'>
      <InfoIcon />
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          <TableBody dataSource={dataSource} />
        </tbody>
      </table>
    </div>
  );
};

export default LAKpiTable;
