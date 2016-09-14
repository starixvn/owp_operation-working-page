namespace OWP.OddsCompiler.Criteria
{
    using Fanex.Data.Repository;

    public class GetUsersSendNotificationCriteria : NonQueryCommand
    {
        public int OWPMatchId { get; set; }

        public int AssigneeSettingId { get; set; }

        public int WatcherSettingId { get; set; }

        public override string GetSettingKey() => "OWP_Notification_GetUsers";

        public override bool IsValid() => OWPMatchId > 0;
    }
}