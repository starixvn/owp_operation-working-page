namespace Fanex.NAP.OWP.EventManagement.Criteria.Filter
{
    using Data.Repository;

    public class GetFilterDetailCriteria : CriteriaBase
    {
        public int FilterId { get; set; }

        public override bool IsValid()
        {
            return true;
        }

        public override string GetSettingKey()
        {
            return "OWP_FilterDetail_Get";
        }
    }
}