namespace OWP.WeeklyWorkingShift.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Models;
    using Repositories;

    [RoutePrefix("api/weekly-working-shift")]
    public class WeeklyWorkingShiftIFrameApiController : ApiController
    {
        private readonly Repository weeklyWorkingShiftRepository;

        public WeeklyWorkingShiftIFrameApiController(Repository weeklyWorkingShiftRepository)
        {
            this.weeklyWorkingShiftRepository = weeklyWorkingShiftRepository;
        }


        [Route("search-iframe")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> SearchWorkingShiftWeeklyIFrame(QueryModel model)
        {
            model.IsFrame = true;
            model.OrderUserId = 0;
            var result = await weeklyWorkingShiftRepository.SearchWorkingShiftWeekly(model);
            return Ok(result);
        }

    }
}