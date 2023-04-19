using Fanex.Data.Repository;

namespace OWP.EventAssignment.Criteria
{
    public class GetAdminSiteInfoCriteria: CriteriaBase
    {
        public string ParentMatchIds { get; set; }

        public override string GetSettingKey() => "OWP_LiveGame_GetAdminSiteInfo";

        public override bool IsValid() => true;
    }
}
