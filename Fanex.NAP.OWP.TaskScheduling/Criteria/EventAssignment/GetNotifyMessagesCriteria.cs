namespace Fanex.NAP.OWP.TaskScheduling.Criteria.EventAssignment
{
    using Data.Repository;

    public class GetNotifyMessagesCriteria : CriteriaBase
    {
        public string SessionId { get; set; }

        public override bool IsValid() => !string.IsNullOrWhiteSpace(SessionId);

        public override string GetSettingKey() => "OWP_MessageGetBySessionId";
    }
}