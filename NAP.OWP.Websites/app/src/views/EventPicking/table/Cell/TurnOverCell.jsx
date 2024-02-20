import PropTypes from 'prop-types';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  name: PropTypes.string
};

const TurnOverCell = props => {
  const { rowIndex, dataSource, name } = props;
  const { turnover } = dataSource[rowIndex];

  return (
    <>
      <td>{name}</td>
      <td
        style={{
          color: turnover.color,
          textAlign: 'center'
        }}>
        {turnover.valueDisplay}
      </td>
    </>
  );
};

TurnOverCell.propTypes = propTypes;
export default TurnOverCell;
