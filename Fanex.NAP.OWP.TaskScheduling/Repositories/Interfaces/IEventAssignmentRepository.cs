namespace Fanex.NAP.OWP.TaskScheduling.Repositories.Interfaces
{
    using Data.Repository;
    using Models.EventAssignment;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IEventAssignmentRepository
    {
        Task<IEnumerable<EventModel>> GetEventInformationByEventDate(ICriteria criteria);
    }
}
