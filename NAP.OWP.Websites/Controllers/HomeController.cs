using System.Net.Http;

namespace NAP.OWP.Websites.Controllers
{
    using Fanex.Caching;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using global::OWP.Application.Header;
    using global::OWP.Constants;
    using global::OWP.Services;
    using System;
    using System.Configuration;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        private readonly Service headerService;
        private readonly PermissionService permissionService;
        private readonly ICache cache;
        private readonly ICurrentSession session;
        private readonly AccessCounter accessCounter;

        public HomeController(Service headerService, PermissionService permissionService, ICache cache,
            ICurrentSession session, AccessCounter accessCounter)
        {
            this.headerService = headerService;
            this.permissionService = permissionService;
            this.cache = cache;
            this.session = session;
            this.accessCounter = accessCounter;
        }

        public async Task<ActionResult> Index() => await TaskList();

        [AllowAnonymous]
        public string GetInfositeMatchesJson(string ip, DateTime date)
        {
            var formattedDate = date.ToString("yyyy-MM-dd");
            var request = $"{ip}/api/EventSchedule/getEventsByDate?rd_checked=true&date_from={formattedDate}&date_to={formattedDate}";
            
            var response = new HttpClient().GetAsync(request).Result;

            return response.IsSuccessStatusCode ? response.Content.ReadAsStringAsync().Result : string.Empty;
        }

        [ChildActionOnly]
        public async Task<ActionResult> Header(string title)
        {
            if (session.UserId == 0)
            {
                return Content("Unauthorized Request");
            }

            var headerViewModel = new HeaderViewModel
            {
                Title = title,
                Header = await headerService.Query(),
                HasDetailInformationPermission =
                    permissionService.HasRight(FunctionKeys.DetailsInformation, Constant.Policy.Read),
                HasQuickSearchPermission = permissionService.HasRight(FunctionKeys.QuickSearch, Constant.Policy.Read)
            };

            return PartialView("~/Views/Shared/_Header.cshtml", headerViewModel);
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Collect()
        {
#pragma warning disable S1215 // "GC.Collect" should not be called
            GC.Collect();
#pragma warning restore S1215 // "GC.Collect" should not be called
            return Content("OK");
        }

        [AllowAnonymous]
        public ActionResult MountUM()
        {
            bool mountedUMPage;
            cache.TryGet("OWP_UM_Mounted", out mountedUMPage);
            ViewBag.UMFlag = mountedUMPage;
            return View("MountUM");
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult MountUMToggle()
        {
            bool mountedUMPage;
            cache.TryGet("OWP_UM_Mounted", out mountedUMPage);
            mountedUMPage = !mountedUMPage;
            var cachePolicy = new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromHours(8));

            cache.Set("OWP_UM_Mounted", mountedUMPage, cachePolicy);
            return Content(mountedUMPage.ToString());
        }

        [Route("EventManagement/LiveDetail/Index/{id:int}")]
        [NapAuth(FunctionKey = FunctionKeys.DetailsInformation, Policy = Constant.Policy.Read)]
        public ActionResult LiveDetail(int? id) => View("~/wwwroot/live-detail/server.cshtml");

        [Route("UserProfile/NotificationSetting")]
        public ActionResult NotificationSetting() => View("~/wwwroot/notification-setting/server.cshtml");

        [Route("EventAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> EventAssignment()
        {
            var functionName = ConfigurationManager.AppSettings["LiveGameAssignment"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/event-assignment/server.cshtml");
        }

        [Route("EventAssignmentNew")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> EventAssignmentNew()
        {
            var functionName = ConfigurationManager.AppSettings["LiveGameAssignment"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/event-assignment-new/server.cshtml");
        }

        [Route("EventUpload")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public async Task<ActionResult> EventUpload()
        {
            var functionName = ConfigurationManager.AppSettings["EventUploadNew"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/event-upload/server.cshtml");
        }

        [Route("AutoAssignment")]
        public async Task<ActionResult> AutoAssignment()
        {
            var functionName = ConfigurationManager.AppSettings["AutoAssignment"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/auto-assignment/server.cshtml");
        }

        [Route("ResourceManagement")]
        [NapAuth(FunctionKey = FunctionKeys.UserManagement, Policy = Constant.Policy.Read)]
        public ActionResult ResourceManagement() => View("~/wwwroot/resource-management/server.cshtml");

        [Route("MessageBoxManagement")]
        public ActionResult MessageBoxManagement() => View("~/wwwroot/messagebox-management/server.cshtml");

        [Route("OddsCompiler")]
        [NapAuth(FunctionKey = FunctionKeys.OddsCompiler, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> OddsCompiler()
        {
            var functionName = ConfigurationManager.AppSettings["OddsCompiler"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/odds-compiler/server.cshtml");
        }

        // Add new page
        [Route("TraderReport")]
        [NapAuth(FunctionKey = FunctionKeys.TraderReport, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> LSTReport()
        {
            var functionName = ConfigurationManager.AppSettings["TraderReport"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/lst-report/server.cshtml");
        }

        // Add new page
        [Route("LeagueManagement/{id=999}/{leagueName=''}/{isActive='false'}")]
        [NapAuth(FunctionKey = FunctionKeys.LeagueManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> LeagueManagement()
        {
            var functionName = ConfigurationManager.AppSettings["LeagueManagement"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/league-management/server.cshtml");
        }

        // Add new page
        [Route("LAReport")]
        [NapAuth(FunctionKey = FunctionKeys.LAReport, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> LAReport()
        {
            var functionName = ConfigurationManager.AppSettings["LAReport"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/la-report/server.cshtml");
        }

        [Route("OvertimeReport")]
        [NapAuth(FunctionKey = FunctionKeys.OvertimeReport, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> OvertimeReport()
        {
            var functionName = ConfigurationManager.AppSettings["OvertimeReport"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/overtime-report/server.cshtml");
        }

        [Route("DayShiftAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.DayShiftAssignment, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> DayShiftAssignment()
        {
            var functionName = ConfigurationManager.AppSettings["DayShiftAssignment"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/day-shift-assignment/server.cshtml");
        }

        // Add new page
        [Route("NightShiftAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.NightShiftAssignment, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> NightShiftAssignment()
        {
            var functionName = ConfigurationManager.AppSettings["NightShiftAssignment"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/night-shift-assignment/server.cshtml");
        }

        [Route("MyTickets")]
        [NapAuth(FunctionKey = FunctionKeys.MyTickets, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> TicketCenter()
        {
            var functionName = ConfigurationManager.AppSettings["MyTickets"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/ticket-center/server.cshtml");
        }

        [Route("TicketTypeRecipient")]
        [NapAuth(FunctionKey = FunctionKeys.TicketTypeSettings, Policy = Constant.Policy.Host)]
        public async Task<ActionResult> TicketTypeRecipient()
        {
            var functionName = ConfigurationManager.AppSettings["TicketTypeSettings"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/ticket-type-recipient/server.cshtml");
        }

        [Route("LiveGameList")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameList, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> LiveGameList()
        {
            var functionName = ConfigurationManager.AppSettings["LiveGameListNew"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/live-game-list/server.cshtml");
        }

        [Route("RecipientGroup")]
        [NapAuth(FunctionKey = FunctionKeys.RecipientGroup, Policy = Constant.Policy.Host)]
        public async Task<ActionResult> RecipientGroup()
        {
            var functionName = ConfigurationManager.AppSettings["RecipientGroup"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/recipient-group/server.cshtml");
        }

        [Route("OSLiveGameAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.OSLiveGameAssignment, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> OSLiveGameList()
        {
            var functionName = ConfigurationManager.AppSettings["OSLiveGameAssignment"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/other-sport/server.cshtml");
        }

        [Route("AssignmentConfiguration")]
        [NapAuth(FunctionKey = FunctionKeys.AssignmentConfiguration, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> TraderAssignmentConfiguration()
        {
            var functionName = ConfigurationManager.AppSettings["AssignmentConfiguration"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/product-preference/server.cshtml");
        }

        [Route("PrematchReport")]
        [NapAuth(FunctionKey = FunctionKeys.PrematchReport, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> PrematchReportConfiguration()
        {
            var functionName = ConfigurationManager.AppSettings["PrematchReport"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/prematch-report/server.cshtml");
        }

        [Route("MatchCountLiveReport")]
        [NapAuth(FunctionKey = FunctionKeys.MatchCountLiveReport, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> MatchCountLiveReport()
        {
            var functionName = ConfigurationManager.AppSettings["MatchCountLiveReport"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/match-count-live-report/server.cshtml");
        }

        [Route("OSBasketballMaxbet")]
        [NapAuth(FunctionKey = FunctionKeys.OSBasketballMaxbet, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> OSBasketballMaxbet()
        {
            var functionName = ConfigurationManager.AppSettings["OSBasketballMaxBet"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/os-league-setting/server.cshtml");
        }

        [Route("EventPickingNew")]
        [NapAuth(FunctionKey = FunctionKeys.EventPickingNew, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> EventPickingNew()
        {
            return View("~/wwwroot/event-picking/server.cshtml");
        }

        [Route("TaskListNew")]
        [NapAuth(FunctionKey = FunctionKeys.OWPEventManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> TaskList()
        {
            var functionName=ConfigurationManager.AppSettings["TaskListNew"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/task-list/server.cshtml");
        }

        [Route("ProviderArrangement")]
        [NapAuth(FunctionKey = FunctionKeys.ProviderArrangement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult>ProviderArrangement()
        {
            var functionName = ConfigurationManager.AppSettings["ProviderArrangement"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/provider-arrangement/server.cshtml");
        }


        [Route("AssigneeSuggestionList")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> AssigneeSuggestionList()
        {
            var functionName = ConfigurationManager.AppSettings["AssigneeSuggestionList"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/assignee-suggestion-list/server.cshtml");
        }

        [Route("LAKpi")]
        [NapAuth(FunctionKey = FunctionKeys.LAKpi, Policy = Constant.Policy.None)]
        public async Task<ActionResult> LaKpi()
        {
            await accessCounter.UpdateCounter("LAKpi");
            return View("~/wwwroot/la-kpi/server.cshtml");
        }

        [Route("Feedback")]
        [NapAuth(FunctionKey = FunctionKeys.OWPEventManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> FeedBack()
        {
            var functionName = ConfigurationManager.AppSettings["TaskListNew"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/feedback/server.cshtml");
        }

        [Route("UserManagement_New")]
        [NapAuth(FunctionKey = FunctionKeys.OWPEventManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> UserManagement()
        {
            var functionName = ConfigurationManager.AppSettings["UserManagement"];
            await accessCounter.UpdateCounter(functionName);
            return View("~/wwwroot/user-management/server.cshtml");
        }
    }
}