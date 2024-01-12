import React from 'react';
import PropTypes from 'prop-types';
import TicketCellCommon from '../../Shared/ticketEvent/component/TicketCellCommon';

const propTypes = {
  dataSource: PropTypes.array,
  rowIndex: PropTypes.number,
  onShowTicketList: PropTypes.func.isRequired,
  updateDataSources: PropTypes.func
};

const TicketCell = props => {
  const {
    dataSource,
    rowIndex,
    onShowTicketList = false,
    updateDataSources = () => {}
  } = props;
  return (
  
  );
};

TicketCell.propTypes = propTypes;

export default TicketCell;
