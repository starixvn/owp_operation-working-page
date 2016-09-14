namespace OWP.WorkingShift.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using OWP.Constants;
    using Repositories;
    using Services;

    [RoutePrefix("api/working-shift-order")]
    public class WorkingShiftOrderApiController : ApiController
    {
        private readonly WorkingShiftOrderRepository repository;
        private readonly ModelService modelService;

        public WorkingShiftOrderApiController(WorkingShiftOrderRepository repository, ModelService modelService)
        {
            this.repository = repository;
            this.modelService = modelService;
        }

        [Route("")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> UpdateEmployeeWorkingShiftOrder(UpdateEmployeeWorkingShiftOrderModel model)
        {
            model.OrderUserId = modelService.GetOrderUserId();
            var result = await repository.UpdateEmployeeWorkingShiftOrder(model);
            return Ok(result);
        }
    }
}