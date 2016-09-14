namespace Fanex.NAP.OWP.EventManagement.Criteria
{
    using Data.Repository;

    public class GetTelevisionCriteria : CriteriaBase
    {
        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_TelevisionGetAll";
    }
}