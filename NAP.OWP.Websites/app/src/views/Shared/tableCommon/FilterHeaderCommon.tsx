import React, { useEffect, useRef, useState } from 'react';
import { FilterIcon } from 'mdi-react';
import FilterHeaderPopupCommon from './FilterHeaderPopupCommon';
import { TFilterState } from './typeCommon';
type FilterHeaderProps = {
  columnKey: string;
  model: any;
  handleClickFilterCallback: (value: string) => void;
  handleClearFilterCallback: () => void;
  handleFilterBySearchKeyCallback: (filterState: TFilterState) => void;
  handleValueFilterCallback: (filterState: TFilterState) => void;
};

const FilterHeaderCommon = ({
  columnKey,
  model,
  handleClickFilterCallback,
  handleClearFilterCallback,
  handleFilterBySearchKeyCallback,
  handleValueFilterCallback
}: FilterHeaderProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const { filterState } = model;
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleClickFilter = (value: string) => {
    handleClickFilterCallback(value);
    setIsOpenFilter(true);
  };

  const checkIsFiltered = () =>
    filterState.some((x: { columnKey: string }) => {
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
        <FilterHeaderPopupCommon
          model={model}
          handleClosedPopup={handleClosedPopup}
          columnKey={columnKey}
          ref={filterRef}
          handleClearFilterCallback={handleClearFilterCallback}
          handleFilterBySearchKeyCallback={handleFilterBySearchKeyCallback}
          handleValueFilterCallback={handleValueFilterCallback}
        />
      )}
    </div>
  );
};

export default FilterHeaderCommon;
