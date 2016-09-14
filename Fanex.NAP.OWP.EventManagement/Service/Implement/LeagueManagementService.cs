namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Criteria.League;
    using Interfaces;
    using Model;

    public class LeagueManagementService : OWPBaseService, ILeagueManagementService
    {
        public IEnumerable<League> GetLeague(GetLeagueCriteria criteria)
        {
            IEnumerable<League> leagues = new List<League>();

            if (criteria != null && criteria.IsValid())
            {
                leagues = GetData<League>(criteria);
            }

            return leagues;
        }
    }
}