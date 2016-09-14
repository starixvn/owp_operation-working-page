namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Criteria;
    using Interfaces;
    using Model;

    public class OtherProviderService : OWPBaseService, IOtherProviderService
    {
        public IEnumerable<OtherProvider> GetAll()
        {
            IEnumerable<OtherProvider> otherProviders = new List<OtherProvider>();
            var criteria = new GetOtherProviderCriteria();

            if (criteria.IsValid())
            {
                otherProviders = GetData<OtherProvider>(criteria);
            }

            return otherProviders;
        }
    }
}