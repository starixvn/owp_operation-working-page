import PropTypes from 'prop-types';
import store from '../../app/store';
import SpreadViewCell from './SpreadViewCell';
import SpreadEditableCell from './SpreadEditableCell';
import { VIEW, EDIT } from '../../mode/mode.json';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const SpreadCell = ({ spread }: { spread: string | number | undefined }) => {
  const { mode } = store.getState().mode;
  const component = {
    [VIEW]: <SpreadViewCell spread={spread} />,
    [EDIT]: <SpreadEditableCell spread={spread} />
  };
  return component[mode];
};

SpreadCell.propTypes = propTypes;
export default SpreadCell;
