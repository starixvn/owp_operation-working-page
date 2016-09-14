namespace Fanex.NAP.OWP.EventManagement.Criteria.League
{
    using Data.Repository;

    public class GetLeagueCriteria : CriteriaBase
    {
        public string Keywords { get; set; }

        public int? SelectTop { get; set; }

        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_OWPLeague_Get";
    }
}