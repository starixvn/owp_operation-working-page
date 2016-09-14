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
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        private readonly Service headerService;
        private readonly PermissionService permissionService;
        private readonly ICache cache;
        private readonly ICurrentSession session;

        public HomeController(Service headerService, PermissionService permissionService, ICache cache, ICurrentSession session)
        {
            this.headerService = headerService;
            this.permissionService = permissionService;
            this.cache = cache;
            this.session = session;
        }

        public ActionResult Index() => TaskList();

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
                HasDetailInformationPermission = permissionService.HasRight(FunctionKeys.DetailsInformation, Constant.Policy.Read),
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
        public ActionResult EventAssignment() => View("~/wwwroot/event-assignment/server.cshtml");

        [Route("EventUpload")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public ActionResult EventUpload() => View("~/wwwroot/event-upload/server.cshtml");

        [Route("AutoAssignment")]
        public ActionResult AutoAssignment() => View("~/wwwroot/auto-assignment/server.cshtml");

        [Route("ResourceManagement")]
        [NapAuth(FunctionKey = FunctionKeys.UserManagement, Policy = Constant.Policy.Read)]
        public ActionResult ResourceManagement() => View("~/wwwroot/resource-management/server.cshtml");

        [Route("MessageBoxManagement")]
        public ActionResult MessageBoxManagement() => View("~/wwwroot/messagebox-management/server.cshtml");

        [Route("OddsCompiler")]
        [NapAuth(FunctionKey = FunctionKeys.OddsCompiler, Policy = Constant.Policy.Read)]
        public ActionResult OddsCompiler() => View("~/wwwroot/odds-compiler/server.cshtml");

        // Add new page
        [Route("TraderReport")]
        [NapAuth(FunctionKey = FunctionKeys.TraderReport, Policy = Constant.Policy.Read)]
        public ActionResult LSTReport() => View("~/wwwroot/lst-report/server.cshtml");

        // Add new page
        [Route("LeagueManagement/{id=999}/{leagueName=''}/{isActive='false'}")]
        [NapAuth(FunctionKey = FunctionKeys.LeagueManagement, Policy = Constant.Policy.Read)]
        public ActionResult LeagueManagement() => View("~/wwwroot/league-management/server.cshtml");

        // Add new page
        [Route("LAReport")]
        [NapAuth(FunctionKey = FunctionKeys.LAReport, Policy = Constant.Policy.Read)]
        public ActionResult LAReport() => View("~/wwwroot/la-report/server.cshtml");

        [Route("OvertimeReport")]
        [NapAuth(FunctionKey = FunctionKeys.OvertimeReport, Policy = Constant.Policy.Read)]
        public ActionResult OvertimeReport() => View("~/wwwroot/overtime-report/server.cshtml");

        [Route("DayShiftAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.DayShiftAssignment, Policy = Constant.Policy.Read)]
        public ActionResult DayShiftAssignment() => View("~/wwwroot/day-shift-assignment/server.cshtml");

        // Add new page
        [Route("NightShiftAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.NightShiftAssignment, Policy = Constant.Policy.Read)]
        public ActionResult NightShiftAssignment() => View("~/wwwroot/night-shift-assignment/server.cshtml");

        [Route("MyTickets")]
        [NapAuth(FunctionKey = FunctionKeys.MyTickets, Policy = Constant.Policy.Read)]
        public ActionResult TicketCenter() => View("~/wwwroot/ticket-center/server.cshtml");

        [Route("TicketTypeRecipient")]
        [NapAuth(FunctionKey = FunctionKeys.TicketTypeSettings, Policy = Constant.Policy.Host)]
        public ActionResult TicketTypeRecipient() => View("~/wwwroot/ticket-type-recipient/server.cshtml");

        [Route("LiveGameListNew")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameList, Policy = Constant.Policy.Read)]
        public ActionResult LiveGameList() => View("~/wwwroot/live-game-list/server.cshtml");

        [Route("RecipientGroup")]
        [NapAuth(FunctionKey = FunctionKeys.RecipientGroup, Policy = Constant.Policy.Host)]
        public ActionResult RecipientGroup() => View("~/wwwroot/recipient-group/server.cshtml");

        [Route("OSLiveGameAssignment")]
        [NapAuth(FunctionKey = FunctionKeys.OSLiveGameAssignment, Policy = Constant.Policy.Read)]
        public ActionResult OSLiveGameList() => View("~/wwwroot/other-sport/server.cshtml");

        [Route("AssignmentConfiguration")]
        [NapAuth(FunctionKey = FunctionKeys.AssignmentConfiguration, Policy = Constant.Policy.Read)]
        public ActionResult TraderAssignmentConfiguration() => View("~/wwwroot/product-preference/server.cshtml");

        [Route("PrematchReport")]
        [NapAuth(FunctionKey = FunctionKeys.PrematchReport, Policy = Constant.Policy.Read)]
        public ActionResult PrematchReportConfiguration() => View("~/wwwroot/prematch-report/server.cshtml");

        [Route("MatchCountLiveReport")]
        [NapAuth(FunctionKey = FunctionKeys.MatchCountLiveReport, Policy = Constant.Policy.Read)]
        public ActionResult MatchCountLiveReport() => View("~/wwwroot/match-count-live-report/server.cshtml");

        [Route("OSBasketballMaxbet")]
        [NapAuth(FunctionKey = FunctionKeys.OSBasketballMaxbet, Policy = Constant.Policy.Read)]
        public ActionResult OSBasketballMaxbet() => View("~/wwwroot/os-league-setting/server.cshtml");

        [Route("EventPickingNew")]
        [NapAuth(FunctionKey = FunctionKeys.EventPickingNew, Policy = Constant.Policy.Read)]
        public ActionResult EventPickingNew() => View("~/wwwroot/event-picking/server.cshtml");

        [Route("TaskListNew")]
        [NapAuth(FunctionKey = FunctionKeys.OWPEventManagement, Policy = Constant.Policy.Read)]
        public ActionResult TaskList() => View("~/wwwroot/task-list/server.cshtml");

        [Route("ProviderArrangement")]
        [NapAuth(FunctionKey = FunctionKeys.ProviderArrangement, Policy = Constant.Policy.Read)]
        public ActionResult ProviderArrangement() => View("~/wwwroot/provider-arrangement/server.cshtml");

        [Route("AssigneeSuggestionList")]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Read)]
        public ActionResult A() => View("~/wwwroot/assignee-suggestion-list/server.cshtml");

    }
}