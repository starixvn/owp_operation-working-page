import { isEqual } from 'lodash';
import React from 'react';
import { SortState } from '../type/TableType.native';
import useStore from '../../app/store';
import { asc, desc } from '../../TableConst.json';

type SortHeaderProps = {
  columnKey: string;
  headerName: string;
  property: string;
};

const SortHeader = (props: SortHeaderProps) => {
  const { columnKey, headerName, property } = props;
  const sortDataSources = useStore(state => state.sortDataSources);
  const { columnKeySelected, orderType, propertySelected } = useStore(
    state => state.sortState
  );

  const handleOnClickOrder = () => {
    const orderSelection = buildOrderSelection(orderType, columnKeySelected);
    const sortState: SortState = {
      columnKeySelected: columnKey,
      orderType: orderSelection,
      propertySelected: property
    };
    sortDataSources(sortState);
  };

  const buildOrderSelection = (
    orderType: string,
    columnKeySelected: string
  ) => {
    if (
      isEqual(propertySelected, property) &&
      isEqual(columnKey, columnKeySelected)
    ) {
      return isEqual(orderType, asc) ? desc : asc;
    }
    return desc;
  };

  return (
    <div className='sort-header'>
      <span className='sort-header-name'>{headerName}</span>
      <span
        onClick={handleOnClickOrder}
        className={`sort-icon ${
          isEqual(propertySelected, property) &&
          isEqual(columnKeySelected, columnKey)
            ? orderType
            : ''
        }`}
      />
    </div>
  );
};
export default SortHeader;
