namespace OWP.AutoAssignment
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Constant;
    using Models;
    using Olympus.WebApi.Results;
    using Services;
    using TraderVisualization.Services;
    using Visualization.Services;

    [RoutePrefix("api/auto-assignment")]
    [AllowAnonymous]
    public class AutoAssignmentController : ApiController
    {
        private readonly Repository repository;
        private readonly ExportService exportService;
        private readonly CreateRequestService createRequestService;
        private readonly VisualizationExportService visualizationService;
        private readonly TraderExportService traderExportService;

        public AutoAssignmentController(CreateRequestService createRequestService,
            Repository repository,
            ExportService exportService,
            VisualizationExportService visualizationService,
            TraderExportService traderExportService)
        {
            this.createRequestService = createRequestService;
            this.repository = repository;
            this.exportService = exportService;
            this.visualizationService = visualizationService;
            this.traderExportService = traderExportService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IEnumerable<SchedulingRequest>> GetRequests()
            => await repository.GetRequests();

        [Route("create-request")]
        [HttpPost]
        public async Task CreateRequest(CreateRequestModel model)
        {
            var existsMatchValid = await createRequestService.ExistMatchValid(model);
            var existsTraderValid = await createRequestService.ExistsTraderValid(model);
            var requestIdIsWaiting = await createRequestService.GetRequestIsWaiting(model);
            if (!string.IsNullOrWhiteSpace(requestIdIsWaiting))
            {
                var message = string.Format(AutoAssignmentConst.ExistsRequestIdIsWaiting, requestIdIsWaiting);
                HandleBadRequest(message);
            }
            if (!existsMatchValid)
            {
                HandleBadRequest(AutoAssignmentConst.NoFindAnyMatchValidOnSelectedDate);
            }
            if (!existsTraderValid)
            {
                HandleBadRequest(AutoAssignmentConst.NoFindAnyTraderValidOnSelectedDate);
            }
            await createRequestService.CreateRequest(model);
        }

        [Route("check-request")]
        [HttpPost]
        public async Task<int> CheckRequest(CheckRequestModel model)
            => await repository.GetStatusRequest(model.RequestId);

        [Route("remove-request")]
        [HttpPost]
        public async Task RemoveAssignmentByReqId(CheckRequestModel model)
           => await repository.RemoveAssignmentByReqId(model.RequestId);

        [Route("export-excel")]
        [HttpGet]
        public async Task<HttpResponseMessage> ExportExcel(string requestId)
        {
            using (var stream = new MemoryStream())
            {
                var requests = await repository.GetRequests();
                var request = requests.First(x => x.RequestId.Equals(requestId));
                await exportService.Export(stream, request);
                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = $"Auto_Assignment_{request.EventDate:yyyyMMdd}.xlsx"
                };
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/xlsx");
                return result;
            }
        }

        [Route("export-visualization")]
        [HttpGet]
        public async Task<IHttpActionResult> ExportVisualization(DateTime eventDate)
        {

            var request = await repository.GetLatestRequest(eventDate);

            var excelPackage = await visualizationService.CreateExcelPackage(request);
            var fileName = $"LA Time Table - {request.EventDate:yyyyMMdd}.xlsx";

            return new EpplusExcelResult(excelPackage) { FileName = fileName };
        }

        [Route("export-trader")]
        [HttpGet]
        public async Task<HttpResponseMessage> ExportTrader(DateTime eventDate)
        {
            var request = await repository.GetLatestRequest(eventDate);

            var traderExport = await traderExportService.ExportExcel(request);

            return FileResult(traderExport.FileContent, traderExport.FileContentType, traderExport.FileName);
        }

        private void HandleBadRequest(string message)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(message)
            };
            throw new HttpResponseException(resp);
        }

        private HttpResponseMessage FileResult(byte[] content, string contentType, string fileName)
        {
            var result = new HttpResponseMessage
            {
                Content = new ByteArrayContent(content),
                StatusCode = HttpStatusCode.OK,
            };

            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = fileName
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            return result;
        }
    }
}
