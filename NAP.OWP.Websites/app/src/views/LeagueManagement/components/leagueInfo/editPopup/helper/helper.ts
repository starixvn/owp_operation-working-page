import MaxbetConst from '../../../../constants/MaxbetConst';
import { TCondition, TDataSource } from '../../table/TableType';
import { TEditSetting } from '../EditType';
import { v4 as uuidv4 } from 'uuid';

const mapDataSourceToEditSetting = (dataSource: TDataSource): TEditSetting => {
  const {
    leagueSettingId,
    owpLeagueId,
    league,
    leagueGroupId,
    leagueGroup,
    spread_HDP_value,
    spread_OU_value,
    maxbetWD_HDP_Show,
    maxbetWD_NoOfHDP_Show,
    maxbetWK_HDP_Show,
    maxbetWK_NoOfHDP_Show,
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
    spread_HDP: spread_HDP_value?.toString(),
    spread_OU: spread_OU_value?.toString(),
    maxbetWD_HDP: maxbetWD_HDP_Show,
    maxbetWD_NoOfHDP: maxbetWD_NoOfHDP_Show,
    maxbetWK_HDP: maxbetWK_HDP_Show,
    maxbetWK_NoOfHDP: maxbetWK_NoOfHDP_Show,
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

const convertResponseToCondition = (response: TCondition[]) => {
  if (response.length) {
    return response.map(item => ({
      key: uuidv4(),
      expression: MaxbetConst.expressionOption.find(
        round => round.label === item.type
      ),
      value: item.value
    }));
  } else {
    return [
      {
        key: uuidv4(),
        expression: MaxbetConst.expressionOption[0],
        value: ''
      }
    ];
  }
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

export { mapDataSourceToEditSetting, convertResponseToCondition };
