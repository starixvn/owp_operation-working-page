import React, { useEffect, useRef, useState } from 'react';
import {
  openFilterHeaderPopup,
  closedFilterHeaderPopup,
  setFilterHeaderValue,
  setColumnKeyValue
} from '../tableSlice/tableSlice';
import { useAppDispatch } from '../../app/hookNative';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/storeNative';
import { CloseIcon, FilterIcon } from 'mdi-react';
import { Button } from 'reactstrap';
import { isEqual, uniqueId } from 'lodash';
import FilterPopup from './FilterPopup';
type FilterHeaderProps = {
  columnKey: string;
};

const FilterHeader = ({ columnKey }: FilterHeaderProps) => {
  const dispatch = useAppDispatch();

  const model = useSelector((state: RootState) => state.events);
  const { columnKeyFilter } = model;

  const handleClickFilter = (value: string) => {
    dispatch(setColumnKeyValue(value));
    dispatch(openFilterHeaderPopup());
  };

  return (
    <div className='filter-header'>
      <span
        className={`icon-filter ${
          isEqual(columnKey, columnKeyFilter) ? 'is-filter' : ''
        }`}
        onClick={() => handleClickFilter(columnKey)}>
        <FilterIcon size={14} />
      </span>
      <FilterPopup columnKey={columnKey} />
    </div>
  );
};

export default FilterHeader;
