namespace OWP.DailyWorkingShift.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using Repositories;
    using Services;

    [RoutePrefix("api/daily-working-shift")]
    public class DailyWorkingShiftApiController : ApiController
    {
        private readonly Repository repository;
        private readonly ModelService modelService;
        private readonly ICurrentSession currentSession;

        public DailyWorkingShiftApiController(Repository repository, ModelService modelService, ICurrentSession currentSession)
        {
            this.repository = repository;
            this.modelService = modelService;
            this.currentSession = currentSession;
        }

        [Route("query")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<QueryResult> SearchWorkingShiftDaily(QueryModel model)
        {
            var permission = modelService.BuildPermissionViewModel();
            model.Permission = permission;

            if (!model.Permission.DailyWorkingShiftAllSections.IsRead && !model.Permission.DailyWorkingShiftOwnSection.IsRead)
            {
                model.User = currentSession.Username;
            }

            return await repository.Query(model);
        }
    }
}