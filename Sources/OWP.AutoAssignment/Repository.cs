namespace OWP.AutoAssignment
{
    using Constant;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Configuration;
    using Fanex.NAP.OWP.Core.Extensions.XMLExtensions;
    using Fanex.NAP.OWP.TaskScheduling.Criteria.EventAssignment;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;
    using Fanex.NAP.OWP.TaskScheduling.Repositories.Interfaces;
    using Models;
    using OWP.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using Utils;

    public interface Repository
    {
        Task RemoveAssignmentByReqId(string requestId);

        Task CreateRequest(CreateRequestCriteria criteria);

        Task<IEnumerable<RequestModel>> GetRequestsNewForArrange();

        Task<IEnumerable<SchedulingRequest>> GetRequests();

        Task<IEnumerable<MatchInfo>> GetMatches(DateTime eventDate);

        Task UpdateStatusRequest(StatusRequestModel model);

        Task<ValueTuple<IEnumerable<LAUserInfo>, IEnumerable<UserWorkingShift>>> GetUsers(DateTime eventDate);

        Task<ValueTuple<IEnumerable<TraderInfo>, IEnumerable<UserWorkingShift>>> GetTraders(DateTime eventDate);

        Task<ResultDataObject> SaveRequest(SaveRequestModel model);

        Task<IEnumerable<EventModel>> GetEventInfo(SchedulingRequest schedulingRequest);

        Task<IEnumerable<AutoAssigneeModel>> GetAutoAssigneesInfo(DateTime eventDate);

        Task<int> GetStatusRequest(string requestId);

        Task<string> GetRequestIsWaiting(DateTime eventDate);

        Task<SchedulingRequest> GetLatestRequest(DateTime eventDate);
    }

    public class RepositoryImp : Repository
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly IEventAssignmentRepository eventAssignmentRepository;

        public RepositoryImp(IDynamicRepository dynamicRepository, IEventAssignmentRepository eventAssignmentRepository)
        {
            this.dynamicRepository = dynamicRepository;
            this.eventAssignmentRepository = eventAssignmentRepository;
        }

        public async Task RemoveAssignmentByReqId(string requestId)
        {
            var criteria = new RemoveRequestCriteria
            {
                RequestId = requestId
            };
            await dynamicRepository.ExecuteAsync(criteria);
        }

        public async Task CreateRequest(CreateRequestCriteria criteria)
        {
            await dynamicRepository.ExecuteAsync(criteria);
        }

        public async Task<IEnumerable<RequestModel>> GetRequestsNewForArrange()
        {
            var criteria = new ApiRequestNewCriteria();
            return await dynamicRepository.FetchAsync<RequestModel>(criteria);
        }

        public async Task<IEnumerable<SchedulingRequest>> GetRequests()
        {
            var criteria = new GetRequestsCriteria();
            var allRequest = await dynamicRepository.FetchAsync<SchedulingRequest>(criteria);
            return allRequest.Any()
                ? allRequest.OrderByDescending(r => r.CreatedDate).ToList()
                : new List<SchedulingRequest>();
        }

        public async Task<IEnumerable<MatchInfo>> GetMatches(DateTime eventDate)
        {
            var criteria = new GetEventsCriteria
            {
                EventDate = eventDate
            };
            
            return await dynamicRepository.FetchAsync<MatchInfo>(criteria);
        }

        public async Task<ValueTuple<IEnumerable<LAUserInfo>, IEnumerable<UserWorkingShift>>> GetUsers(DateTime eventDate)
        {
            var criteria = new GetUsersCriteria
            {
                SiteId = NapSettings.Settings.SiteId,
                EventDate = eventDate
            };
            
            return await dynamicRepository.FetchMultipleAsync<LAUserInfo, UserWorkingShift>(criteria);
        }

        public async Task<ValueTuple<IEnumerable<TraderInfo>, IEnumerable<UserWorkingShift>>> GetTraders(DateTime eventDate)
        {
            var criteria = new GetTradersByDateCriteria
            {
                SiteId = NapSettings.Settings.SiteId,
                EventDate = eventDate
            };

            return await dynamicRepository.FetchMultipleAsync<TraderInfo, UserWorkingShift>(criteria);
        }

        public async Task<ResultDataObject> SaveRequest(SaveRequestModel model)
        {
            var result = new List<ResultDataObject>();
            var criteria = new SaveRequestCriteria
            {
                RequestId = model.RequestId,
                Status = model.Code,
                AutoAssignmentResultDoc = model.Data.ToXML().ToString(SaveOptions.DisableFormatting)
            };
            
            await dynamicRepository.ExecuteAsync(criteria);
            result.Add(new ResultDataObject
            {
                Data = model.RequestId,
                Code = criteria.ErrCode
            });

            return new ResultDataObject
            {
                Code = result.Any(x => x.Code == 0) ? 0 : 1,
                Data = result
            };
        }

        public async Task<IEnumerable<EventModel>> GetEventInfo(SchedulingRequest schedulingRequest)
        {
            var criteria = new MatchGetAllCriteria
            {
                EventDate = schedulingRequest.EventDate,
                MatchStatusIds = AutoAssignmentConst.MatchStatusIds
            };

            return await eventAssignmentRepository.GetEventInformationByEventDate(criteria);
        }

        public async Task<IEnumerable<AutoAssigneeModel>> GetAutoAssigneesInfo(DateTime eventDate)
        {
            var criteria = new GetAutoUserResult
            {
                EventDate = eventDate
            };

            return await dynamicRepository.FetchAsync<AutoAssigneeModel>(criteria);
        }

        public async Task<int> GetStatusRequest(string requestId)
        {
            var criteria = new RequestStatusCriteria
            {
                RequestId = requestId
            };
            var requestStatus = await dynamicRepository.FetchAsync<int>(criteria);
            return requestStatus.FirstOrDefault();
        }

        public async Task UpdateStatusRequest(StatusRequestModel model)
        {
            var criteria = new UpdateStatusRequestCriteria
            {
                RequestId = model.RequestId,
                Status = model.Status
            };
            await dynamicRepository.ExecuteAsync(criteria);
        }

        public async Task<string> GetRequestIsWaiting(DateTime eventDate)
        {
            var criteria = new GetRequestIsWaitingCriteria
            {
                EventDate = eventDate
            };
            var result = await dynamicRepository.FetchAsync<RequestIsWaitingModel>(criteria);
            return result.Any()
                ? string.Join(",", result.Select(req => req.RequestId))
                : string.Empty;
        }

        public async Task<SchedulingRequest> GetLatestRequest(DateTime eventDate)
        {
            var criteria = new GetLatestRequestCriteria
            {
                EventDate = eventDate
            };
            var result = await dynamicRepository.FetchAsync<SchedulingRequest>(criteria);
            return result.FirstOrDefault();
        }
    }
}
