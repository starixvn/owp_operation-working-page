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
      <td
        style={{
          height: '30px',
          maxWidth: '40px',
          backgroundColor: '#44546b',
          color: '#fff',
          fontWeight: 700,
          padding: '3px'
        }}>
        {name}
      </td>
      <td
        style={{
          height: '30px',
          color: color,
          textAlign: 'right',
          padding: '3px'
        }}>
        {value}
      </td>
    </>
  );
};

TurnOverCell.propTypes = propTypes;
export default TurnOverCell;
