import { URLQUERYINFOMATCH, URLQUERYASSIGNEE } from '../../../const/const';
import { post } from '../../../../Shared/Service/Service';
const GetRecipientPreMatch = async PreMatchLeagueId => {
  const model = {
    id: PreMatchLeagueId,
    url: URLQUERYASSIGNEE
  };
  return await post(model);
};
const GetInfoSiteMatch = async InfoSiteMatchId => {
  const model = {
    id: InfoSiteMatchId,
    url: URLQUERYINFOMATCH
  };
  return await post(model);
};

export default {
  GetRecipientPreMatch,
  GetInfoSiteMatch
};