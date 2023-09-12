import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LogHistoryIcon from '../../../../assets/svg-element/LogHistoryIcon';
import HistoryModal from '../../modal/HistoryModal.native';
const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const ActionCell = props => {
  const { rowIndex, dataSource } = props;
  const { infoSiteMatchId } = dataSource[rowIndex];
  const [openLog, setOpenLog] = useState(false);

  return (
    <>
      <div className='action-cell'>
        <span className='icon-history-event' onClick={() => setOpenLog(true)}>
          <LogHistoryIcon width={24} height={24} />
        </span>
      </div>
      {openLog && (
        <HistoryModal
          infoSiteMatchId={infoSiteMatchId}
          onToggle={() => setOpenLog(false)}
        />
      )}
    </>
  );
};

ActionCell.propTypes = propTypes;
export default ActionCell;
