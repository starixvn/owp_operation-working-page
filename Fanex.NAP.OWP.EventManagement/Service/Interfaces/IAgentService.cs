namespace Fanex.NAP.OWP.EventManagement.Service.Interfaces
{
    using System.Collections.Generic;
    using Model;

    public interface IAgentService
    {
        IEnumerable<Agent> GetAll();
    }
}
