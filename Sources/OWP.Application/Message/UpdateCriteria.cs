namespace OWP.Application.Message
{
    using Fanex.Data.Repository;

    public class UpdateCriteria: NonQueryCommand
    {
        public int UserId { get; set; }

        public bool IsWatcher { get; set; }

        public bool IsViewed { get; } = true;

        public override string GetSettingKey() => "OWP_MessageStatusUpdateAll";

        public override bool IsValid() => UserId > 0;
    }
}
