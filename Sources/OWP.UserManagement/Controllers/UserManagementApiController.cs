namespace OWP.UserManagement.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using Services;

    [RoutePrefix("temp/api/user-management")]
    public class TempUserManagementApiController : ApiController
    {
        private readonly UsersService usersService;

        public TempUserManagementApiController(UsersService usersService)
        {
            this.usersService = usersService;
        }

        [NapAuth(FunctionKey = FunctionKeys.UserManagement, Policy = Constant.Policy.Read)]
        [HttpPost]
        [Route("paging")]
        public async Task<IHttpActionResult> GetUsers(QueryModel model)
        {
            var users = await usersService.GetUserPagingAsync(model);
            return Ok(users);
        }
    }
}