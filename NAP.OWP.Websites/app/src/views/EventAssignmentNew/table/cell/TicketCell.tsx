import React from 'react';
import { TTicketCell } from '../../type/type';
import TicketCellCommon from '../../../Shared/ticketEvent/component/TicketCellCommon';

const TicketCell = (props: TTicketCell) => {
  const { dataSource, rowIndex, onShowTicketList, updateDataSources } = props;
  return (
    <TicketCellCommon
      dataSource={dataSource}
      rowIndex={rowIndex}
      onShowTicketList={onShowTicketList}
      updateDataSources={updateDataSources}
    />
  );
};

export default TicketCell;
