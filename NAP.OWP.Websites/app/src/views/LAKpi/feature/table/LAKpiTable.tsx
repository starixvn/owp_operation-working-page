import React, { useLayoutEffect, useRef, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import useStore from '../../app/store';
import Loading from '../../../components/Loading';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import { headerHeight } from '../../TableConst.json';
import { CloseIcon } from 'mdi-react';
import { Button } from 'reactstrap';
import { DataSource } from '../type/TableType.native';

const LAKpiTable = () => {
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - headerHeight);
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveIconFilter, setIsActiveIconFilter] = useState(false);
  const [value, setValue] = useState('');
  const { loadingStatus, entities, isGap, dataSourcesFiltered } = useStore(
    state => state.dataTable
  );
  const setDataSourcesFiltered = useStore(
    state => state.setDataSourcesFiltered
  );
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

  const openFilterHeader = () => setIsOpen(true);

  const handleOnSearchFilter = () => {
    setIsActiveIconFilter(true);
    setIsOpen(false);
    const dataFiltered = dataSourcesFiltered.filter((x: DataSource) =>
      x.userName.includes(value)
    );
    setDataSourcesFiltered(dataFiltered);
  };

  const handleClearAllFilter = () => {
    setValue('');
    setIsActiveIconFilter(false);
    setDataSourcesFiltered(entities);
  };

  return (
    <div ref={tableRef} style={{ maxHeight }} className='table-content'>
      {isOpen && (
        <div className='filter-popup filter-popup is-show'>
          <span className='close-popup' onClick={() => setIsOpen(false)}>
            <CloseIcon size={14} />
          </span>
          <input
            className='input-field'
            placeholder='Search'
            value={value}
            autoFocus
            onChange={e => setValue(e.target.value)}
          />
          <span className='clear-all' onClick={handleClearAllFilter}>
            Clear All
          </span>
          <Button
            className='btn-search'
            disabled={!value}
            onClick={handleOnSearchFilter}>
            Search
          </Button>
        </div>
      )}
      <table>
        <thead>
          <TableHeader
            isGap={isGap}
            isActiveIconFilter={isActiveIconFilter}
            openFilterHeader={openFilterHeader}
          />
        </thead>
        <tbody>
          <TableBody dataSource={dataSourcesFiltered} isGap={isGap} />
        </tbody>
      </table>
    </div>
  );
};

export default LAKpiTable;
