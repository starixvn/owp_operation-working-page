namespace OWP.AutoAssignment.Services
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Builder;
    using Criteria;
    using Enum;
    using Fanex.NAP.Core.Web.Session;
    using Models;

    public interface CreateRequestService
    {
        Task CreateRequest(CreateRequestModel model);

        Task<bool> ExistMatchValid(CreateRequestModel model);

        Task<bool> ExistsTraderValid(CreateRequestModel model);

        Task<string> GetRequestIsWaiting(CreateRequestModel model);
    }

    public class CreateRequestServiceImp : CreateRequestService
    {
        private readonly Repository repository;
        private readonly ICurrentSession currentSession;
        private readonly SchedulingUserBuilder schedulingUserBuilder;
        private readonly RequestBuilder requestBuilder;

        public CreateRequestServiceImp(
            Repository repository,
            ICurrentSession currentSession,
            SchedulingUserBuilder schedulingUserBuilder,
            RequestBuilder requestBuilder)
        {
            this.repository = repository;
            this.currentSession = currentSession;
            this.schedulingUserBuilder = schedulingUserBuilder;
            this.requestBuilder = requestBuilder;
        }

        public async Task CreateRequest(CreateRequestModel model)
        {
            var criteria = new CreateRequestCriteria
            {
                RequestId = Guid.NewGuid().ToString(),
                EventDate = model.EventDate,
                Status = StatusRequest.Create,
                CreatorId = currentSession.UserId
            };
            await repository.CreateRequest(criteria);
        }

        public async Task<bool> ExistMatchValid(CreateRequestModel model)
        {
            var matches = await repository.GetMatches(model.EventDate);
            return matches.Any();
        }

        public async Task<bool> ExistsTraderValid(CreateRequestModel model)
        {
            return await ExistsLAUserValid(model) ||
                  (await requestBuilder.GetTradersInfo(model.EventDate)).Any();
        }

        public async Task<bool> ExistsLAUserValid(CreateRequestModel model)
        {
            var usersTubble = await repository.GetUsers(model.EventDate);
            return schedulingUserBuilder.BuildListSchedulingLAUser(usersTubble).Any();
        }

        public async Task<string> GetRequestIsWaiting(CreateRequestModel model)
        {
            var requestIsWaiting = await repository.GetRequestIsWaiting(model.EventDate);
            return requestIsWaiting;
        }
    }
}