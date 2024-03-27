import {
  clearFilter,
  filterBySearchKey,
  setColumnKeyValue,
  setValueFilter
} from '../eventPickingTableSlice/reducer';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../app/store';
import MultipleFilterHeaderCommon from '../../../Shared/tableCommon/MultipleFilterHeader';
import { TFilterState } from '../../../Shared/tableCommon/typeCommon';

type FilterHeaderProps = {
  columnKey: string
};

const MultipleFilterHeader = ({
  columnKey }: FilterHeaderProps) => {
  const dispatch = useAppDispatch();
  const model = useSelector((state: RootState) => state.eventPickingTable);
  const {
    eventPickingTable: {
      multipleFilter: {
        mbOptions,
        koTimeOptions
      }
    }
  } = store.getState();

  const handleClickFilterCallback = (value: string) => {
    dispatch(setColumnKeyValue(value));
  };
  const handleClearFilterCallback = () => dispatch(clearFilter());
  const handleFilterBySearchKeyCallback = (filterState: TFilterState) =>
    dispatch(filterBySearchKey(filterState));
  const handleValueFilterCallback = (columnHaveBeenFiltered: TFilterState) =>
    dispatch(setValueFilter(columnHaveBeenFiltered));
  return (
    <MultipleFilterHeaderCommon
      options={{
        'KO Time': koTimeOptions,
        'MB': mbOptions,
      }[columnKey] || []}
      columnKey={columnKey}
      model={model}
      handleClickFilterCallback={handleClickFilterCallback}
      handleClearFilterCallback={handleClearFilterCallback}
      handleFilterBySearchKeyCallback={handleFilterBySearchKeyCallback}
      handleValueFilterCallback={handleValueFilterCallback}
    />
  );
};

export default MultipleFilterHeader;
