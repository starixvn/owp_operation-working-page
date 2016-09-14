namespace OWP.Application.Authorize
{
    using System.Threading.Tasks;
    using System.Web.Http;

    [RoutePrefix("api/application/authorize")]
    public class AuthorizeController : ApiController
    {
        private readonly Service service;

        public AuthorizeController(Service service)
        {
            this.service = service;
        }

        [Route("")]
        [HttpPost]
        public async Task<AuthorizeResult> Authorize(AuthorizeModel model)
        {
            return await service.Authorize(model);
        }
    }
}