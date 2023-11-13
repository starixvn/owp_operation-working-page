import React, { useEffect, useRef, useState } from 'react';
import { setColumnKeyValue } from '../tableSlice/tableSlice';
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
  const { filterState } = model;
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleClickFilter = (value: string) => {
    dispatch(setColumnKeyValue(value));
    setIsOpenFilter(true);
  };

  const checkIsFiltered = () =>
    filterState.some(x => {
      return x.columnKey === columnKey;
    });

  const handleClosedPopup = () => {
    setIsOpenFilter(false);
  };

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpenFilter(false);
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
      {isOpenFilter && (
        <FilterPopup
          handleClosedPopup={handleClosedPopup}
          columnKey={columnKey}
          ref={filterRef}
        />
      )}
    </div>
  );
};

export default FilterHeader;
