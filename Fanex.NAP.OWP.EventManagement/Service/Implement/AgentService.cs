namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Criteria;
    using Interfaces;
    using Model;

    public class AgentService : OWPBaseService, IAgentService
    {
        public IEnumerable<Agent> GetAll()
        {
            IEnumerable<Agent> agents = new List<Agent>();
            var criteria = new GetAgentCriteria();

            if (criteria.IsValid())
            {
                agents = GetData<Agent>(criteria);
            }

            return agents;
        }
    }
}