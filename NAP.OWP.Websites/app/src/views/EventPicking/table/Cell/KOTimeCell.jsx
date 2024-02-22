import PropTypes from 'prop-types';
import { formatTime } from '../../../Shared/DateTime/dateTimeHelper';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const KoTimeCell = props => {
  const { rowIndex, dataSource } = props;
  const { eventDateTime, isNoOffer } = dataSource[rowIndex];
  return (
    <div className={`ko-time-cell ${isNoOffer ? 'color-unselected' : ''}`}>
      <span>{formatTime(eventDateTime, 'minute', 'hh:mm A')}</span>
    </div>
  );
};

KoTimeCell.propTypes = propTypes;
export default KoTimeCell;
