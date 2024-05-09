import MaxbetConst from '../../../../constants/MaxbetConst';
import { TCondition, TDataSource } from '../../table/TableType';
import { TEditSetting, TExpression, TLeagueCategory } from '../EditType';
import { v4 as uuidv4 } from 'uuid';

const mapDataSourceToEditSetting = (dataSource: TDataSource): TEditSetting => {
  const {
    leagueSettingId,
    owpLeagueId,
    league,
    leagueGroupId,
    leagueGroup,
    spread_HDP_Value,
    spread_OU_Value,
    maxbetWD_HDP_Show,
    wD_NoOfHDP_Show,
    maxbetWK_HDP_Show,
    wK_NoOfHDP_Show,
    lstNote,
    remark2,
    comment,
    condition: {
      hasTv,
      hasIpTv,
      ipTv,
      round,
      division,
      remark: conditionRemark
    }
  } = dataSource;

  const editSetting: TEditSetting = {
    leagueSettingId,
    owpLeagueId,
    league,
    leagueGroupId,
    leagueGroup,
    spreadShow: spread_HDP_Value?.toString(),
    spread_OU: spread_OU_Value?.toString(),
    maxbetWD_HDP: maxbetWD_HDP_Show,
    wD_NoOfHDP: wD_NoOfHDP_Show,
    maxbetWK_HDP: maxbetWK_HDP_Show,
    wK_NoOfHDP: wK_NoOfHDP_Show,
    lstNote,
    remark2,
    comment,
    hasTv,
    hasIpTv,
    ipTv,
    round,
    division,
    remark: conditionRemark
  };

  return editSetting;
};

const mapEditSettingFromDataSource = (payload: TDataSource) => {
  return {
    leagueSettingId: payload.leagueSettingId,
    owpLeagueId: payload.owpLeagueId,
    league: payload.league,
    leagueGroupId: payload.leagueGroupId,
    leagueGroup: payload.leagueGroup,
    spread_HDP: payload.spread_HDP_Value?.toString(),
    spread_OU: payload.spread_OU_Value?.toString(),
    maxbetWD_HDP: payload.maxbetWD_HDP_Show,
    wD_NoOfHDP: payload.wD_NoOfHDP_Show,
    maxbetWK_HDP: payload.maxbetWD_HDP_Show,
    wK_NoOfHDP: payload.wK_NoOfHDP_Show,
    lstNote: payload.lstNote,
    remark2: payload.remark2,
    comment: payload.comment,
    hasTv: payload.condition.hasTv,
    hasIpTv: payload.condition.hasIpTv,
    ipTv: payload.condition.ipTv,
    round: payload.condition.round,
    division: payload.condition.division,
    remark: payload.remark
  };
};

const convertResponseToCondition = (response: TCondition[]) => {
  if (response?.length) {
    return response.map(item => ({
      key: uuidv4(),
      expression: MaxbetConst.expressionOption.find(
        round => round.label === item.type
      ),
      value: item.value
    })) as TExpression[];
  }

  return [
    {
      key: uuidv4(),
      expression: MaxbetConst.expressionOption[0],
      value: ''
    }
  ] as TExpression[];
};

const convertResourceToOptions = (resource: TLeagueCategory[]) => {
  return resource.map(item => ({
    value: item.Id,
    label: item.Value
  }));
};

// const updateState = ({collection: TEditSetting[], payload: {}}) => {
//   const { collection, payload } = props;
//   const { key, value, index } = payload;
//   const result = collection.map((item, i) => {
//     if (i !== index) {
//       return item;
//     }
//     return {
//       ...item,
//       [key]: value
//     };
//   });
//   return result;
// };

export {
  mapDataSourceToEditSetting,
  convertResponseToCondition,
  mapEditSettingFromDataSource,
  convertResourceToOptions
};
