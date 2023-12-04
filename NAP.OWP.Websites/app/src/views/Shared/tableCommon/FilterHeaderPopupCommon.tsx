import { isEqual } from 'lodash';
import React, { forwardRef } from 'react';
import { CloseIcon } from 'mdi-react';
import { Button } from 'reactstrap';
import { TFilterState } from './typeCommon';

type FilterPopupProps = {
  columnKey: string;
  model: any;
  handleClosedPopup: () => void;
  handleClearFilterCallback: () => void;
  handleFilterBySearchKeyCallback: (filterState: TFilterState) => void;
  handleValueFilterCallback: (filterState: TFilterState) => void;
};

const FilterHeaderPopupCommon = forwardRef<HTMLDivElement, FilterPopupProps>(
  (
    {
      model,
      columnKey,
      handleClosedPopup,
      handleClearFilterCallback,
      handleFilterBySearchKeyCallback,
      handleValueFilterCallback
    }: FilterPopupProps,
    ref
  ) => {
    const { columnKeyFilterCurrent, valueFilterAllColumn } = model;
    const filterValue = valueFilterAllColumn[columnKey] ?? '';
    const handleClearAllFilter = () => {
      handleClosedPopup();
      handleClearFilterCallback();
    };
    const handleOnSearchFilter = () => {
      const filterState = {
        columnKey,
        keyword: filterValue
      };
      handleFilterBySearchKeyCallback(filterState);
    };
    const handleOnchangeValue = (value: string) => {
      const columnHaveBeenFiltered = {
        columnKey,
        keyword: value
      };
      handleValueFilterCallback(columnHaveBeenFiltered);
    };
    const onClickClosedIcon = () => {
      handleClosedPopup();
    };

    const handelOnKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      if (e.key === 'Enter' && e.currentTarget.value) {
        handleOnSearchFilter();
      }
    };

    return (
      <div
        ref={ref}
        className={`filter-popup is-show ${
          isEqual(columnKey, columnKeyFilterCurrent)
            ? ''
            : 'is-hide-another-popup'
        }`}>
        <span className='close-popup' onClick={() => onClickClosedIcon()}>
          <CloseIcon size={14} />
        </span>
        <input
          className='input-field'
          placeholder='Search'
          value={filterValue}
          autoFocus
          onKeyDown={e => handelOnKeyDown(e)}
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
    );
  }
);

export default FilterHeaderPopupCommon;
