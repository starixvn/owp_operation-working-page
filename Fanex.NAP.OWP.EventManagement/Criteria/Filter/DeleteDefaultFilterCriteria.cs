namespace Fanex.NAP.OWP.EventManagement.Criteria.Filter
{
    using Data.Repository;

    public class DeleteDefaultFilterCriteria : CriteriaBase
    {
        public int UserId { get; set; }
        
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override bool IsValid()
        {
            return UserId > 0;
        }

        public override string GetSettingKey()
        {
            return "OWP_FilterDefaultDelete";
        }
    }
}