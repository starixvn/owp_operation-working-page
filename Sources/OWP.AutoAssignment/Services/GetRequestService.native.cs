namespace OWP.AutoAssignment.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Builder;
    using Models;

    public interface GetRequestService
    {
        Task<IEnumerable<RequestSender>> GetNewRequestSender();
    }

    public class GetRequestServiceImp : GetRequestService
    {
        private readonly Repository repository;
        private readonly RequestBuilder requestBuilder;

        public GetRequestServiceImp(
            Repository repository,
            RequestBuilder requestBuilder)
        {
            this.repository = repository;
            this.requestBuilder = requestBuilder;
        }

        public async Task<IEnumerable<RequestSender>> GetNewRequestSender()
        {
            var request = await repository.GetRequestsNewForArrange();
            return await requestBuilder.BuildListRequestSenderForNewRequest(request);
        }
    }
}