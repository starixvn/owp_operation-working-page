import React from 'react';
import { TABLE, COLUMNFULLBETTYPES } from '../const.json';
import {
  TAssignmentBuilder,
  TBettype,
  TColumn,
  TPickCellModel
} from '../type/type';
import NoCell from './cell/NoCell';
import KOTimeCell from './cell/KOTimeCell';
import EventCell from './cell/EventCell';
import TicketCell from './cell/TicketCell';
import NoteCell from './cell/NoteCell';
import HdpCell from './cell/HdpCell';
import BettypeCell from '../components/BettypeCell';
const {
  HEADER: { MATCH_NO, KO_TIME, EVENT, TICKET, NOTE, HDP },
  WIDTH,
  ROW_HEIGHT,
  DEFAULT_HEIGHT,
  HEADER_HEIGHT,
  FILTER_OFFSET
} = TABLE;

const buildColumn = (column: TColumn) => {
  const { HEADER_NAME, COLUMN_KEY, IS_CAN_FILTER, WIDTH } = column;
  return {
    headerName: HEADER_NAME,
    columnKey: COLUMN_KEY,
    isCanFilter: IS_CAN_FILTER,
    width: WIDTH
  };
};

const buildTableInfo = () => ({
  columnSchema: [
    buildColumn(MATCH_NO),
    buildColumn(KO_TIME),
    buildColumn(EVENT),
    buildColumn(TICKET),
    buildColumn(NOTE),
    buildColumn(HDP),
    ...COLUMNFULLBETTYPES.map(x => buildColumn(x))
  ],
  tableStyle: {
    rowHeight: ROW_HEIGHT,
    headerHeight: HEADER_HEIGHT,
    defaultHeight: DEFAULT_HEIGHT,
    filterOffset: FILTER_OFFSET
  },
  dynamicCell,
  /* filterFunc: filterBySearchKey,
  clearFilterFunc: clearFilter, */
  tableWidth: () => WIDTH
});

const dynamicCell = (rowIndex: Required<number>, cellModel: TPickCellModel) => {
  const { dataSource, columnKey, handleShowTicket } = cellModel;
  const cellInfo = {
    rowIndex,
    dataSource
  };

  const noteCellInfo: TNoteCell = {
    rowIndex,
    dataSource,
    onShowNote: handleShowTicket
  };

  switch (columnKey) {
    case MATCH_NO.COLUMN_KEY:
      return <NoCell {...cellInfo} />;
    case KO_TIME.COLUMN_KEY:
      return <KOTimeCell {...cellInfo} />;
    case EVENT.COLUMN_KEY:
      return <EventCell {...cellInfo} />;
    case TICKET.COLUMN_KEY:
      return <TicketCell {...cellInfo} />;
    case NOTE.COLUMN_KEY:
      return <NoteCell {...noteCellInfo} />;
    case HDP.COLUMN_KEY:
      return <HdpCell {...cellInfo} />;
  }
  return (
    <BettypeCell {...cellInfo} bettypeName={cellModel.columnKey as TBettype} />
  );
};

export { buildTableInfo };
