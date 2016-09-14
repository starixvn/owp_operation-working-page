namespace OWP.AutoAssignment.Visualization.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetAssignmentsCriteria : CriteriaBase
    {
        public string UserIds { get; set; }

        public DateTime EventDate { get; set; }

        public override string GetSettingKey() => "OWP_AutoAssignment_GetLARealAssignment";

        public override bool IsValid() => true;
    }
}