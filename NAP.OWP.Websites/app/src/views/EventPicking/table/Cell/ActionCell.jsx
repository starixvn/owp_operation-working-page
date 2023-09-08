import React from 'react';
import PropTypes from 'prop-types';

import HistoricIcon from 'mdi-react/HistoricIcon';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const ActionCell = props => {
  const { rowIndex, dataSource } = props;
  const { infoSiteMatchId } = dataSource[rowIndex];
  const onOpenLog = () => {};
  return (
    <div className='action-cell'>
      <span className='icon-history' onClick={onOpenLog}>
        <HistoricIcon size={14} />
      </span>
    </div>
  );
};

ActionCell.propTypes = propTypes;
export default ActionCell;
