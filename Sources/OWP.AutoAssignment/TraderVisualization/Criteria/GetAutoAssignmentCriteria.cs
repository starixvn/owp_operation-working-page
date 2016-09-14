namespace OWP.AutoAssignment.TraderVisualization.Criteria
{
    using Fanex.Data.Repository;

    public class GetAutoAssignmentCriteria : CriteriaBase
    {
        public string RequestId { get; set; }

        public override string GetSettingKey()
            => "OWP_AutoAssignmentTraderVisualization_GetAssignmentByRequestId";

        public override bool IsValid()
            => true;
    }
}
