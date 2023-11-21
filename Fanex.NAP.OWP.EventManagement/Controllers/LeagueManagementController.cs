namespace Fanex.NAP.OWP.EventManagement.Controllers
{
    using System.Web.Mvc;
    using Core.BaseClasses;
    using Core.BaseClasses.Interfaces;
    using Criteria.League;
    using Service.Interfaces;

    public class LeagueManagementController : OWPBaseController
    {
        private readonly ILeagueManagementService leagueManagementService;

        public LeagueManagementController(
            ILeagueManagementService leagueManagementService,
            IOWPBaseService baseService)
        {
            BaseService = baseService;
            this.leagueManagementService = leagueManagementService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetLeague(string keywords, int? selectTop = null)
        {
            var criteria = new GetLeagueCriteria
            {
                Keywords = keywords,
                SelectTop = selectTop
            };

            var leagues = leagueManagementService.GetLeague(criteria);

            return Json(leagues, JsonRequestBehavior.AllowGet);
        }
    }
}