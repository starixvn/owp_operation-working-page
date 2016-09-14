namespace Fanex.NAP.OWP.EventManagement.Service.Interfaces
{
    using System.Collections.Generic;
    using Criteria.League;
    using Model;

    public interface ILeagueManagementService
    {
        IEnumerable<League> GetLeague(GetLeagueCriteria criteria);
    }
}