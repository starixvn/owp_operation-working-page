import ReadonlyCommonCell from './cell/ReadonlyCommonCell';
import { formatTime } from '../../../Shared/DateTime/dateTimeHelper';
import TicketCell from './cell/TicketCell';
import AgentConfirmCell from './cell/AgentConfirmCell';
import { TDataSource } from '../../type/table';
import EditableCommonCell from './cell/EditableCommonCell';
import { ROW_HEIGHT } from './TableSchema.json';
import { useAppDispatch } from '../../app/hookNative';
import { setAgentConfirm, setValue } from './tableSlice';
import MBCell from './cell/MBCell';

const TableBody = ({ dataSource }: { dataSource: TDataSource[] }) => {
  const dispatch = useAppDispatch();

  return (
    <tbody>
      {dataSource.map((event, index) => (
        <tr key={index} style={{ height: ROW_HEIGHT, backgroundColor: event.RowColor }}>
          <td>
            <ReadonlyCommonCell className='match__no' value={event.MatchNo} />
          </td>
          <td>
            <ReadonlyCommonCell
              className='match__status'
              value={event.MatchStatus}
            />
          </td>
          <td>
            <ReadonlyCommonCell
              className='ko__time'
              value={formatTime(event.EventDateTime, 'minute', 'hh:mm A')}
            />
          </td>
          <td>
            <ReadonlyCommonCell className='league' value={event.League} />
          </td>
          <td>
            <ReadonlyCommonCell
              className='match'
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
          <td>
            <ReadonlyCommonCell className='runner' value={event.Provider} />
          </td>
          <td>
            <ReadonlyCommonCell
              className='other__provider'
              value={event.OtherProvider}
            />
          </td>
          <EditableCommonCell
            className='agent'
            value={event.Agent}
            onBlur={value =>
              dispatch(
                setValue({
                  owpMatchId: event.OWPMatchId,
                  key: 'Agent',
                  value
                })
              )
            }
          />
          <td>
            <MBCell
              HandicapSetting={event.HandicapSetting}
              OverUnderSetting={event.OverUnderSetting}
            />
          </td>
          <td>
            <ReadonlyCommonCell className='remark' value={event.Remark} />
          </td>
          <td>
            <ReadonlyCommonCell className='remark__by' value={event.RemarkBy} />
          </td>
          <td>
            <AgentConfirmCell agentConfirm={event.AgentConfirm.map(a => ({
              value: a.Value,
              label: a.Label
            }))}
              onChange={v => dispatch(setAgentConfirm({
                owpMatchId: event.OWPMatchId,
                value: v.map(a => ({
                  Value: a.value,
                  Label: a.label
                }))
              }))} />
          </td>
          <EditableCommonCell
            className='est__note'
            value={event.EstNote}
            onBlur={value =>
              dispatch(
                setValue({
                  owpMatchId: event.OWPMatchId,
                  key: 'EstNote',
                  value
                })
              )
            }
          />
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
