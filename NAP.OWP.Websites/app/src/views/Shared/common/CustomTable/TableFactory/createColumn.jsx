import React from 'react';
import { Column, Cell } from 'fixed-data-table-2';
import renderHeaderCell from './renderHeader';

const createColumn = props => {
  const {
    dataSource,
    columnModel,
    dynamicCell,
    sortFunc,
    filterFunc,
    onCheckChange,
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
    isChecked,
    collapseExpandAllRowState,
    collapseExpandRowState,
    isCanCollapseExpand,
    isCanSort,
    isCanFilter,
    isFreeze,
    isCheckBox,
    canCheck
  } = columnModel;

  const headerModel = {
    headerName,
    columnKey,
    sortState,
    filterState,
    isChecked,
    collapseExpandAllRowState,
    collapseExpandRowState,
    isCanCollapseExpand,
    isCanSort,
    isCanFilter,
    isCheckBox,
    canCheck,
    sortFunc,
    filterFunc,
    clearFilterFunc,
    collapseAllRowFunc,
    expandAllRowFunc,
    onCheckChange
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
