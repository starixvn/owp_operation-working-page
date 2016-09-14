namespace Fanex.NAP.OWP.EventManagement.Criteria.EventInfo
{
    using Data.Repository;

    public class GetEventInformationByFilterIdCriteria : CriteriaBase
    {
        public int FilterId { get; set; }

        public bool ShowAll { get; set; }

        public override bool IsValid()
        {
            return FilterId > 0;
        }

        public override string GetSettingKey()
        {
            return "OWP_EventInfo_GetByFilterId";
        }
    }
}