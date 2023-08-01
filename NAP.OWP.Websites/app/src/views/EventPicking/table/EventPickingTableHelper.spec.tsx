import { selectTable, passColorRowTable } from './EventPickingTableHelper';

describe('selectTable under unit test', () => {
  it('create correct columnSchema', () => {
    const columnSchema = [
      {
        headerName: 'No #',
        columnKey: 'No',
        isCanFilter: undefined,
        isCheckBox: true,
        width: 30
      },
      {
        headerName: 'KOTime',
        columnKey: 'KOTime',
        isCanFilter: undefined,
        isCheckBox: undefined,
        width: 50
      },
      {
        headerName: 'League',
        columnKey: 'League',
        isCanFilter: true,
        isCheckBox: undefined,
        width: 150
      },
      {
        headerName: 'Match',
        columnKey: 'Match',
        isCanFilter: true,
        isCheckBox: undefined,
        width: 140
      },
      {
        headerName: 'MB',
        columnKey: 'MaxBet',
        isCanFilter: undefined,
        isCheckBox: undefined,
        width: 30
      },
      {
        headerName: 'TV/IPTV',
        columnKey: 'IPTvStreaming',
        isCanFilter: true,
        isCheckBox: undefined,
        width: 150
      },
      {
        headerName: 'Provider',
        columnKey: 'Provider',
        isCanFilter: true,
        isCheckBox: undefined,
        width: 150
      },
      {
        headerName: 'Round',
        columnKey: 'Round',
        isCanFilter: true,
        isCheckBox: undefined,
        width: 150
      },
      {
        headerName: 'Remark',
        columnKey: 'Remark',
        isCanFilter: true,
        isCheckBox: undefined,
        width: 150
      }
    ];
    const table = selectTable(1000);
    expect(table.columnSchema).toEqual(columnSchema);
  });

  it('passColorRowTable is null should return empty', () => {
    const dataSource = null;
    const result = passColorRowTable(dataSource);

    expect(result).toEqual('');
  });

  it('passColorRowTable is not null should return color', () => {
    const dataSource = {
      rowColor: 'red'
    };
    const result = passColorRowTable(dataSource);

    expect(result).toEqual('red-row');
  });
});
