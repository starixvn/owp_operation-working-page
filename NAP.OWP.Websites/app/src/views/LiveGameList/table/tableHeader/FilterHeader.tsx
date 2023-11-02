import React from 'react';
import {
  openFilterHeaderPopup,
  setColumnKeyValue
} from '../tableSlice/tableSlice';
import { useAppDispatch } from '../../app/hookNative';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/storeNative';
import { FilterIcon } from 'mdi-react';
import FilterPopup from './FilterPopup';
type FilterHeaderProps = {
  columnKey: string;
};

const FilterHeader = ({ columnKey }: FilterHeaderProps) => {
  const dispatch = useAppDispatch();

  const model = useSelector((state: RootState) => state.events);
  const { filterState } = model;

  const handleClickFilter = (value: string) => {
    dispatch(setColumnKeyValue(value));
    dispatch(openFilterHeaderPopup());
  };

  const checkIsFiltered = () =>
    filterState.some(x => {
      return x.columnKey === columnKey;
    });

  return (
    <div className='filter-header'>
      <span
        className={`icon-filter ${checkIsFiltered() ? 'is-filter' : ''}`}
        onClick={() => handleClickFilter(columnKey)}>
        <FilterIcon size={14} />
      </span>
      <FilterPopup columnKey={columnKey} />
    </div>
  );
};

export default FilterHeader;
