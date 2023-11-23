using Fanex.Data.Repository;

namespace OWP.Criteria
{
    internal class GetSubTypeSpecialProductCriteria : CriteriaBase
    {
        public int MatchId { get; set; }

        public override string GetSettingKey() => "OWP_TaskList_GetSubTypeSpecialProduct";

        public override bool IsValid() => true;
    }
}