namespace Fanex.NAP.OWP.EventManagement.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Core.BaseClasses;
    using Core.BaseClasses.Interfaces;
    using Core.Criteria;
    using Criteria;
    using Criteria.Filter;
    using Enumerations;
    using global::OWP.Constants;
    using Models.EventInfo;
    using Service;
    using Service.Interfaces;
    using ViewModels;
    using ViewModels.Filter;

    public class FilterController : OWPBaseController
    {
        private readonly IFilterService filterService;
        private readonly ITelevisionService televisionService;
        private readonly IAgentService agentService;
        private readonly IProviderService providerService;
        private readonly IOtherProviderService otherProviderService;

        public FilterController(
            IFilterService filterService,
            ITelevisionService televisionService,
            IAgentService agentService,
            IProviderService providerService,
            IOtherProviderService otherProviderService,
            IOWPBaseService baseService)
        {
            BaseService = baseService;
            this.filterService = filterService;
            this.televisionService = televisionService;
            this.agentService = agentService;
            this.providerService = providerService;
            this.otherProviderService = otherProviderService;
        }

        [HttpGet]
        public ActionResult Create()
        {
            var viewModel = filterService.GetFilterDetail(0);

            return View("Create", viewModel);
        }

        [HttpPost]
        public JsonResult Create(FilterViewModel model)
        {
            var criteria = new InsertFilterCriteria();

            if (model != null)
            {
                criteria.UserId = CurrentSession.UserId;
                criteria.Name = model.Name;
                criteria.IsPublic = model.IsPublic;
                criteria.FilterDetails = model.Details;
            }

            var result = filterService.InsertFilter(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Edit(int filterId)
        {
            var viewModel = filterService.GetFilterDetail(filterId);

            return View("Create", viewModel);
        }

        [HttpPost]
        public JsonResult Update(FilterViewModel model)
        {
            var criteria = new UpdateFilterCriteria();

            if (model != null)
            {
                criteria.UserId = CurrentSession.UserId;
                criteria.FilterId = model.FilterId;
                criteria.FilterDetails = model.Details;
            }

            var result = filterService.UpdateFilter(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Delete(int filterId)
        {
            var criteria = new DeleteFilterCriteria
            {
                FilterId = filterId,
                UserId = CurrentSession.UserId
            };

            var result = filterService.DeleteFilter(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SetDefaultFilter(int filterId)
        {
            var criteria = new InsertDefaultFilterCriteria
            {
                FilterId = filterId,
                UserId = CurrentSession.UserId
            };

            var result = filterService.InsertDefaultFilter(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteDefaultFilter()
        {
            var criteria = new DeleteDefaultFilterCriteria
            {
                UserId = CurrentSession.UserId
            };

            var result = filterService.DeleteDefaultFilter(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddConditionControl(int fieldId)
        {
            var viewModel = new AddConditionControlViewModel
            {
                FieldId = fieldId
            };

            switch (fieldId)
            {
                case (int)FilterFieldType.TV:
                    viewModel.Tivies = televisionService.GetAll();
                    break;

                case (int)FilterFieldType.OtherProvider:
                    viewModel.OtherProviders = otherProviderService.GetAll();
                    break;

                case (int)FilterFieldType.Provider:
                    viewModel.Providers = providerService.GetAll();
                    break;

                case (int)FilterFieldType.Agent:
                    viewModel.Agents = agentService.GetAll();
                    break;

                case (int)FilterFieldType.MatchStatus:
                    viewModel.MatchStatus = GetRefResourceByName(ReferenceResourceNames.MatchStatus);
                    break;

                default:
                    viewModel.Value = null;
                    break;
            }

            return PartialView("_AddConditionControl", viewModel);
        }

        private IEnumerable<FilterRefResource> GetRefResourceByName(string name)
        {
            var refResources = GetResourceByName(name);
            var filterRefResource = refResources.Select(item => new FilterRefResource
            {
                ResourceId = item.ResourceId,
                Value = item.Value
            });

            return filterRefResource;
        }

        [AllowAnonymous]
        public JsonResult GetUserBySuggestion(string keywords)
        {
            var criteria = new GetUserBySuggestionCriteria { Keyword = keywords };
            var employees = BaseService.GetData<Employee>(criteria);

            return Json(employees, JsonRequestBehavior.AllowGet);
        }
    }
}