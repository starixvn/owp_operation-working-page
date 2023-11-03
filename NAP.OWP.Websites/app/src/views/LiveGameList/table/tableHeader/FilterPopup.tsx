import { isEqual } from 'lodash';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/storeNative';
import { useAppDispatch } from '../../app/hookNative';
import {
  clearFilter,
  closedFilterHeaderPopup,
  filterBySearchKey,
  setValueFilter
} from '../tableSlice/tableSlice';
import { CloseIcon } from 'mdi-react';
import { Button } from 'reactstrap';

type FilterPopupProps = {
  columnKey: string;
};

const FilterPopup = ({ columnKey }: FilterPopupProps) => {
  const model = useSelector((state: RootState) => state.events);
  const { isShowFilterHeader, columnKeyFilterCurrent, valueFilterAllColumn } =
    model;
  const filterValue = valueFilterAllColumn[columnKey] ?? '';
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleClearAllFilter = () => {
    dispatch(closedFilterHeaderPopup());
    dispatch(clearFilter());
  };
  const handleOnSearchFilter = () => {
    const filterState = {
      columnKey,
      keyword: filterValue
    };
    dispatch(filterBySearchKey(filterState));
  };
  const handleOnchangeValue = (value: string) => {
    const columnHaveBeenFiltered = {
      columnKey,
      keyword: value
    };
    dispatch(setValueFilter(columnHaveBeenFiltered));
  };

  return (
    <>
      {isShowFilterHeader && (
        <div
          ref={filterRef}
          className={`filter-popup is-show ${
            isEqual(columnKey, columnKeyFilterCurrent)
              ? ''
              : 'is-hide-another-popup'
          }`}>
          <span
            className='close-popup'
            onClick={() => dispatch(closedFilterHeaderPopup())}>
            <CloseIcon size={14} />
          </span>
          <input
            className='input-field'
            placeholder='Search'
            value={filterValue}
            autoFocus
            onChange={e => handleOnchangeValue(e.target.value)}
          />
          <span className='clear-all' onClick={handleClearAllFilter}>
            Clear All Filters
          </span>
          <Button
            className='btn-search'
            disabled={!filterValue}
            onClick={handleOnSearchFilter}>
            Search
          </Button>
        </div>
      )}
    </>
  );
};

export default FilterPopup;
