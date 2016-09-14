namespace OWP.Application.Message
{
    using System.Threading.Tasks;
    using AutoMapper;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Utils;

    public interface Repository
    {
        Task<QueryResult> Query(QueryModel model);

        Task UpdateIsViewed(UpdateIsViewedModel model);
    }

    public class RepositoryImp : Repository
    {
        private readonly IMapper mapper;
        private readonly IDynamicRepository repository;
        private readonly ICurrentSession session;

        public RepositoryImp(IMapper mapper, IDynamicRepository repository, ICurrentSession session)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.session = session;
        }

        public async Task<QueryResult> Query(QueryModel model)
        {
            model.UserId = session.UserId;
            var criteria = mapper.Map<QueryCriteria>(model);
            
            var messages = await repository.FetchAsync<MessageModel>(criteria);
            return new QueryResult
            {
                Messages = messages,
                TotalNotViewMessage = criteria.TotalNotViewMessage
            };
        }

        public async Task UpdateIsViewed(UpdateIsViewedModel model)
        {
            var criteria = new UpdateCriteria
            {
                UserId = session.UserId,
                IsWatcher = model.IsWatcher
            };
            
            await repository.ExecuteAsync(criteria);
        }
    }
}