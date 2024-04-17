import ReadonlyCommonCell from './cell/ReadonlyCommonCell';
import { formatTime } from '../../../Shared/DateTime/dateTimeHelper';
import TicketCell from './cell/TicketCell';
import AgentConfirmCell from './cell/AgentConfirmCell';
import { TDataSource } from '../../type/table';
import { ROW_HEIGHT } from './TableSchema.json';
import MBCell from './cell/MBCell';
import EstNoteCell from './cell/EstNoteCell';
import AgentCell from './cell/AgentCell';

const TableBody = ({ dataSource }: { dataSource: TDataSource[] }) => {
  return (
    <tbody>
      {dataSource.map((event, index) => (
        <tr
          key={event.OWPMatchId}
          style={{ height: ROW_HEIGHT, backgroundColor: event.RowColor }}>
          <td className='match__no'>
            <ReadonlyCommonCell value={event.MatchNo} />
          </td>
          <td className='match__status'>
            <ReadonlyCommonCell
              value={event.MatchStatus}
            />
          </td>
          <td className='ko__time'>
            <ReadonlyCommonCell
              value={formatTime(event.EventDateTime, 'minute', 'hh:mm A')}
            />
          </td>
          <td className='league'>
            <ReadonlyCommonCell value={event.League} />
          </td>
          <td className='match'>
            <ReadonlyCommonCell
              value={`${event.Home} -vs- ${event.Away}`}
            />
          </td>
          <td>
            <TicketCell
              dataSource={dataSource}
              HasTicket={event.HasTicket}
              IsRead={event.IsRead}
              rowIndex={index}
            />
          </td>
          <td className='provider'>
            <ReadonlyCommonCell value={event.Provider} />
          </td>
          <td className='other__provider'>
            <ReadonlyCommonCell
              value={event.OtherProvider}
            />
          </td>
          <AgentCell
            columnKey='agent'
            rowIndex={index}
            className='agent'
            value={event.AgentEst}
            owpMatchId={event.OWPMatchId}
          />
          <td className='max__bet'>
            <MBCell
              HandicapSetting={event.HandicapSetting}
              OverUnderSetting={event.OverUnderSetting}
            />
          </td>
          <td className='remark'>
            <ReadonlyCommonCell value={event.RemarkEst} />
          </td>
          <td className='remark__by' >
            <ReadonlyCommonCell value={event.RemarkBy} />
          </td>
          <td>
            <AgentConfirmCell
              agentConfirm={event.AgentConfirm.map(a => ({
                value: a.Value,
                label: a.Label
              }))}
              owpMatchId={event.OWPMatchId}
            />
          </td>
          <EstNoteCell
            columnKey='estNote'
            rowIndex={index}
            className='est__note'
            value={event.EstNote}
            owpMatchId={event.OWPMatchId}
          />
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
