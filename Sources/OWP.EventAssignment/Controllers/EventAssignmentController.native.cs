using System;
using OWP.EventAssignment.Services;
using OWP.Services;

namespace OWP.EventAssignment.Controllers
{
    using Fanex.Common.Extensions;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using Constants;
    using Permission;
    using Repositories;
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
        private readonly SyncOffVRService syncOffVrService;

        public EventAssignmentController(Repository repository,
            NotificationService notificationService,
            EventAssignmentPermission eventAssignmentPermission,
            GetAdminSiteMatchIdService getAdminSiteMatchIdService,
            SyncOffVRService syncOffVrService)
        {
            this.repository = repository;
            this.notificationService = notificationService;
            this.eventAssignmentPermission = eventAssignmentPermission;
            this.getAdminSiteMatchIdService = getAdminSiteMatchIdService;
            this.syncOffVrService = syncOffVrService;
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

            await repository.DetectEventHasTicket(eventModels);

            if (queryModel.ShowUnreadMessage)
            {
                eventModels = eventModels.Where(e => e.IsRead.HasValue && !e.IsRead.Value)?.ToList();
            }

            foreach (var match in eventModels)
            {
                var infoSite = infoSiteTimeResult.FirstOrDefault(x => x.ParentMatchId == match.ParentMatchId);
                match.AdminSiteId = await getAdminSiteMatchIdService.GetAdminSiteMatchId(match.OWPMatchId,
                match.ParentMatchId, match.MinorBettypeId);
                match.InfoSiteTime = infoSite?.KickOffTime;
                match.InfoSiteTimeDisplay = infoSite?.KickOffTimeDisplay;
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

        [Route("sync-off-vr")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.LiveGameAssignment, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> SyncOffVR(DateTime date)
        {
            await syncOffVrService.Sync(date);

            return Ok();
        }
    }
}