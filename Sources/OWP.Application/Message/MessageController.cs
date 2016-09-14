namespace OWP.Application.Message
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Services;

    [RoutePrefix("api/application/message")]
    public class MessageController : ApiController
    {
        private readonly Repository repository;
        private readonly NotificationService notificationService;

        public MessageController(Repository repository, NotificationService notificationService)
        {
            this.repository = repository;
            this.notificationService = notificationService;
        }

        [Route("")]
        [HttpGet]
        public async Task<QueryResult> Query([FromUri]QueryModel model)
        {
            return await repository.Query(model);
        }

        [Route("")]
        [HttpPut]
        public async Task UpdateIsViewed(UpdateIsViewedModel model)
        {
            await repository.UpdateIsViewed(model);
        }

        [Route("notify")]
        [HttpPost]
        public async Task Notify(string sessionId)
        {
            await notificationService.Notify(sessionId);
        }
    }
}