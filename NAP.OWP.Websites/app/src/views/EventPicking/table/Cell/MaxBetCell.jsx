import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MaxBetCell = props => {
  const { rowIndex, dataSource } = props;
  const { maxBetHDP, isNoOffer } = dataSource[rowIndex];
  return (
    <div className={`max-bet-cell ${isNoOffer ? 'color-unselected' : ''}`}>
      {maxBetHDP}
    </div>
  );
};

MaxBetCell.propTypes = propTypes;
export default MaxBetCell;
