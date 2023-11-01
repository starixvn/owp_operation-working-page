import { isEqual, uniqueId } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/storeNative';
import { useAppDispatch } from '../../app/hookNative';
import {
  clearFilter,
  closedFilterHeaderPopup,
  filterBySearchKey,
  setFilterHeaderValue
} from '../tableSlice/tableSlice';
import { CloseIcon } from 'mdi-react';
import { Button } from 'reactstrap';

type FilterPopupProps = {
  columnKey: string;
};

const FilterPopup = ({ columnKey }: FilterPopupProps) => {
  const [filterValue, setFilterValue] = useState('');
  const model = useSelector((state: RootState) => state.events);
  const { isShowFilterHeader, columnKeyFilter } = model;

  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleClearAllFilter = () => {
    setFilterValue('');
    dispatch(closedFilterHeaderPopup());
    dispatch(clearFilter());
  };
  const handleOnSearchFilter = () => {
    const model = {
      columnKey,
      keyword: filterValue
    };
    dispatch(filterBySearchKey(model));
  };

  return (
    <>
      {isShowFilterHeader && (
        <div
          ref={filterRef}
          className={`filter-popup is-show ${
            isEqual(columnKey, columnKeyFilter) ? '' : 'is-hide-another-popup'
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
            onChange={e => setFilterValue(e.target.value)}
          />
          <span className='clear-all' onClick={handleClearAllFilter}>
            Clear All
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
