namespace OWP.AutoAssignment.Criteria
{
    using Fanex.Data.Repository;

    public class GetRequestsCriteria : CriteriaBase
    {
        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_AutoAssignmentRequest_GetAll";
    }
}
