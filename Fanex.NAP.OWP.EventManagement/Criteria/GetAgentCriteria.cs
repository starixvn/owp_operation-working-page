namespace Fanex.NAP.OWP.EventManagement.Criteria
{
    using Data.Repository;

    public class GetAgentCriteria : CriteriaBase
    {
        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_Agent_GetAll";
    }
}