namespace OWP.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Models;

    public interface ResourceRepository
    {
        IList<UserLocation> GetAllLocations();

        IEnumerable<ReferenceResource> GetAllReferenceResource();

        Task<IList<ReferenceResource>> GetResourceByName(string resourceName);

        Task<IList<ReferenceResource>> GetResourceByNameWithNone(string resourceName);
    }

    public class ResourceRepositoryImp : ResourceRepository
    {
        private readonly IDynamicRepository dynamicRepository;

        public ResourceRepositoryImp(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public IList<UserLocation> GetAllLocations()
        {
            return new List<UserLocation>
            {
                new UserLocation { LocationName = "CTI", LocationCode = "CTI" },
                new UserLocation { LocationName = "SMS", LocationCode = "SMS" },
                new UserLocation { LocationName = "WAH HCMC", LocationCode = "WAH HCMC" },
                new UserLocation { LocationName = "WAH MAL", LocationCode = "WAH MAL" },
                new UserLocation { LocationName = "WAH MNL", LocationCode = "WAH MNL" },
                new UserLocation { LocationName = "None", LocationCode = "None" }
            };
        }

        public IEnumerable<ReferenceResource> GetAllReferenceResource()
        {
            var criteria = new GetAllRefResourceCriteria();
            return dynamicRepository.Fetch<ReferenceResource>(criteria);
        }

        public async Task<IList<ReferenceResource>> GetResourceByName(string resourceName)
        {
            var criteria = new GetRefResourceByNameCriteria { RefName = resourceName };
            return (await dynamicRepository.FetchAsync<ReferenceResource>(criteria)).ToList();
        }

        public async Task<IList<ReferenceResource>> GetResourceByNameWithNone(string resourceName)
        {
            var resources = (await GetResourceByName(resourceName)).ToList();
            resources.Add(new ReferenceResource
            {
                ResourceId = 0,
                Value = "None"
            });

            return resources;
        }
    }
}