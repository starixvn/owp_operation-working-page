import PropTypes from 'prop-types';
import Utils from '../../../Shared/Utils';

const { convertThousandToK } = Utils;

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MaxBetCell = props => {
  const { rowIndex, dataSource } = props;
  const { maxbet } = dataSource[rowIndex];
  return (
    <>
      {maxbet ? (
        <div className='max-bet-cell'>{convertThousandToK(maxbet)}</div>
      ) : (
        <a className='mb__check' href='http://google.com'>
          Check
        </a>
      )}
    </>
  );
};

MaxBetCell.propTypes = propTypes;
export default MaxBetCell;
