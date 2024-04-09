import TicketCellCommon from '../../../../Shared/ticketEvent/component/TicketCellCommon';
import { useAppDispatch } from '../../../app/hookNative';
import { TTicketCell } from '../../../type/table';

const TicketCell = ({ rowIndex, dataSource }: TTicketCell) => {
  const stableDispatch = useAppDispatch();

  return (
    <TicketCellCommon
      dataSource={dataSource}
      rowIndex={rowIndex}
      updateDataSources={() => console.log('updateDataSources')}
    />
  );
};

export default TicketCell;
