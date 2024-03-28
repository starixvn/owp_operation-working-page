import { FilterIcon } from 'mdi-react';
import { useState } from 'react';
import { MultipleFilterHeaderProps } from './typeCommon';
import MultipleFilterHeaderPopupCommon from './MultipleFilterHeaderPopupCommon';
import useClickOutside from '../customHook/useClickOutside';
import { isEquals } from 'immutability-helper';

const MultipleFilterHeader = ({
  columnKey,
  options,
  selected,
  isFilter,
  onFilter
}: MultipleFilterHeaderProps) => {

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const handleClickFilter = (value: string) => {
    //handleClickFilterCallback(value);

  };

  /* const checkIsFiltered = () =>
    filterState.some((x: { columnKey: string }) => {
      return x.columnKey === columnKey;
    }); */


  const filterRef = useClickOutside<HTMLDivElement>(() => setIsOpenFilter(false));

  const handleClearFilterCallback = () => { };
  const handleFilterBySearchKeyCallback = () => { };
  const handleValueFilterCallback = () => { };

  const className = isEquals(columnKey)
  return (
    <div className='filter-header'>
      <span
        className={`icon-filter ${isFilter ? 'is-filter' : ''}`}
        onClick={() => setIsOpenFilter(true)}>
        <FilterIcon size={14} />
      </span>
      {isOpenFilter && (
        <div ref={filterRef}>
          <MultipleFilterHeaderPopupCommon
            options={options}
            selected={options}
            onClosedPopup={() => setIsOpenFilter(false)}
            onFilter={onFilter}
          />
        </div>
      )}
    </div>
  );
};

export default MultipleFilterHeader;