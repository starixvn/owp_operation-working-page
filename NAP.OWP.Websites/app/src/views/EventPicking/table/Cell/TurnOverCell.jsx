import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string
};

const TurnOverCell = props => {
  const { value, color, name } = props;

  return (
    <>
      <td>{name}</td>
      <td
        style={{
          color: color,
          textAlign: 'center'
        }}>
        {value}
      </td>
    </>
  );
};

TurnOverCell.propTypes = propTypes;
export default TurnOverCell;
