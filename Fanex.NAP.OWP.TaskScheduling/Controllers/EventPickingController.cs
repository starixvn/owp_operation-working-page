using Fanex.NAP.OWP.Core.Configuration;
using Olympus.InfoSiteClient;
using Olympus.InfoSiteClient.Models;

namespace Fanex.NAP.OWP.TaskScheduling.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Epplus.Mapper.Extensions;
    using global::OWP.Constants;
    using global::OWP.Services;
    using Models.EventPicking;
    using NAP.Core.Business;
    using NAP.Core.Web.Attribute;
    using OfficeOpenXml;
    using Service.Implement;
    using ViewModels.EventPicking;
    using System.Configuration;

    public class EventPickingController : Controller
    {
        private readonly LeagueSettingService leagueSettingService;
        private readonly EventPickingService eventPickingService;
        private readonly AccessCounter accessCounter;

        public EventPickingController(LeagueSettingService leagueSettingService, EventPickingService eventPickingService, AccessCounter accessCounter)
        {
            this.leagueSettingService = leagueSettingService;
            this.eventPickingService = eventPickingService;
            this.accessCounter = accessCounter;
        }

        [NapAuth(FunctionKey = FunctionKeys.EventPicking, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> Index()
        {
            var model = new EventPickingViewModel
            {
                Date = DateTime.Now
            };
            var functionName = ConfigurationManager.AppSettings["EventPicking"];
            await accessCounter.UpdateCounter(functionName);

            return View("Index", model);
        }

        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.EventPicking, Policy = Constant.Policy.Read)]
        public async Task<FileResult> SyncedEventPickingExcel(DateTime date)
        {
            var templatePath = Server.MapPath("~/Areas/TaskScheduling/ExcelTemplates/EventPicking.xlsx");
            var functionName = ConfigurationManager.AppSettings["LiveGameAssignment_Export_Event_Picking"];
            await accessCounter.UpdateCounter(functionName);
            return await DownloadExcel(templatePath, date);
        }

        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.EventPicking, Policy = Constant.Policy.Read)]
        public async Task<FileResult> ExportEventPicking(DateTime date)
        {
            var templatePath = Server.MapPath("~/Areas/TaskScheduling/ExcelTemplates/EventPickingNewFormat.xlsx");
            return await eventPickingService.ExportEventPicking(date, templatePath);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.EventPicking, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> EventPickingExcel(EventPickingViewModel model)
        {
            var functionName = ConfigurationManager.AppSettings["EventPicking_Export_Excel"];
            await accessCounter.UpdateCounter(functionName);
            var date = model.Date;
            var templatePath = Server.MapPath("~/Areas/TaskScheduling/ExcelTemplates/EventPicking.xlsx");

            return await DownloadExcel(templatePath, date);
        }

        private async Task<FileStreamResult> DownloadExcel(string templatePath, DateTime date)
        {
            var nextDate = date.AddDays(1);
            var mainMatches = GetMainMatch(date, nextDate);
            var pullingChildMatch = new PullingChildMatch();
            var childMatches = pullingChildMatch.Query(AppSettings.InfoSiteAPI, date, nextDate);
            var matches = CombineSubMatch(mainMatches, childMatches);
            var syncedMatches = await leagueSettingService.ApplyMatchMaxbet(matches);
            using (var stream = new FileStream(templatePath, FileMode.Open, FileAccess.Read))
            {
                var excelPackage = new ExcelPackage(stream);
                var templateSheet = excelPackage.Workbook.Worksheets.First();
                templateSheet.ApplyVertical(syncedMatches, 2);

                var fileStream = new MemoryStream();
                excelPackage.SaveAs(fileStream);
                fileStream.Position = 0;
                const string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                var fsr = new FileStreamResult(fileStream, contentType);
                fsr.FileDownloadName = $"Event Picking-{date:yyyy-MM-dd}.xlsx";
                return fsr;
            }
        }

        private static List<MatchExporting> GetMainMatch(DateTime fromDate, DateTime toDate)
        {
            var timeFrom = fromDate.AddHours(12);
            var timeTo = toDate.AddHours(12);
            var pullingMainMatch = new PullingMainMatch();
            var mainRawMatches = new List<CommonMatchEx>();
            var date = fromDate;
            while (date <= toDate)
            {
                mainRawMatches.AddRange(pullingMainMatch.Query(AppSettings.InfoSiteAPI, date, date, DateTime.Today.AddYears(-10)));
                date = date.AddDays(1);
            }

            var mainMatches = mainRawMatches
                                .Select(e => new MatchExporting(e))
                                .Where(e => e.GameDate >= timeFrom && e.GameDate < timeTo)
                                .ToList();
            return mainMatches;
        }

        private static List<MatchExporting> CombineSubMatch(IList<MatchExporting> mainMatches, IList<ChildMatch> childMatches)
        {
            var result = new List<MatchExporting>();
            foreach (var mainMatch in mainMatches)
            {
                result.Add(mainMatch);
                var childMatchesOfThisMainMatch = childMatches.Where(m => m.match_id == mainMatch.InfoSiteMatchId);
                foreach (var childMatch in childMatchesOfThisMainMatch)
                {
                    var match = new MatchExporting(childMatch);
                    result.Add(match);
                }
            }
            return result;
        }
    }
}