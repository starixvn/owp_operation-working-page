import React from 'react';
import { TABLE } from '../const.json';
import { TColumn, TPickCellModel } from '../type/type';
import NoCell from './cell/NoCell';
import KOTimeCell from './cell/KOTimeCell';
import EventCell from './cell/EventCell';
import TicketCell from './cell/TicketCell';

const {
  HEADER: { MATCH_NO, KO_TIME, EVENT, TICKET },
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
    buildColumn(TICKET)
  ],
  tableStyle: {
    rowHeight: ROW_HEIGHT,
    headerHeight: HEADER_HEIGHT,
    defaultHeight: DEFAULT_HEIGHT,
    filterOffset: FILTER_OFFSET
  },
  dynamicCell,
  filterFunc: () => {},
  clearFilterFunc: () => {},
  tableWidth: () => WIDTH
});

const dynamicCell = (rowIndex: Required<number>, cellModel: TPickCellModel) => {
  const { dataSource, columnKey } = cellModel;
  const cellInfo = {
    rowIndex,
    dataSource
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
  }
  return null;
};

export { buildTableInfo };
