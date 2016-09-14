namespace Fanex.NAP.OWP.EventManagement.ViewModels.Filter
{
    using System.Collections.Generic;
    using Model;
    using Models.EventInfo;
    using League = Models.EventInfo.League;

    public class AddConditionControlViewModel
    {
        public int FieldId { get; set; }

        public string Value { get; set; }

        public RangeEventDate EventDate { get; set; }

        public RangeValue RangeValue { get; set; }

        public IEnumerable<League> Leagues { get; set; }

        public IEnumerable<Employee> Assignees { get; set; }

        public IEnumerable<Television> Tivies { get; set; }

        public IEnumerable<OtherProvider> OtherProviders { get; set; }

        public IEnumerable<Provider> Providers { get; set; }

        public IEnumerable<Agent> Agents { get; set; }

        public IEnumerable<FilterRefResource> MatchStatus { get; set; }
    }
}