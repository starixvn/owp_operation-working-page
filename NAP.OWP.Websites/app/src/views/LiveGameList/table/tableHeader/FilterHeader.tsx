import React, { useEffect, useRef } from 'react';
import {
  closedFilterHeaderPopup,
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
  const filterRef = useRef<HTMLDivElement>(null);
  const model = useSelector((state: RootState) => state.events);
  const { filterState, isShowFilterHeader } = model;

  const handleClickFilter = (value: string) => {
    dispatch(setColumnKeyValue(value));
    dispatch(openFilterHeaderPopup());
  };

  const checkIsFiltered = () =>
    filterState.some(x => {
      return x.columnKey === columnKey;
    });

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        closedFilterHeaderPopup();
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [filterRef]);

  return (
    <div className='filter-header'>
      <span
        className={`icon-filter ${checkIsFiltered() ? 'is-filter' : ''}`}
        onClick={() => handleClickFilter(columnKey)}>
        <FilterIcon size={14} />
      </span>
      {isShowFilterHeader && (
        <FilterPopup columnKey={columnKey} ref={filterRef} />
      )}
    </div>
  );
};

export default FilterHeader;
