namespace OWP.EventAssignment.Controllers
{
    using Fanex.Common.Extensions;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
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
                match.AdminSiteId = await getAdminSiteMatchIdService.GetAdminSiteMatchId(match.OWPMatchId,
                match.ParentMatchId, match.MinorBettypeId);
               
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