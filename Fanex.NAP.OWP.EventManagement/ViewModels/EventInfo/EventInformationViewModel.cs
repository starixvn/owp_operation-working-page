using OWP.Models;

namespace Fanex.NAP.OWP.EventManagement.ViewModels.EventInfo
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Models.EventInfo;

    public class EventInformationViewModel
    {
        public EventInformationViewModel()
        {
            Filters = new List<FilterModel>();
        }

        public int FilterId { get; set; }

        public string FilterName { get; set; }

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

        public DateTime? FromTime { get; set; }

        public DateTime? ToTime { get; set; }

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

        public int IsSelected { get; set; }

        [AllowHtml]
        public string MatchNumber { get; set; }

        [AllowHtml]
        public string Remark { get; set; }

        public int AssigneeLocation { get; set; }

        public string MatchStatusIds { get; set; }

        public IEnumerable<FilterModel> Filters { get; set; }

        public bool IsCreatePublicFilter { get; set; }

        public bool SearchDisabled { get; set; }

        public PermissionModel TicketPermission { get; set; }

    }
}