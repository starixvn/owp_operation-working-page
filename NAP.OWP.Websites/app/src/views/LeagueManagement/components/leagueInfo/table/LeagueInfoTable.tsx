import TableHeader from './TableHeader';
import CustomTable from '../../../../Shared/tableCommon/CustomTable';
import { itemRowHeight } from './TableSchema.json';
import TableBody from './TableBody';
const LeagueInfoTable = () => {
  const entities = [
    {
      leagueSettingId: 123,
      leagueGroup: 'MJ',
      league: '*ENGLISH PREMIER LEAGUE',
      tv: 'TV/IPTV',
      round: '*Qualifiers*',
      leagueDivision: '*D3*/D4',
      remark: '',
      spreadHDP: 'SL 8% - 10%',
      spreadOU: 'SL 8% - 10%',
      maxbetWeekdayHDP: '100K',
      maxbetWeekdayNoHDP: '4+4 lines',
      maxbetWeekendHDP: '100K',
      maxbetWeekendNoHDP: '3+4 lines',
      lstNote: 'WD-MB',
      remark2: 'test',
      comment:
        '[Remark]\r\n<content of that cell>\r\n[Maxbet Weekend - HDP(K)]\r\n<content of that cell>'
    }
  ];

  // const model = useAppSelector(state => state.eventPickingTable);
  // const { entities, loading } = model;

  return (
    <>
      {/* {isEqual(loading, REQUEST_STATUS.pending) && <Loading />} */}
      <CustomTable
        data={entities}
        tableHeader={<TableHeader />}
        classNameTable={'table-league-management'}
        itemRowHeight={itemRowHeight}>
        <TableBody />
      </CustomTable>
    </>
  );
};

export default LeagueInfoTable;
