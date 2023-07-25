using System.Threading.Tasks;
using Fanex.Data.Repository;
using Fanex.NAP.Core.Web.Session;
using OWP.Criteria;

namespace OWP.Services
{
    public interface AccessCounter
    {
        Task UpdateCounter(string function);
    }

    public class AccessCounterImp: AccessCounter
    {
        readonly ICurrentSession currentSession;

        private readonly IDynamicRepository dynamicRepository;

        public AccessCounterImp(ICurrentSession currentSession, IDynamicRepository dynamicRepository)
        {
            this.currentSession = currentSession;
            this.dynamicRepository = dynamicRepository;
        }

        public async Task UpdateCounter(string function) =>
            await dynamicRepository.ExecuteAsync(new UpdateAccessCounterCriteria
            {
                ActorId = currentSession.UserId,
                FunctionName = function
            });
    }
}
