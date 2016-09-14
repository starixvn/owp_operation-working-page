import { calculateCustomTableWidth } from '../../../Shared/common/CustomTable/Helper';
import DynamicCell from './Cell/DynamicCell';
import { sort } from './eventSlice/eventCheckingSlice';

const DefaultTableStyle = {
  rowHeight: 70,
  filterOffset: 190,
  height: 750,
  headerHeight: 38
};

const LeagueColumn = {
  order: 1,
  headerName: 'Conversations',
  columnKey: 'eventName',
  width: 350,
  isCanSort: true,
  isFreeze: true
};

const TicketIdColumn = {
  headerName: 'ID',
  columnKey: 'ticketId',
  isCanSort: true,
  width: 60,
  isFreeze: true
};

const LastCommentColumn = {
  order: 2,
  headerName: 'Last Comment',
  columnKey: 'lastCommentDate',
  width: 450,
  isCanSort: true
};

const TicketTypeColumn = {
  headerName: 'Ticket Type - Subtype',
  columnKey: 'ticketType',
  isCanSort: true,
  width: 180
};

const StatusColumn = {
  headerName: 'Status',
  columnKey: 'status',
  isCanSort: false,
  width: 100
};

const ActionColumn = {
  headerName: 'Action',
  columnKey: 'action',
  isCanSort: false,
  width: 80
};

const ColumnModels = {
  LeagueColumn,
  TicketIdColumn,
  LastCommentColumn,
  TicketTypeColumn,
  StatusColumn,
  ActionColumn
};

const bonusWidth = columnSchema => calculateCustomTableWidth(columnSchema, 16);

const getConfigTicketsTab = containerWidth => {
  const ratio = containerWidth <= 1000 ? 1000 / 1614 : containerWidth / 1614;

  return {
    columnSchema: [
      { ...TicketIdColumn, width: TicketIdColumn.width * ratio },
      { ...LeagueColumn, width: LeagueColumn.width * ratio },
      { ...TicketTypeColumn, width: TicketTypeColumn.width * ratio },
      { ...StatusColumn, width: StatusColumn.width * ratio },
      { ...LastCommentColumn, width: LastCommentColumn.width * ratio },
      { ...ActionColumn, width: ActionColumn.width * ratio }
    ],
    tableStyle: DefaultTableStyle,
    dynamicCell: DynamicCell,
    sortFunc: sort,
    tableWidth: bonusWidth
  };
};

export { getConfigTicketsTab, ColumnModels, DefaultTableStyle };
