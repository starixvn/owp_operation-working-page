import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import useStore from '../../app/store';
import InfoIcon from '../../../../assets/svg-element/InfoIcon';
import Loading from '../../../components/Loading';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../../Shared/Constants';

const LAKpiTable = () => {
  const { loadingStatus, entities } = useStore(state => state.dataTable);

  if (isEquals(loadingStatus, REQUEST_STATUS.pending)) {
    return <Loading />;
        specialProducts: 1345,
        fiveMajorLeagues: 155551,
        multipleProducts: 124
      },
        specialProducts: 1345,
        fiveMajorLeagues: 155551,
        multipleProducts: 124
      },
  }

  return (
    <div className='table-content'>
      <InfoIcon />
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          <TableBody dataSource={entities} />
        </tbody>
      </table>
    </div>
  );
};

export default LAKpiTable;
