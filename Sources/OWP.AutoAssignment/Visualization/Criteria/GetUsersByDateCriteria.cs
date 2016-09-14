namespace OWP.AutoAssignment.Visualization.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetUsersByDateCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public string RequestId { get; set; }

        public override string GetSettingKey() => "OWP_AutoAssignmentVisualization_GetUsersByDate";

        public override bool IsValid() => true;
    }
}