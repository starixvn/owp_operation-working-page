import { isEqual } from 'lodash';
import { CloseIcon } from 'mdi-react';
import { Button } from 'reactstrap';
import { TFilterState } from './typeCommon';
import { MultiSelect } from 'react-multi-select-component';
import { Option } from '../MultipleSelection/type';

type FilterPopupProps = {
  columnKey: string;
  model: any;
  options: Option[]
  handleClosedPopup: () => void;
  handleClearFilterCallback: () => void;
  handleFilterBySearchKeyCallback: (filterState: TFilterState) => void;
  handleValueFilterCallback: (filterState: TFilterState) => void;
};

const MultipleFilterHeaderPopupCommon = (
  (
    {
      model,
      options,
      columnKey,
      handleClosedPopup,
      handleClearFilterCallback,
      handleFilterBySearchKeyCallback,
      handleValueFilterCallback
    }: FilterPopupProps
  ) => {
    const { columnKeyFilterCurrent, valueFilterAllColumn } = model;
    //const filterValue = valueFilterAllColumn[columnKey] ?? '';

    const handleClearAllFilter = () => {
      handleClosedPopup();
      handleClearFilterCallback();
    };
    const handleOnSearchFilter = () => {
      /* const filterState = {
        columnKey,
        keyword: filterValue
      };
      handleFilterBySearchKeyCallback(filterState); */
    };

    return (
      <div
        className={`filter-popup is-show ${isEqual(columnKey, columnKeyFilterCurrent)
          ? ''
          : 'is-hide-another-popup'
          }`}>
        <span className='close-popup' onClick={() => onClickClosedIcon()}>
          <CloseIcon size={14} />
        </span>
        <MultiSelect
          onChange={() => { }}
          value={options}
          options={options}
          ClearSelectedIcon={null}
          className='multi-select'
          hasSelectAll
          labelledBy='Select...'
          overrideStrings={{
            selectAll: '-- Select All --',
            allItemsAreSelected: 'All'
          }}
          isOpen

        />
        <div className='command'>
          <button
            className='btn-cancel btn btn btn-secondary'
            onClick={handleOnSearchFilter}>
            Cancel
          </button>
          <Button
            className='btn-search'
            onClick={handleOnSearchFilter}>
            Search
          </Button>
        </div>
      </div>
    );
  }
);

export default MultipleFilterHeaderPopupCommon;
