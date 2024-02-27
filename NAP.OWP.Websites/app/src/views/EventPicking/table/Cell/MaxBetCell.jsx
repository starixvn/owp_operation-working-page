import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MaxBetCell = props => {
  const { rowIndex, dataSource } = props;
  const { maxBetHDP } = dataSource[rowIndex];
  return <div className='max-bet-cell'>{maxBetHDP}</div>;
};

MaxBetCell.propTypes = propTypes;
export default MaxBetCell;
