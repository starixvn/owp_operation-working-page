namespace OWP.MessageManagement
{
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;

    public interface Repository
    {
        Task<MessageBoxViewModel> GetByUserIdWithPaging(MessageBoxQueryParam param);

        Task UpdateReadStatus(MessageBoxUpdateParam model);
    }

    public class RepositoryImp : Repository
    {
        private readonly IMapper mapper;
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;

        public RepositoryImp(IMapper mapper, IDynamicRepository dynamicRepository, ICurrentSession currentSession)
        {
            this.mapper = mapper;
            this.dynamicRepository = dynamicRepository;
            this.currentSession = currentSession;
        }

        public async Task<MessageBoxViewModel> GetByUserIdWithPaging(MessageBoxQueryParam param)
        {
            var criteria = mapper.Map<MessageBoxQueryCriteria>(param);
            criteria.UserId = currentSession.UserId;
            var messages = await dynamicRepository.FetchAsync<MessageModel>(criteria);
            return new MessageBoxViewModel
            {
                Messages = messages.ToList()
            };
        }

        public async Task UpdateReadStatus(MessageBoxUpdateParam model)
        {
            var criteria = new MessageBoxUpdateCriteria
            {
                UserId = currentSession.UserId,
                MessageId = model.MessageId
            };

            await dynamicRepository.ExecuteAsync(criteria);
        }
    }
}