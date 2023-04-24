using Fanex.Data.Repository;

namespace OWP.EventAssignment.Criteria
{
    public class GetAdminSiteInfoCriteria: CriteriaBase
    {
        public override string GetSettingKey() => "OWP_LiveGame_GetAdminSiteInfo";

        public override bool IsValid() => true;
    }
}
