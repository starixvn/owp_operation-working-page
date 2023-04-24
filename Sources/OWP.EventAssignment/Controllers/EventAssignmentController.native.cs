using OWP.EventAssignment.Const;

namespace OWP.EventAssignment.Controllers
{
    using Fanex.Common.Extensions;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.OWP.Core.Extensions;
    using Models;
    using OWP.Constants;
    using Permission;
    using Repositories;
    using Services;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    [RoutePrefix("api/event-assignment")]
    public class EventAssignmentController : ApiController
    {
        private readonly Repository repository;
        private readonly NotificationService notificationService;
        private readonly EventAssignmentPermission eventAssignmentPermission;
        private readonly GetAdminSiteMatchIdService getAdminSiteMatchIdService;

        public EventAssignmentController(Repository repository,
            NotificationService notificationService,
            EventAssignmentPermission eventAssignmentPermission,
            GetAdminSiteMatchIdService getAdminSiteMatchIdService)
        {
            this.repository = repository;
            this.notificationService = notificationService;
            this.eventAssignmentPermission = eventAssignmentPermission;
            this.getAdminSiteMatchIdService = getAdminSiteMatchIdService;
        }

        [Route("")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Read)]
        public async Task<IEnumerable<EventModel>> Query(EventQueryModel queryModel)
        {
            var permission = eventAssignmentPermission.BuildPermission();
            queryModel.FullTimeViewPermission = permission.FullTimeView;

            var eventModels = await repository.Query(queryModel);
            var parentMatchIds = string.Join(",", eventModels.Select(x => x.ParentMatchId).Distinct());
            var infoSiteTimeResult = await repository.GetInfoSiteTime(parentMatchIds);
            var adminSiteIdsWithOwpMatches = await repository.GetAdminSiteMatchId(parentMatchIds);
            var adminSitesIdsOdds = await repository.GetAdminSiteInfo();

            var adminSiteMatchInfo = adminSiteIdsWithOwpMatches.Join(adminSitesIdsOdds,
                    l1 => l1.AdminSiteMatchId,
                    l2 => l2.AdminSiteMatchId,
                    (l1, l2) => new { l1, l2 })
                .Select(x => new AdminSiteMatchInfoModel
                {
                    AdminSiteMatchId = x.l1.AdminSiteMatchId,
                    ParentMatchId = x.l1.ParentMatchId
                }).ToList();

            await repository.DetectEventHasTicket(eventModels);

            if (queryModel.ShowUnreadMessage)
            {
                eventModels = eventModels.Where(e => e.IsRead.HasValue && !e.IsRead.Value)?.ToList();
            }

            if(eventModels is null)
            {
                return new List<EventModel>();
            }

            foreach (var match in eventModels)
            {
                var infoSite = infoSiteTimeResult.FirstOrDefault(x => x.ParentMatchId == match.ParentMatchId);
                var isShowAbsenceIcon = adminSiteMatchInfo.Any(x => x.ParentMatchId == match.ParentMatchId);
                match.AdminSiteId = await getAdminSiteMatchIdService.GetAdminSiteMatchId(match.OWPMatchId,
                match.ParentMatchId, match.MinorBettypeId);
                match.InfoSiteTime = infoSite?.KickOffTime;
                match.InfoSiteTimeDisplay = infoSite?.KickOffTimeDisplay;
                match.IsShowAbsenceIcon = !EventAssignmentConst.StatusNotOffered.Contains(match.MatchStatus) && isShowAbsenceIcon;
            }

            var permissionFullBetTypes = permission.LiveGameAssignment_FullBetTypes;
            if (permissionFullBetTypes.IsRead)
            {
                return eventModels;
            }

            eventModels.ForEach(eventModel =>
            {
                eventModel.Handicap = null;
                eventModel.Handicap1st = null;
                eventModel.OverUnder = null;
                eventModel.OverUnder1st = null;
                eventModel.Specific15Mins = null;
                eventModel.Specific10Mins = null;
            });

            return eventModels;
        }

        [Route("add-event")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> AddEvent(AddEventViewModel model)
        {
            var result = await repository.AddEvent(model);
            return Ok(result);
        }

        [Route("validate-to-edit-event")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> ValidateToEditEvent(EditMatchViewModel model)
        {
            var result = await repository.ValidateToEditEvent(model);
            return Ok(result);
        }

        [Route("edit-event")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> EditEvent(EditMatchViewModel model)
        {
            var result = await repository.EditEvent(model);

            if (result.IsSuccess)
            {
                var sessionId = result.Data as string;
                await notificationService.Notify(sessionId);
            }

            return Ok(result);
        }
    }
}