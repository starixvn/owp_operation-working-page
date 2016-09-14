
namespace Fanex.NAP.OWP.EventManagement.Repositories.Interfaces
{
    using System.Collections.Generic;
    using Criteria.EventInfo;
    using Models.EventInfo;
    using System.Threading.Tasks;

    public interface IEventInformationRepository
    {
        IEnumerable<MatchInfo> GetEventInformation(GetEventInformationCriteria criteria);

        IEnumerable<MatchInfo> GetEventInformationByFilterId(GetEventInformationByFilterIdCriteria criteria);

        Task<IEnumerable<TicketInfo>> GetTicketsByOwpMatchId(GetTicketListCriteria criteria);
    }
}