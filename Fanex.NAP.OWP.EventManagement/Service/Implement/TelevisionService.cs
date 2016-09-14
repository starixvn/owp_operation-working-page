namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Criteria;
    using Interfaces;
    using Model;

    public class TelevisionService : OWPBaseService, ITelevisionService
    {
        public IEnumerable<Television> GetAll()
        {
            IEnumerable<Television> tivis = new List<Television>();
            var criteria = new GetTelevisionCriteria();

            if (criteria.IsValid())
            {
                tivis = GetData<Television>(criteria);
            }

            return tivis;
        }
    }
}