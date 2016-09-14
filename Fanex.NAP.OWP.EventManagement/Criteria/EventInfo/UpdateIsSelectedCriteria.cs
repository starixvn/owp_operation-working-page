namespace Fanex.NAP.OWP.EventManagement.Criteria.EventInfo
{
    using Data.Repository;

    public class UpdateIsSelectedCriteria : CriteriaBase
    {
        public int UserId { get; set; }

        public string OWPMatchIds { get; set; }

        public bool IsSelected { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override bool IsValid()
        {
            return UserId > 0 && !string.IsNullOrEmpty(OWPMatchIds);
        }

        public override string GetSettingKey()
        {
            return "OWP_MatchInfo_UpdateIsSelected";
        }
    }
}