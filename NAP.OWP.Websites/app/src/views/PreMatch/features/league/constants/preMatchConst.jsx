const ORDER_ASC = 'ORDER_ASC';
const ORDER_DESC = 'ORDER_DESC';

const DefaultTableStyle = {
  rowHeight: 76,
  width: 1700,
  defaultHeight: 250,
  height: 750,
  maxHeight: 750,
  headerHeight: 38
};

const NoColumn = {
  headerName: 'No',
  columnKey: 'No',
  width: 55,
  fixed: true
};

const LeagueColumn = {
  headerName: 'League Name',
  columnKey: 'LeagueName',
  width: 560,
  fixed: true
};

const IssuesColumn = {
  headerName: 'EST',
  columnKey: 'Message',
  width: 60
};

const MaxbetOUColumn = {
  headerName: 'MB FT O/U',
  columnKey: 'MaxbetOU',
  width: 90
};

const MaxbetHDPColumn = {
  headerName: 'MB FT HDP',
  columnKey: 'MaxbetHDP',
  width: 90
};

const BlacklistColumn = {
  headerName: 'Black list',
  columnKey: 'Blacklist',
  width: 100
};

const HDPColumn = {
  order: 1,
  headerName: 'HDP',
  columnKey: 'HDP',
  width: 150
};

const OUColumn = {
  order: 2,
  headerName: 'O/U',
  columnKey: 'OU',
  width: 150
};

const HDPTakeOverColumn = {
  order: 3,
  headerName: 'HDP T.Over',
  columnKey: 'HDPTakeOver',
  width: 150
};

const OUTakeOverColumn = {
  order: 4,
  headerName: 'O/U T.Over',
  columnKey: 'OUTakeOver',
  width: 150
};
const NoteColumn = {
  headerName: 'Note',
  columnKey: 'Note',
  width: 55
};

const RemarkColumn = {
  headerName: 'Remark',
  columnKey: 'Remark',
  width: 200
};

const ActionColumn = {
  headerName: 'Action',
  columnKey: 'Action',
  width: 60,
  fixed: true
};

const BettypeHdpColumn = {
  bettypeId: 1,
  isTakeOver: false
};
const BettypeHdpOverColumn = {
  bettypeId: 1,
  isTakeOver: true
};

const BettypeOuColumn = {
  bettypeId: 3,
  isTakeOver: false
};

const BettypeOuOverColumn = {
  bettypeId: 3,
  isTakeOver: true
};

const ColumnModels = {
  NoColumn,
  LeagueColumn,
  IssuesColumn,
  HDPColumn,
  OUColumn,
  HDPTakeOverColumn,
  OUTakeOverColumn,
  MaxbetOUColumn,
  MaxbetHDPColumn,
  BlacklistColumn,
  NoteColumn,
  RemarkColumn,
  ActionColumn,
  BettypeHdpColumn,
  BettypeHdpOverColumn,
  BettypeOuColumn,
  BettypeOuOverColumn
};

const TableConst = {
  ORDER_ASC,
  ORDER_DESC
};

const logAction = {
  changeStartTime: 'Change Start Time',
  updateAssignment: 'Update Assignment',
  updateOtherAssignment: 'Update Other Assignment'
};

const APIKEY = {
  VALIDATE_ASSIGNEE: 'pre-match-assignment-validate-assignment'
};

export {
  TableConst,
  NoColumn,
  ColumnModels,
  logAction,
  DefaultTableStyle,
  APIKEY
};
