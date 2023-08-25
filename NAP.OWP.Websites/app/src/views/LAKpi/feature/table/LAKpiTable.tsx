import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { DataSource } from '../type/TableType.native';

const LAKpiTable = () => {
  const dataSource: DataSource[] = [
    {
      userName: 'sa',
      progress: 'Level B',
      target: 'Level A',
      virtualMatchesGap: 414,
      multipleMatchesGap: 513565,
      specialProductsGap: 1345,
      majorLeaguesGap: 155551,
      multipleProductGap: 124,
      virtualMatchesAchieved: 1234,
      multipleMatchesAchieved: 1234,
      specialProductsAchieved: 1234,
      majorLeaguesAchieved: 1234,
      multipleProductAchieved: 1234,
      reward: 5
    },
    {
      userName: 'starix1',
      progress: 'Level C',
      target: 'Level B',
      virtualMatchesGap: 1234,
      multipleMatchesGap: 1234,
      specialProductsGap: 1234,
      majorLeaguesGap: 1234,
      multipleProductGap: 1234,
      virtualMatchesAchieved: 1234,
      multipleMatchesAchieved: 1234,
      specialProductsAchieved: 1234,
      majorLeaguesAchieved: 1234,
      multipleProductAchieved: 1234,
      reward: 5
    }
  ];

  return (
    <div className='table-content'>
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
