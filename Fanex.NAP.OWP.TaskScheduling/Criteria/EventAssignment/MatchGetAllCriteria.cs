namespace Fanex.NAP.OWP.TaskScheduling.Criteria.EventAssignment
{
    using System;
    using Data.Repository;

    public class MatchGetAllCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public string MatchStatusIds { get; set; }

        public override bool IsValid() => EventDate > DateTime.MinValue;

        public override string GetSettingKey() => "OWP_MatchListDetailsGet";
    }
}