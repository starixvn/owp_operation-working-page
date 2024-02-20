import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MarginCell = props => {
  const { rowIndex, dataSource } = props;
  const { margin } = dataSource[rowIndex];

  return (
    <div
      className='margin-cell'
      style={{
        color: margin.color,
        textAlign: 'center'
      }}>
      {margin.valueDisplay}
    </div>
  );
};

MarginCell.propTypes = propTypes;
export default MarginCell;
