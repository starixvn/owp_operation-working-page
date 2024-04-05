import { TTicketCell } from '../../../../type/table';
import IconCreateMessage from './IconCreateMessage';
import IconOpenMessage from './IconOpenMessage';

const TicketCell = ({ hasTicket, isRead, rowIndex }: TTicketCell) => {
  return (
    <>
      {hasTicket ? (
        <IconOpenMessage isRead={isRead} />
      ) : (
        <IconCreateMessage />
      )}
    </>
  );
};

export default TicketCell;
