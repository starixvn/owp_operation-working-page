namespace OWP.AutoAssignment.TraderVisualization
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Configuration;
    using Models;

    public interface Repository
    {
        Task<IEnumerable<TraderInfo>> GetTradersByDate(DateTime eventDate);

        Task<IEnumerable<AssignmentInfo>> GetAssignmentInfos(string requestId);

        Task<IEnumerable<int>> GetUserIdFromDb02();

        Task<IEnumerable<int>> GetUserIdFromNapUser();

    }

    public class RepositoryImp : Repository
    {
        private readonly IDynamicRepository dynamicRepository;

        public RepositoryImp(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public async Task<IEnumerable<TraderInfo>> GetTradersByDate(DateTime eventDate)
            => await dynamicRepository.FetchAsync<TraderInfo>(new GetTraderByDateCriteria { EventDate = eventDate });

        public async Task<IEnumerable<AssignmentInfo>> GetAssignmentInfos(string requestId)
        {
            var criteria = new GetAutoAssignmentCriteria
            {
                RequestId = requestId
            };

            return await dynamicRepository.FetchAsync<AssignmentInfo>(criteria);
        }

        public async Task<IEnumerable<int>> GetUserIdFromDb02()
            => await dynamicRepository.FetchAsync<int>(new GetUserIdFromDb02Criteria());

        public async Task<IEnumerable<int>> GetUserIdFromNapUser()
            => await dynamicRepository.FetchAsync<int>(new GetUserIdFromNapUserCriteria { SiteId = NapSettings.Settings.SiteId });

    }
}
