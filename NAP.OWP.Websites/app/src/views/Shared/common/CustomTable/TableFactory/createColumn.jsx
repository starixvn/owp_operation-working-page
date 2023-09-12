import React from 'react';
import { Column, Cell } from 'fixed-data-table-2';
import renderHeaderCell from './renderHeader';

const createColumn = props => {
  const {
    dataSource,
    columnModel,
    dynamicCell,
    canCheck,
    sortFunc,
    filterFunc,
    clearFilterFunc,
    collapseAllRowFunc,
    expandAllRowFunc,
    handleShowTicket,
    onShowDropdownListOption
  } = props;

  const {
    columnKey,
    headerName,
    width,
    color,
    sortState,
    filterState,
    collapseExpandAllRowState,
    collapseExpandRowState,
    isCanCollapseExpand,
    isCanSort,
    isCanFilter,
    isFreeze,
    isCheckBox,
    checked,
    onCheckChange
  } = columnModel;

  const headerModel = {
    headerName,
    columnKey,
    sortState,
    filterState,
    collapseExpandAllRowState,
    collapseExpandRowState,
    isCanCollapseExpand,
    isCanSort,
    isCanFilter,
    isCheckBox,
    canCheck,
    checked,
    onCheckChange,
    sortFunc,
    filterFunc,
    clearFilterFunc,
    collapseAllRowFunc,
    expandAllRowFunc
  };

  const cellModel = {
    dataSource,
    columnKey,
    collapseExpandRowState,
    handleShowTicket,
    onShowDropdownListOption
  };

  return (
    <Column
      key={headerName}
      columnKey={columnKey}
      header={
        <Cell className={`header ${color}`}>
          {renderHeaderCell(headerModel)}
        </Cell>
      }
      cell={({ rowIndex }) => dynamicCell(rowIndex, cellModel)}
      width={width}
      fixed={isFreeze}
    />
  );
};

export default createColumn;
