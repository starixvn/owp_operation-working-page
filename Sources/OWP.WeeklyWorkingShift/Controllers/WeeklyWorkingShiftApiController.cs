namespace OWP.WeeklyWorkingShift.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using Repositories;
    using Services;
    using WorkingShift.Services;

    [RoutePrefix("api/weekly-working-shift")]
    public class WeeklyWorkingShiftApiController : ApiController
    {
        private readonly Repository weeklyWorkingShiftRepository;
        private readonly ModelService modelService;
        private readonly ImportService importService;
        private readonly ExportService exportService;
        private readonly ICurrentSession currentSession;
        private readonly ViewLogService viewLogService;

        public WeeklyWorkingShiftApiController(
            Repository weeklyWorkingShiftRepository,
            ModelService modelService,
            ExportService exportService,
            ImportService importService,
            ViewLogService viewLogService,
            ICurrentSession currentSession
            )
        {
            this.weeklyWorkingShiftRepository = weeklyWorkingShiftRepository;
            this.modelService = modelService;
            this.exportService = exportService;
            this.viewLogService = viewLogService;
            this.importService = importService;
            this.currentSession = currentSession;
        }

        [Route("search")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Read)]
        public async Task<IHttpActionResult> SearchWorkingShiftWeekly(QueryModel model)
        {
            model.IsFrame = false;
            model.Permission = modelService.BuildPermissionViewModel();
            model.OrderUserId = modelService.GetOrderUserId(model.Permission);
            if (!model.Permission.WorkingShiftManagementOwnSection.IsRead && !model.Permission.WorkingShiftManagementAllSections.IsRead)
            {
                model.User = currentSession.Username;
            }

            var result = await weeklyWorkingShiftRepository.SearchWorkingShiftWeekly(model);
            return Ok(result);
        }

        [Route("export")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ExportWorkingShift([FromUri]ExportModel model)
        {
            model.Permission = modelService.BuildPermissionViewModel();
            model.OrderUserId = modelService.GetOrderUserId(model.Permission);
            using (var stream = new MemoryStream())
            {
                await exportService.Export(stream, model);
                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = model.GetExportFileName()
                };
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/xlsx");
                return result;
            }
        }

        [Route("validate")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> ValidateWorkingShift()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return StatusCode(HttpStatusCode.UnsupportedMediaType);
            }

            if (HttpContext.Current.Request.Files.Count > 0)
            {
                var file = HttpContext.Current.Request.Files[0];
                var result = await importService.Validate(file.InputStream);
                return Ok(result);
            }

            return StatusCode(HttpStatusCode.BadRequest);
        }

        [Route("upload")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> ImportWorkingShift(IList<WorkingShiftImportEntity> shifts)
        {
            await importService.Import(shifts);
            return Ok();
        }

        [Route("viewlog")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Read)]
        public async Task<string> ViewLog(ViewLogModel model)
        {
            return await viewLogService.ViewLog(model);
        }
    }
}