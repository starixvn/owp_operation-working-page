using System.Threading.Tasks;
using OWP.Services;
using OWP.Utils;

namespace Fanex.NAP.OWP.EventManagement.Controllers
{
    using System.Collections.Generic;
    using System.Configuration;
    using System.Linq;
    using System.Web.Mvc;
    using Core.BaseClasses;
    using Core.BaseClasses.Interfaces;
    using Core.MVC;
    using Criteria.EventInfo;
    using global::OWP.Constants;
    using Models.EventInfo;
    using NAP.Core.Business;
    using NAP.Core.Web.Attribute;
    using Service.Interfaces;
    using ViewModels.EventInfo;

    public class EventInformationController : OWPBaseController
    {
        private readonly IEventInformationService eventInformationService;
        private readonly IFilterService filterService;
        private readonly PermissionService permissionService;
        private readonly AccessCounter accessCounter;

        public EventInformationController(
            IEventInformationService eventInformationService,
            IFilterService filterService,
            IOWPBaseService baseService,
            PermissionService permissionService, AccessCounter accessCounter)
        {
            BaseService = baseService;
            this.eventInformationService = eventInformationService;
            this.filterService = filterService;
            this.permissionService = permissionService;
            this.accessCounter = accessCounter;
        }

        [NapAuth(FunctionKey = FunctionKeys.LiveGameList, Policy = Constant.Policy.Read)]
        public ActionResult GetFilter()
        {
            var model = filterService.GetFilterByUserId(CurrentSession.UserId);

            return PartialView("_GetFilter", model);
        }

        [NapAuth(FunctionKey = FunctionKeys.LiveGameList, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> Index()
        {
            var filters = filterService.GetFilterByUserId(CurrentSession.UserId);
            var filterDefault = filters.FirstOrDefault(x => x.IsDefault);
            var ticketPermission = permissionService.GetPermissionModel(FunctionKeys.MyTickets);

            var model = new EventInformationViewModel
            {
                FilterId = filterDefault != null ? filterDefault.FilterId : 0,
                FilterName = filterDefault != null ? filterDefault.Name : string.Empty,
                Filters = filters,
                IsCreatePublicFilter = IsCreatePublicFilter(),
                SearchDisabled = !IsShowTimeRangeEventInformation() && !IsShowFullEventInformation(),
                TicketPermission = ticketPermission,
            };
            var functionName = ConfigurationManager.AppSettings["LiveGameList"];
            await accessCounter.UpdateCounter(functionName);

            return View("Index", model);
        }

        [NapAuth(FunctionKey = FunctionKeys.LiveGameList, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> GetDataEventInformation(EventInformationViewModel viewModel)
        {
            IEnumerable<MatchInfo> listMatchInfo;
            if (viewModel.FilterId == -1)
            {
                listMatchInfo = await GetEventInformation(viewModel);
            }
            else if (viewModel.FilterId > 0)
            {
                listMatchInfo = await GetEventInformationByFilterId(viewModel);
            }
            else
            {
                listMatchInfo = new List<MatchInfo>();
            }


            var hasReadNotePermission = HasRight(FunctionKeys.Note, Constant.Policy.Read);
            return new JsonNetResult(new { hasReadNotePermission, listMatchInfo });
        }

        [HttpPut]
        public JsonResult UpdateIsSelected(UpdateIsSelectedCriteria criteria)
        {
            if (criteria != null)
            {
                criteria.UserId = CurrentSession.UserId;
            }

            var result = eventInformationService.UpdateIsSelected(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private async Task<IEnumerable<MatchInfo>> GetEventInformation(EventInformationViewModel model)
        {
            var criteria = new GetEventInformationCriteria
            {
                EventDate = model.EventDate,
                HomeName = model.HomeName,
                AwayName = model.AwayName,
                FilterFromTime = model.FromTime,
                FilterToTime = model.ToTime,
                FromMaxBet = model.FromMaxBet,
                ToMaxBet = model.ToMaxBet,
                FromSpread = model.FromSpread,
                ToSpread = model.ToSpread,
                WatchBet = model.WatchBet,
                Phone = model.Phone,
                Channel = model.Channel,
                LeagueIds = model.LeagueIds,
                AssigneeIds = model.AssigneeIds,
                AgentIds = model.AgentIds,
                OtherProviderIds = model.OtherProviderIds,
                ProviderIds = model.ProviderIds,
                TVIds = model.TVIds,
                MatchNumber = model.MatchNumber,
                Remark = model.Remark,
                AssigneeLocation = model.AssigneeLocation,
                MatchStatusIds = model.MatchStatusIds,
                ShowAll = IsShowFullEventInformation()
            };

            return await eventInformationService.GetEventInformation(criteria);
        }

        private async Task<IEnumerable<MatchInfo>> GetEventInformationByFilterId(EventInformationViewModel model)
        {
            var criteria = new GetEventInformationByFilterIdCriteria
            {
                FilterId = model.FilterId,
                ShowAll = IsShowFullEventInformation()
            };

            return await eventInformationService.GetEventInformationByFilterId(criteria);
        }

        private bool IsShowTimeRangeEventInformation()
        {
            return HasRight(FunctionKeys.LiveGameList_TimeRangeView, Constant.Policy.Read);
        }

        private bool IsShowFullEventInformation()
        {
            return HasRight(FunctionKeys.FullTimeView, Constant.Policy.Read);
        }

        private bool IsCreatePublicFilter()
        {
            return HasRight(FunctionKeys.LiveGameList_PublicFilter, Constant.Policy.Read);
        }
    }
}