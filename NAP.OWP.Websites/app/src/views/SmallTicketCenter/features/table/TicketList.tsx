
import { useAppSelector } from '../../app/hooksNative';
import cellFactory from './cell/cellFactory';

const TicketList = () => {
  const ticketList= useAppSelector(state=>state.tickerSlice.entities);
  return (
    <div>
      <ul className="ticket__list">
        {ticketList.map((ticket, index)=><li
        className='ticket__list--item'
        key={index}>
          {cellFactory(ticket)}
        </li>)}
      </ul>
    </div>
  );
};

export default TicketList;