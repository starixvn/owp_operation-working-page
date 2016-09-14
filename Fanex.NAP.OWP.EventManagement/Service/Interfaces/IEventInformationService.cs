namespace Fanex.NAP.OWP.EventManagement.Service.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Core.Model;
    using Criteria.EventInfo;
    using Models.EventInfo;

    public interface IEventInformationService
    {
        OWPCommandResult UpdateIsSelected(UpdateIsSelectedCriteria criteria);

        Task<IEnumerable<MatchInfo>> GetEventInformation(GetEventInformationCriteria criteria);

        Task<IEnumerable<MatchInfo>> GetEventInformationByFilterId(GetEventInformationByFilterIdCriteria criteria);
    }
}