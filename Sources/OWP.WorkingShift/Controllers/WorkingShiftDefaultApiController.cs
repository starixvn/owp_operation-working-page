namespace OWP.WorkingShift.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using OWP.Constants;
    using Repositories;

    [RoutePrefix("api/working-shift-default")]
    public class WorkingShiftDefaultApiController : ApiController
    {
        private readonly WorkingShiftDefaultRepository repository;

        public WorkingShiftDefaultApiController(WorkingShiftDefaultRepository repository)
        {
            this.repository = repository;
        }

        [Route("")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> UpdateDefaultShift(UpdateDefaultShiftModel model)
        {
            await repository.UpdateDefaultShift(model);

            return Ok();
        }
    }
}