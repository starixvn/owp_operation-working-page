namespace Fanex.NAP.OWP.EventManagement.Criteria.EventInfo
{
    using System;
    using System.Web.Mvc;
    using Data.Repository;

    public class GetEventInformationCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        [AllowHtml]
        public string HomeName { get; set; }

        [AllowHtml]
        public string AwayName { get; set; }

        [AllowHtml]
        public string WatchBet { get; set; }

        [AllowHtml]
        public string Phone { get; set; }

        [AllowHtml]
        public string Channel { get; set; }

        public DateTime? FilterFromTime { get; set; }

        public DateTime? FilterToTime { get; set; }

        public decimal? FromMaxBet { get; set; }

        public decimal? ToMaxBet { get; set; }

        public decimal? FromSpread { get; set; }

        public decimal? ToSpread { get; set; }

        public string LeagueIds { get; set; }

        public string AssigneeIds { get; set; }

        public string AgentIds { get; set; }

        public string OtherProviderIds { get; set; }

        public string ProviderIds { get; set; }

        public string TVIds { get; set; }

        [AllowHtml]
        public string MatchNumber { get; set; }

        [AllowHtml]
        public string Remark { get; set; }

        public int AssigneeLocation { get; set; }

        public string MatchStatusIds { get; set; }

        public bool ShowAll { get; set; }

        public override bool IsValid()
        {
            return EventDate > DateTime.MinValue;
        }

        public override string GetSettingKey()
        {
            return "OWP_EventInfo_Get";
        }
    }
}