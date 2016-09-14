namespace Fanex.NAP.OWP.TaskScheduling.Controllers
{
    using Fanex.NAP.Core.Web.Session;
    using global::OWP.Constants;
    using global::OWP.EventAssignment.Permission;
    using Models.EventAssignment;
    using NAP.Core.Business;
    using NAP.Core.Web.Attribute;
    using Service.Interfaces;
    using System;
    using System.CodeDom.Compiler;
    using System.Diagnostics.CodeAnalysis;
    using System.Globalization;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class EventAssignmentController : Controller
    {
        private readonly IEventAssignmentService eventAssignmentService;
        private readonly EventAssignmentPermission eventAssignmentPermission;

        public EventAssignmentController(IEventAssignmentService eventAssignmentService,
            EventAssignmentPermission eventAssignmentPermission)
        {
            this.eventAssignmentService = eventAssignmentService;
            this.eventAssignmentPermission = eventAssignmentPermission;
        }

        [SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed. Suppression is OK here.")]
        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public async Task<FileResult> DownloadAssignment(DateTime date)
        {
            var lastUpdated = (await eventAssignmentService.GetLastUpdated(date));
            var eventDownLoadModel = new DownLoadExportModel
            {
                EventDate = date,
                Username = string.Empty,
                MatchStatusIds = string.Empty,
                UploadDateTime = lastUpdated.UploadDateTime,
                PermissionModel = eventAssignmentPermission.BuildPermission()
            };
            return await DownLoadExport(eventDownLoadModel);
        }

        [SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed. Suppression is OK here.")]
        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Read)]
        public async Task<FileResult> DownloadLiveGameAssignment(DateTime date, string userName, string matchStatusIds, int syncLiveStatus)
        {
            var lastUpdated = (await eventAssignmentService.GetLastUpdated(date));
            var eventExportModel = new DownLoadExportModel
            {
                EventDate = date,
                Username = userName,
                MatchStatusIds = matchStatusIds,
                UploadDateTime = lastUpdated.UploadDateTime,
                SyncLiveStatus = syncLiveStatus,
                PermissionModel = eventAssignmentPermission.BuildPermission()
            };

            return await DownLoadExport(eventExportModel);
        }

        public async Task<FileResult> DownLoadExport(DownLoadExportModel model)
        {
            using (var tmpFiles = new TempFileCollection())
            {
                var file = tmpFiles.AddExtension("xlsx");
                using (var fileStream = System.IO.File.Open(file, FileMode.OpenOrCreate))
                {
                    await eventAssignmentService.DownloadAssignment(model, fileStream);
                }

                var fileName = string.Format(CultureInfo.InvariantCulture, "Assignment - {0}.xlsx", model.EventDate.ToString("yyyyMMdd", CultureInfo.InvariantCulture));
                return File(System.IO.File.Open(file, FileMode.OpenOrCreate), "application/vnd.ms-excel", fileName);
            }
        }
    }
}
