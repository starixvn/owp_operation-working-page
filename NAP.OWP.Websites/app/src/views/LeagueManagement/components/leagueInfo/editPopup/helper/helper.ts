import MaxbetConst from '../../../../constants/MaxbetConst';
import { TCondition, TDataSource } from '../../table/TableType';
import { TExpressionRow, TLeagueCategory } from '../EditType';
import { v4 as uuidv4 } from 'uuid';

const mapEditSettingFromDataSource = (dataSource: TDataSource) => {
  const {
    leagueSettingId,
    owpLeagueId,
    leagueGroupId,
    leagueGroup,
    league,
    remark,
    spread_HDP_Value,
    spread_OU_Value,
    spreadShow,
    maxbetWD_HDP_Show,
    wD_NoOfHDP_Show,
    wK_NoOfHDP_Show,
    lstNote,
    remark2,
    comment,
    condition
  } = dataSource;
  const result = {
    leagueSettingId,
    owpLeagueId,
    league,
    leagueGroupId,
    leagueGroup,
    spread_HDP: spread_HDP_Value?.toString(),
    spread_OU: spread_OU_Value?.toString(),
    spread: spreadShow,
    maxbetWD_HDP: maxbetWD_HDP_Show,
    wD_NoOfHDP: wD_NoOfHDP_Show,
    maxbetWK_HDP: maxbetWD_HDP_Show,
    wK_NoOfHDP: wK_NoOfHDP_Show,
    lstNote,
    remark2,
    comment,
    hasTv: condition.hasTv,
    hasIpTv: true,
    ipTv: condition.ipTv?.length
      ? condition.ipTv
      : [
          {
            type: MaxbetConst.expressionOption[0].label as
              | 'Contains'
              | 'Equals',
            value: ''
          }
        ],
    round: condition.round?.length
      ? condition.round
      : [
          {
            type: MaxbetConst.expressionOption[0].label as
              | 'Contains'
              | 'Equals',
            value: ''
          }
        ],
    division: condition.division?.length
      ? condition.division
      : [
          {
            type: MaxbetConst.expressionOption[0].label as
              | 'Contains'
              | 'Equals',
            value: ''
          }
        ],
    remark
  };

  return result;
};

const convertResponseToCondition = (response: TCondition[]) => {
  return response.map(item => ({
    key: uuidv4(),
    condition: MaxbetConst.expressionOption.find(
      round => round.label === item.type
    ),
    value: item.value
  })) as TExpressionRow[];
};

const convertResourceToOptions = (resource: TLeagueCategory[]) => {
  return resource.map(item => ({
    value: item.Id,
    label: item.Value
  }));
};

export {
  convertResponseToCondition,
  mapEditSettingFromDataSource,
  convertResourceToOptions
};
