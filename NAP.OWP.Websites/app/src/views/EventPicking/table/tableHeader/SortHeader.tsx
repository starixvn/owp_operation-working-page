import { ISortState } from '../../types/dataTableType';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { ORDER_ASC, ORDER_DESC } from '../TableSchema.json';
import { isEqual } from 'lodash';
type SortHeaderProps = {
  columnKey: string;
};
const SortHeader = ({ columnKey }: SortHeaderProps) => {
  const dispatch = useAppDispatch();
  const model = useSelector((state: RootState) => state.eventPickingTable);
  const { sortState } = model;
  const { orderType, columnKeySelected } = sortState;
  const handleOnClickOrder = () => {
    const sortStateNew: ISortState = {
      columnKeySelected: columnKey,
      orderType: isEqual(orderType, ORDER_ASC) ? ORDER_DESC : ORDER_ASC
    };
  };

  return (
    <span
      onClick={handleOnClickOrder}
      className={`sort-icon ${
        isEqual(columnKeySelected, columnKey) ? orderType : ''
      }`}
    />
  );
};

export default SortHeader;
