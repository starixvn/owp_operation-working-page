import {
  setColumnKeyValue,
} from '../eventPickingTableSlice/reducer';
import { useAppDispatch } from '../../app/hooks';
import MultipleFilterHeaderCommon from '../../../Shared/tableCommon/MultipleFilterHeader';

import { Option } from '../../../Shared/MultipleSelection/type';
import store from '../../app/store';

type FilterHeaderProps = {
  columnKey: string
};

const MultipleFilterHeader = ({
  columnKey }: FilterHeaderProps) => {
  const dispatch = useAppDispatch();

  const {
    eventPickingTable: {
      multipleFilter
    }
  } = store.getState();

  const handleFilter = (selected: Option[]) => {
    //dispatch(setColumnKeyValue(value));
  };

  const filterInfo = multipleFilter.find(i => i.columnKey === columnKey);
  return (
    <MultipleFilterHeaderCommon
      options={filterInfo?.options || []}
      columnKey={columnKey}
      selected={filterInfo?.selected || []}
      isFilter={filterInfo?.isFilter || false}
      onFilter={handleFilter}
    />
  );
};

export default MultipleFilterHeader;
