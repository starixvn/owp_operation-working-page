namespace OWP.MessageManagement
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Models;

    [RoutePrefix("api/message_management")]
    public class MessageManagementApiController : ApiController
    {
        private readonly Repository repository;

        public MessageManagementApiController(Repository repository)
        {
            this.repository = repository;
        }

        [Route("search")]
        [HttpPost]
        public async Task<MessageBoxViewModel> GetByUserIdWithPaging([FromBody]MessageBoxQueryParam param)
        {
            return await repository.GetByUserIdWithPaging(param);
        }

        [Route("update_read_status")]
        [HttpPut]
        public async Task<object> UpdateReadStatus([FromBody]MessageBoxUpdateParam model)
        {
            await repository.UpdateReadStatus(model);

            return new { msg = "OK" };
        }
    }
}