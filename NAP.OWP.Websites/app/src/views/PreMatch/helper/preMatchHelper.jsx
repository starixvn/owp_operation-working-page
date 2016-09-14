import { isEqual } from 'lodash';
import {
  TAKEOVERAPIKEY,
  TradingPageUrl,
  simpleApiQueryUrl
} from '../const/const';
import { formatTime } from '../../Shared/DateTime/dateTimeHelper';

const filterPrematchUpdated = (allPrematch, prematchIdUpdated) =>
  allPrematch.filter(
    p =>
      p.MatchCount &&
      prematchIdUpdated.some(id => isEqual(p.PreMatchLeagueId, id))
  );

const buildClassNameAssignmentCell = (isHighlight, isCopying) => {
  let className = '';
  if (isHighlight) {
    className = 'highlight';
    if (isCopying) {
      className = `${className} copied`;
    }
  }
  return className;
};

const buildLastUpdatedFormatter = props => {
  const { updateTime, updateBy } = props;
  const lastUpdatedFormatter = updateTime
    ? formatTime(updateTime, 'minute', 'LLL')
    : undefined;
  return {
    lastUpdatedFormatter,
    updateBy
  };
};

const buildLastUpdate = props => {
  const { lastUpdatedFormatter, updateBy } = props;
  const lastUpdate = lastUpdatedFormatter
    ? ` (Last Updated at ${lastUpdatedFormatter} GMT+8 by ${updateBy})`
    : null;
  return lastUpdate;
};

const pipe = (...fns) => x => fns.reduce((y, func) => func(y), x);

const buildHeaderTitle = (updateTime, updateBy) => {
  const builderPipe = pipe(buildLastUpdatedFormatter, buildLastUpdate);
  return builderPipe({ updateTime, updateBy });
};

const buildStartTimeQueryModel = evenDate => {
  return {
    url: simpleApiQueryUrl,
    apiKey: TAKEOVERAPIKEY,
    EventDate: evenDate
  };
};

const buildGoToTradingPageLink = (betType, assignedLeagueIds) =>
  `${TradingPageUrl}?bt=${betType}&rng=T&c=${assignedLeagueIds}&lge=&lgt=${assignedLeagueIds}&lgl=&lgc=&fcSite=0&fcSource=4`;

export {
  filterPrematchUpdated,
  buildClassNameAssignmentCell,
  buildHeaderTitle,
  buildStartTimeQueryModel,
  buildLastUpdatedFormatter,
  buildLastUpdate,
  buildGoToTradingPageLink
};
