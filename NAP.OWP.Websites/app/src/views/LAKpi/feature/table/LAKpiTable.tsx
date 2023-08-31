import React, { useLayoutEffect, useRef, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import useStore from '../../app/store';
import Loading from '../../../components/Loading';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import { headerHeight } from '../../TableConst.json';

const LAKpiTable = () => {
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - headerHeight);
  const { loadingStatus, entities } = useStore(state => state.dataTable);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleResizeBrowser = () => {
    const { innerHeight } = window;
    setMaxHeight(innerHeight - headerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResizeBrowser);
    return () => window.removeEventListener('resize', handleResizeBrowser);
  }, []);

  if (isEquals(loadingStatus, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  return (
    <div ref={tableRef} style={{ maxHeight }} className='table-content'>
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
