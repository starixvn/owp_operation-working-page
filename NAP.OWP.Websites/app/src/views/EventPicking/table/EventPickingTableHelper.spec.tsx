import { selectTable, passColorRowTable } from './EventPickingTableHelper';

describe('selectTable under unit test', () => {
  it('create correct columnSchema', () => {
    const columnSchema = [
      {
        headerName: "No #",
        columnKey: "No",
        isCanFilter: undefined,
        isCheckBox: true,
        width: 26.4,
        checked: 1000,
        className: undefined,
      },
      {
        headerName: "KOTime",
        columnKey: "KOTime",
        isCanFilter: undefined,
        isCheckBox: undefined,
        width: 44,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "League",
        columnKey: "League",
        isCanFilter: true,
        isCheckBox: undefined,
        width: 132,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "Match",
        columnKey: "Match",
        isCanFilter: true,
        isCheckBox: undefined,
        width: 123.20000000000002,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "MB",
        columnKey: "MaxBet",
        isCanFilter: undefined,
        isCheckBox: undefined,
        width: 26.4,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "TV/IPTV",
        columnKey: "IPTvStreaming",
        isCanFilter: true,
        isCheckBox: undefined,
        width: 132,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "Provider",
        columnKey: "Provider",
        isCanFilter: true,
        isCheckBox: undefined,
        width: 132,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "Round",
        columnKey: "Round",
        isCanFilter: true,
        isCheckBox: undefined,
        width: 132,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "Remark",
        columnKey: "Remark",
        isCanFilter: true,
        isCheckBox: undefined,
        width: 132,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "R&D Update",
        columnKey: "RAndDUpdate",
        isCanFilter: false,
        isCheckBox: undefined,
        width: 132,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
      {
        headerName: "Checked by LST",
        columnKey: "CheckedByLst",
        isCanFilter: false,
        isCheckBox: true,
        width: 149.60000000000002,
        checked: undefined,
        className: "check-by-lst"
      },
      {
        headerName: "Action",
        columnKey: "Action",
        isCanFilter: false,
        isCheckBox: undefined,
        width: 50,
        checked: undefined,
        className: undefined,
        onCheckChange: undefined,
      },
    ];
    const table = selectTable(1000);
    expect(table.columnSchema.length).toEqual(columnSchema.length);
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
