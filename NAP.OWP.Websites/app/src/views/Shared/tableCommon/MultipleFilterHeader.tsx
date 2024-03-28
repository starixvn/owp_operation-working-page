import { FilterIcon } from 'mdi-react';
import { useState } from 'react';
import { TFilterHeaderProps } from './typeCommon';
import MultipleFilterHeaderPopupCommon from './MultipleFilterHeaderPopupCommon';
import useClickOutside from '../customHook/useClickOutside';

const MultipleFilterHeader = ({ columnKey, options }: TFilterHeaderProps) => {

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const handleClickFilter = (value: string) => {
    //handleClickFilterCallback(value);
    setIsOpenFilter(true);
  };

  /* const checkIsFiltered = () =>
    filterState.some((x: { columnKey: string }) => {
      return x.columnKey === columnKey;
    }); */

  const handleClosedPopup = () => {
    setIsOpenFilter(false);
  };

  const filterRef = useClickOutside<HTMLDivElement>(() => setIsOpenFilter(false));

  const handleClearFilterCallback = () => { };
  const handleFilterBySearchKeyCallback = () => { };
  const handleValueFilterCallback = () => { };
  return (
    <div className='filter-header'>
      <span
        className={`icon-filter ${true ? 'is-filter' : ''}`}
        onClick={() => handleClickFilter(columnKey)}>
        <FilterIcon size={14} />
      </span>
      {isOpenFilter && (
        <div className='abc' ref={filterRef}>
          <MultipleFilterHeaderPopupCommon
            model={{}}
            options={options}
            handleClosedPopup={handleClosedPopup}
            columnKey={columnKey}
            handleClearFilterCallback={handleClearFilterCallback}
            handleFilterBySearchKeyCallback={handleFilterBySearchKeyCallback}
            handleValueFilterCallback={handleValueFilterCallback}
          />
        </div>
      )}
    </div>
  );
};

export default MultipleFilterHeader;