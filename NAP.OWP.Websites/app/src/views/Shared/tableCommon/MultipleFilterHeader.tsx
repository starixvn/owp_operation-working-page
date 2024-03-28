import { FilterIcon } from 'mdi-react';
import { useState } from 'react';
import { MultipleFilterHeaderProps } from './typeCommon';
import MultipleFilterHeaderPopupCommon from './MultipleFilterHeaderPopupCommon';
import useClickOutside from '../customHook/useClickOutside';

const MultipleFilterHeader = ({
  options,
  selected,
  isFilter,
  onFilter,
  setOptions,
  setSelected,
  setIsFilter
}: MultipleFilterHeaderProps) => {

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const filterRef = useClickOutside<HTMLDivElement>(() => setIsOpenFilter(false));
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
            options={setOptions()}
            selected={setSelected()}
            onClosedPopup={() => setIsOpenFilter(false)}
            onFilter={onFilter}
          />
        </div>
      )}
    </div>
  );
};

export default MultipleFilterHeader;