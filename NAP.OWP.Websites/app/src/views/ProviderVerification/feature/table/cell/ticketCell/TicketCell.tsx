import { TTicketCell } from '../../../../type/table';
import IconCreateMessage from './IconCreateMessage';
import IconOpenMessage from './IconOpenMessage';

const TicketCell = ({ HasTicket, IsRead, rowIndex }: TTicketCell) => {
  return (
    <>
      {HasTicket ? (
        <IconOpenMessage isRead={IsRead} />
      ) : (
        <IconCreateMessage />
      )}
    </>
  );
};

export default TicketCell;
