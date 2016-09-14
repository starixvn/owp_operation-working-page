namespace OWP.WorkingShift.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using OWP.Constants;
    using Repositories;

    [RoutePrefix("api/working-shift-timezone")]
    public class WorkingShiftTimezoneApiController : ApiController
    {
        private readonly WorkingShiftTimezoneSettingRepository repository;

        public WorkingShiftTimezoneApiController(WorkingShiftTimezoneSettingRepository repository)
        {
            this.repository = repository;
        }

        [Route("")]
        [HttpPut]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement_ShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> UpdateTimeZoneSetting(TimezoneUpdateModel model)
        {
            var result = await repository.Update(model);
            return Ok(result);
        }
    }
}