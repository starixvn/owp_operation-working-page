import React from 'react';
import { useAppSelector } from '../../app/hookNative';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import Loading from '../../../components/Loading';
import { TABLE_HEADER } from './TableSchema.json';

const Table = props => {
  const { dataSource, loading } = useAppSelector(state => state.events);

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }


  return <table id='scrollable-table'>
    <thead>
      <tr>
        {TABLE_HEADER.map((item, index) => {
          return (
            <th
              key={index}>
              <div className='header-table'>
                <span>{item.headerName}</span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
    <tbody>
      {dataSource.map((event, index) => <tr>

      </tr>)}
    </tbody>
  </table>;
};

export default Table;