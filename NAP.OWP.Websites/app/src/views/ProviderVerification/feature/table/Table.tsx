import { useAppSelector } from '../../app/hookNative';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import Loading from '../../../components/Loading';
import { TABLE_HEADER } from './TableSchema.json';
import ReadonlyCommonCell from './cell/ReadonlyCommonCell';
import { formatTime } from '../../../Shared/DateTime/dateTimeHelper';
import TicketCell from './cell/ticketCell/TicketCell';
import AgentConfirmCell from './cell/AgentConfirmCell';
import TextboxCommonCell from './cell/TextboxCommonCell';

const Table = props => {
  const { dataSource, loading } = useAppSelector(state => state.events);

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }


  return <table className='table__provider__verification'>
    <thead>
      <tr>
        {TABLE_HEADER.map((item, index) => {
          return (
            <th
              key={index} style={{ width: '5%' }}>
              <div className='header-table'>
                <span>{item.headerName}</span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
    <tbody>
      {dataSource.map((event, index) => <tr
        key={index}>
        <td>
          <ReadonlyCommonCell className='match__no' value={event.matchNo} />
        </td>
        <td>
          <ReadonlyCommonCell className='match__status' value={event.matchStatus} />
        </td>
        <td>
          <ReadonlyCommonCell className='ko__time' value={formatTime(event.koTime, 'minute', 'hh:mm A')} />
        </td>
        <td>
          <ReadonlyCommonCell className='league' value={event.league} />
        </td>
        <td>
          <ReadonlyCommonCell className='match' value={`${event.home} -vs- ${event.away}`} />
        </td>
        <td>
          <TicketCell hasTicket={event.hasTicket} isRead={event.isRead} />
        </td>
        <td>
          <ReadonlyCommonCell className='runner' value={event.runner} />
        </td>
        <td>
          <ReadonlyCommonCell className='other__provider' value={event.otherProvider} />
        </td>
        <td>
          <TextboxCommonCell className='agent' value={event.agent} />
        </td>
        <td>
          <ReadonlyCommonCell className='max__bet' value={event.mb} />
        </td>
        <td>
          <ReadonlyCommonCell className='remark' value={event.remark} />
        </td>
        <td>
          <ReadonlyCommonCell className='remark__by' value={event.remarkBy} />
        </td>
        <td>
          <AgentConfirmCell agentConfirm={event.agentConfirm} />
        </td>
        <td>
          <TextboxCommonCell className='est__note' value={event.estNote} />
        </td>
      </tr>)}
    </tbody>
  </table>;
};

export default Table;