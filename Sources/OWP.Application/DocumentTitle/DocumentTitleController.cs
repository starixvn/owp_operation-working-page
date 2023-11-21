using System.Threading.Tasks;
using System.Web.Http;
using Fanex.NAP.Core.Web.Session;

namespace OWP.Application.DocumentTitle
{
    [RoutePrefix("api/application/title")]
    public class DocumentTitleController : ApiController
    {
        private readonly DocumentTitleRepository repository;

        private readonly ICurrentSession currentSession;

        public DocumentTitleController(DocumentTitleRepository repository, ICurrentSession currentSession)
        {
            this.repository = repository;
            this.currentSession = currentSession;
        }

        [HttpGet]
        [Route("unread-message")]
        public async Task<int> CountUnreadMessage()
            => await repository.CountUnreadMessage(new CountUnreadMessageCriteria
            {
                UserId = currentSession.UserId
            });
    }
}
