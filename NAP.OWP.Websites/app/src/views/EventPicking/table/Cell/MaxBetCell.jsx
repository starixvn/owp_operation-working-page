import PropTypes from 'prop-types';
import store from '../../app/store';
import MaxBetViewCell from './MaxBetViewCell';
import MaxbetEditableCell from './MaxbetEditableCell';
import { VIEW, EDIT } from '../../mode/mode.json';
import Utils from '../../../Shared/Utils';

const { convertThousandToK } = Utils;

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const MaxBetCell = props => {
  const { mode } = store.getState().mode;
  const { rowIndex, dataSource } = props;
  const { maxbetHdp, infoSiteMatchId, owpLeagueId } = dataSource[rowIndex];

  const component = {
    [VIEW]: (
      <MaxBetViewCell
        maxBet={convertThousandToK(maxbetHdp, true)}
        owpLeagueId={owpLeagueId}
      />
    ),
    [EDIT]: (
      <MaxbetEditableCell
        infoSiteMatchId={infoSiteMatchId}
        maxBet={convertThousandToK(maxbetHdp, false) ?? 0}
        owpLeagueId={owpLeagueId}
      />
    )
  };
  return component[mode];
};

MaxBetCell.propTypes = propTypes;
export default MaxBetCell;
