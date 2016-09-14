namespace OWP.Criteria
{
    using Fanex.Data.Repository;

    public class GetUserInfoByIdCriteria : CriteriaBase
    {
        public int UserId { get; set; }

        public override bool IsValid() => UserId > 0;

        public override string GetSettingKey() => "OWP_GetUserInfoById";
    }
}
