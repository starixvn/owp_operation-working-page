import ReadonlyCommonCell from './cell/ReadonlyCommonCell';
import { formatTime } from '../../../Shared/DateTime/dateTimeHelper';
import TicketCell from './cell/ticketCell/TicketCell';
import AgentConfirmCell from './cell/AgentConfirmCell';
import { TDataSource } from '../../type/table';
import EditableCommonCell from './cell/EditableCommonCell';
import { ROW_HEIGHT } from './TableSchema.json';
import { useAppDispatch } from '../../app/hookNative';
import { setValue } from './tableSlice';

const TableBody = ({ dataSource }: { dataSource: TDataSource[] }) => {
  const dispatch = useAppDispatch();
  return (
    <tbody>
      {dataSource.map((event, index) => <tr
        key={index} style={{ height: ROW_HEIGHT }}>
        <td>
          <ReadonlyCommonCell className='match__no' value={event.matchNo} />
        </td>
        <td>
          <ReadonlyCommonCell className='match__status' value={event.matchStatus} />
        </td>
        <td>
          <ReadonlyCommonCell className='ko__time' value={formatTime(event.eventDateTime, 'minute', 'hh:mm A')} />
        </td>
        <td>
          <ReadonlyCommonCell className='league' value={event.league} />
        </td>
        <td>
          <ReadonlyCommonCell className='match' value={`${event.home} -vs- ${event.away}`} />
        </td>
        <td>
          <TicketCell hasTicket={event.hasTicket} isRead={event.isRead} rowIndex={index} />
        </td>
        <td>
          <ReadonlyCommonCell className='runner' value={event.runner} />
        </td>
        <td>
          <ReadonlyCommonCell className='other__provider' value={event.otherProvider} />
        </td>
        <td>
          <EditableCommonCell className='agent' value={event.agent} onBlur={value => dispatch(setValue({
            rowIndex: index,
            key: 'agent',
            value
          }))} />
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
          <EditableCommonCell className='est__note' value={event.estNote} onBlur={value => dispatch(setValue({
            rowIndex: index,
            key: 'estNote',
            value
          }))} />
        </td>
      </tr>)}
    </tbody>
  );
};

export default TableBody;