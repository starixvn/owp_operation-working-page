namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Criteria;
    using Interfaces;
    using Model;

    public class ProviderService : OWPBaseService, IProviderService
    {
        public IEnumerable<Provider> GetAll()
        {
            IEnumerable<Provider> providers = new List<Provider>();
            var criteria = new GetProviderCriteria();

            if (criteria.IsValid())
            {
                providers = GetData<Provider>(criteria);
            }

            return providers;
        }
    }
}