namespace OWP.AutoAssignment.TraderVisualization.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetTraderByDateCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public override string GetSettingKey()
            => "OWP_AutoAssignmentTraderVisualization_GetTraderByDate";

        public override bool IsValid()
            => true;
    }
}
