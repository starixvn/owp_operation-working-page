import React from 'react';
import { TTicketCell } from '../../type/type';
import TicketCellCommon from '../../../Shared/ticketEvent/component/TicketCellCommon';

const TicketCell = (props: TTicketCell) => {
  const { dataSource, rowIndex, onShowTicketList, updateDataSources } = props;

  return (
    // <TicketCellCommon
    //   dataSource={dataSource}
    //   rowIndex={rowIndex}
    //   onShowTicketList={onShowTicketList}
    //   updateDataSources={updateDataSources}
    // />
    <h1>abc</h1>
  );
};

export default TicketCell;
