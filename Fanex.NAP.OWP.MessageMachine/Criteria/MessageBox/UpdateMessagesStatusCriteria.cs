namespace Fanex.NAP.OWP.MessageMachine.Criteria.MessageBox
{
    using Data.Repository;

    public class UpdateMessagesStatusCriteria : CriteriaBase
    {
        public int UserId { get; set; }

        public bool IsViewed { get; set; }

        public override string GetSettingKey() => "OWP_MessageStatusUpdateAll";

        public override bool IsValid() => UserId > 0;
    }
}