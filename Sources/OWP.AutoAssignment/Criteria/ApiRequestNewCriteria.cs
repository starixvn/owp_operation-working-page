namespace OWP.AutoAssignment.Criteria
{
    using Fanex.Data.Repository;

    public class ApiRequestNewCriteria : CriteriaBase
    {
        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_AutoAssignment_GetRequestNew";
    }
}