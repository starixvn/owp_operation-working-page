namespace Fanex.NAP.OWP.MessageMachine.Criteria.MessageBox
{
    using Data.Repository;

    public class GetMessageByUserIdCriteria : CriteriaBase
    {
        public int UserId { get; set; }

        public int SelectTop { get; set; }

        public int? LastMessageId { get; set; }

        public int TotalNotViewMessage { get; set; }

        public override string GetSettingKey() => "OWP_MessageGetByUserId";

        public override bool IsValid() => UserId > 0 && SelectTop >= 0;
    }
}