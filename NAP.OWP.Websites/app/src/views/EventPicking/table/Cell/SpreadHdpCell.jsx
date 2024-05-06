import PropTypes from 'prop-types';
import SpreadCell from './SpreadCell';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const SpreadHdpCell = props => {
  const { rowIndex, dataSource } = props;
  const { spreadHdp } = dataSource[rowIndex];
  return <SpreadCell spread={spreadHdp} />;
};

SpreadHdpCell.propTypes = propTypes;
export default SpreadHdpCell;
