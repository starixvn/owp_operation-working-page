import store from '../../app/store';
import SpreadViewCell from './SpreadViewCell';
import SpreadEditableCell from './SpreadEditableCell';
import { VIEW, EDIT } from '../../mode/mode.json';
import Utils from '../../../Shared/Utils';

const { convertSpreadToPercent, convertToPercent } = Utils;

const SpreadCell = (
  { spread, spreadKey, infoSiteMatchId }: {
    spread: number | string | undefined,
    spreadKey: 'maxbetHdp' | 'spreadOu' | 'spreadHdp',
    infoSiteMatchId: number
  }) => {

  const spreadValue = convertSpreadToPercent(spread, false);
  const { mode } = store.getState().mode;

  const component = {
    [VIEW]: <SpreadViewCell spread={spreadValue} />,
    [EDIT]: <SpreadEditableCell spreadKey={spreadKey} infoSiteMatchId={infoSiteMatchId} spread={convertToPercent(spread)} />
  };
  return component[mode];
};

export default SpreadCell;
