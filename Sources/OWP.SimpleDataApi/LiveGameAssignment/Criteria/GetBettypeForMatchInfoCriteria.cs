namespace OWP.SimpleDataApi.LiveGameAssignment.Criteria
{
    using Fanex.Data.Repository;

    public class GetBettypeForSpecialEventCriteria : CriteriaBase, INonQueryCommand
    {
        public int ParentMatchId { get; set; }

        public override string GetSettingKey() => "OWP_LiveGameAssignment_GetBettypeForSpecialEvent";

        public override bool IsValid() => true;
    }
}