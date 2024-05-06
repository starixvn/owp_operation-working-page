import PropTypes from 'prop-types';
import store from '../../app/store';
import MaxBetViewCell from './MaxBetViewCell';
import MaxbetEditableCell from './MaxbetEditableCell';
import { VIEW, EDIT } from '../../mode/mode.json';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MaxBetCell = props => {
  const { mode } = store.getState().mode;
  const { rowIndex, dataSource } = props;
  const { maxbetHdp } = dataSource[rowIndex];
  const component = {
    [VIEW]: <MaxBetViewCell value={maxbetHdp} />,
    [EDIT]: <MaxbetEditableCell value={maxbetHdp} />
  };
  return component[mode];
};

MaxBetCell.propTypes = propTypes;
export default MaxBetCell;
