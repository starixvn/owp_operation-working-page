
import { useAppSelector } from '../../app/hooksNative';
import cellFactory from './cell/cellFactory';

const TicketList = () => {
  const ticketList= useAppSelector(state=>state.tickerSlice.entities);
  return (
    <div className='table__content--wrapper'>
      <table className='table__content'>
          <thead>
            <tr>
              <th>Conversations</th>
            </tr>
          </thead>
          <tbody>
          {ticketList.map((ticket, index)=><tr
          className='ticket__list--item'
          key={index}>
          <td>{cellFactory(ticket)}</td>
        </tr>)}
          </tbody>
        </table>
    </div>
  );
};

export default TicketList;