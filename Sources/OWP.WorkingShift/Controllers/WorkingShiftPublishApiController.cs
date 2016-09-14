namespace OWP.WorkingShift.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using OWP.Constants;
    using Repositories;
    using Utils;

    [RoutePrefix("api/working-shift-publish")]
    public class WorkingShiftPublishApiController : ApiController
    {
        private readonly WorkingShiftPublishRepository repository;

        public WorkingShiftPublishApiController(WorkingShiftPublishRepository repository)
        {
            this.repository = repository;
        }

        [Route("")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> PublishWeeklyWorkingShift(PublishWeeklyWorkingShiftModel model)
        {
            IEnumerable<GroupWorkingShiftByUserModel> groupByUser = new List<GroupWorkingShiftByUserModel>();
            var result = await repository.PublishSection(model);
            var getSectionPublish = await repository.GetSectionPublishWorkingShift(model.FromDate, model.ToDate, model.SectionId.ToString());
            result.Data = getSectionPublish.FirstOrDefault();
            if (model.IsPublished)
            {
                var queryModel = new WorkingShiftQueryBySectionModel
                {
                    SectionId = model.SectionId.ToString(),
                    FromDate = model.FromDate, 
                    ToDate = model.FromDate.AddDays(6)
                };
                var weeklyWorkingShiftForSection = await repository.GetWeeklyWorkingShiftBySection(queryModel);
                groupByUser = weeklyWorkingShiftForSection.GroupWorkingShiftByUser(queryModel.FromDate, queryModel.ToDate);
            }


            return Ok(new { result, groupByUser });
        }
    }
}