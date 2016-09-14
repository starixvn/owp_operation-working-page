
namespace OWP.AutoAssignment.Visualization
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
        Task<IEnumerable<AssignmentModel>> GetAssignments(DateTime eventDate, List<int> userIds);

        Task<(IEnumerable<UserShift>, IEnumerable<InfoSiteAutoAssignment>)> GetUsersByDate(DateTime eventDate, string requestId);

        Task<IEnumerable<AssignmentModel>> GetAutoAssignmentResult(string requestId);

        Task<IEnumerable<int>> GetUserInfoFromNAPUserControl();

        Task<IEnumerable<int>> GetCustInfoFromDB02();
    }

    public class RepositoryImp : Repository
    {
        private readonly IDynamicRepository dynamicRepository;

        public RepositoryImp(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public async Task<IEnumerable<AssignmentModel>> GetAssignments(DateTime eventDate, List<int> userIds)
        {
            var criteria = new GetAssignmentsCriteria
            {
                EventDate = eventDate,
                UserIds = string.Join(",", userIds)
            };

            return await dynamicRepository.FetchAsync<AssignmentModel>(criteria);
        }

        public async Task<(IEnumerable<UserShift>, IEnumerable<InfoSiteAutoAssignment>)> GetUsersByDate(DateTime eventDate, string requestId)
            => await dynamicRepository.FetchMultipleAsync<UserShift, InfoSiteAutoAssignment>(new GetUsersByDateCriteria { EventDate = eventDate, RequestId = requestId });

        public async Task<IEnumerable<AssignmentModel>> GetAutoAssignmentResult(string requestId)
        {
            var criteria = new GetAutoAssignmentResultCriteria { RequestId = requestId };
            return await dynamicRepository.FetchAsync<AssignmentModel>(criteria);
        }

        public async Task<IEnumerable<int>> GetCustInfoFromDB02()
            => await dynamicRepository.FetchAsync<int>(new GetCustInfoFromDB02Criteria());

        public async Task<IEnumerable<int>> GetUserInfoFromNAPUserControl()
            => await dynamicRepository.FetchAsync<int>(new GetUserInfoFromNAPUserControlCriteria { SiteId = NapSettings.Settings.SiteId });
    }
}