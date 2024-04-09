
import MultipleFilterHeaderCommon from '../../../Shared/tableCommon/MultipleFilterHeader';
import { useAppDispatch } from '../../app/hookNative';
import { TColumnKey } from '../../type/table';
import helper from './calculateFilterOption';

const MultipleFilterHeader = ({
  columnKey }: {
    columnKey: TColumnKey
  }) => {
  const dispatch = useAppDispatch();
  return (
    <MultipleFilterHeaderCommon
      setOptions={() => helper[columnKey]()}
      selected={[]}
      isFilter
      onFilter={() => { }}
      onClear={() => { }}
    />
  );
};

export default MultipleFilterHeader;
