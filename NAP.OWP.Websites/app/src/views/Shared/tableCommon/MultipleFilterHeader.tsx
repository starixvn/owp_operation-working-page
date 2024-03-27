import { FilterIcon } from 'mdi-react';
import { useEffect, useRef, useState } from 'react';
import { TFilterHeaderProps } from './typeCommon';
import MultipleFilterHeaderPopupCommon from './MultipleFilterHeaderPopupCommon';

const MultipleFilterHeader = ({ columnKey, options }: TFilterHeaderProps) => {

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpenFilter(false);
      }
    };
    //document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      //document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [filterRef]);

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
        <MultipleFilterHeaderPopupCommon
          model={{}}
          options={options}
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

export default MultipleFilterHeader;