import PropTypes from 'prop-types';
import SpreadCell from './SpreadCell';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const SpreadOuCell = props => {
  const { rowIndex, dataSource } = props;
  const { spreadOu } = dataSource[rowIndex];
  return <SpreadCell spread={spreadOu} />;
};

SpreadOuCell.propTypes = propTypes;
export default SpreadOuCell;
