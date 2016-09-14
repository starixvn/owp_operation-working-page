namespace OWP.WeeklyWorkingShift.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using OWP.Repositories;
    using WorkingShift.Models;
    using WorkingShift.Repositories;
    using WorkingShift.Services;

    public class WeeklyWorkingShiftController : Controller
    {
        private readonly ResourceRepository resourceRepository;
        private readonly ModelService modelService;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftTimezoneSettingRepository timezoneSettingRepository;
        private readonly UserRepository userRepository;

        public WeeklyWorkingShiftController(
            ResourceRepository resourceRepository,
            ModelService modelService,
            ICurrentSession currentSession,
            WorkingShiftTimezoneSettingRepository timezoneSettingRepository,
            UserRepository userRepository)
        {
            this.modelService = modelService;
            this.resourceRepository = resourceRepository;
            this.currentSession = currentSession;
            this.timezoneSettingRepository = timezoneSettingRepository;
            this.userRepository = userRepository;
        }

        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> Index()
        {
            var currentUserId = currentSession.UserId;
            var permission = modelService.BuildPermissionViewModel();
            var sections = (await resourceRepository.GetResourceByNameWithNone(ReferenceResourceNames.Section))
                .Where(x => ! HiddenSectionConst.HiddenSections.Exists(i => i == x.ResourceId)).ToList(); 
            var departments = await resourceRepository.GetResourceByNameWithNone(ReferenceResourceNames.Department);
            var user = await userRepository.GetUserInfoById(currentSession.UserId);
            var currentSectionId = user.SectionId;
            if (!permission.WorkingShiftManagementAllSections.IsRead)
            {
                sections = sections.Where(x => x.ResourceId == user.SectionId).ToList();
            }

            var model = new FilterViewModel
            {
                Permission = permission,
                FromDate = DateTime.Today,
                ToDate = DateTime.Today,
                Sections = sections,
                Departments = departments,
                UserCategories = await resourceRepository.GetResourceByName(ReferenceResourceNames.UserCategory),
                UserLocations = resourceRepository.GetAllLocations(),
                TimezoneSettings = await timezoneSettingRepository.GetTimezoneSettings(),
                CurrentUserId = currentUserId,
                CurrentSectionId = currentSectionId ?? 0,
                IsFrame = false
            };

            return View(model);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> IFrame(int? gmt = 7)
        {
            var sections = (await resourceRepository.GetResourceByNameWithNone(ReferenceResourceNames.Section))
                .Where(x=>!HiddenSectionConst.HiddenSections.Exists(i=> i==x.ResourceId)).ToList();
            var departments = await resourceRepository.GetResourceByNameWithNone(ReferenceResourceNames.Department);
            const int defaultMinus = 60;
            const int defaultGTM7 = 7;
            const int defaultGMT8 = 8;

            var defaultGMT = gmt ?? defaultGTM7;

            var convertOffset = (defaultGMT - defaultGMT8) * defaultMinus;

            var getTimezoneSettings = await timezoneSettingRepository.GetTimezoneSettings();
            if (!getTimezoneSettings.Select(x => x.Offset).Contains(convertOffset))
            {
                convertOffset = (defaultGTM7 - defaultGMT8) * defaultMinus;
            }

            foreach (var item in getTimezoneSettings)
            {
                item.IsSelected = item.Offset == convertOffset;
            }

            var selectedTimezoneSetting = getTimezoneSettings.FirstOrDefault(x => x.IsSelected);
            var model = new FilterViewModel
            {
                FromDate = DateTime.Today,
                ToDate = DateTime.Today,
                Sections = sections,
                Departments = departments,
                UserCategories = await resourceRepository.GetResourceByName(ReferenceResourceNames.UserCategory),
                UserLocations = resourceRepository.GetAllLocations(),
                TimezoneSettings = getTimezoneSettings,
                IsFrame = true,
                Permission = new WorkingShiftPermission()
            };

            ViewBag.selectedTimezoneSetting = selectedTimezoneSetting ?? new TimezoneSettingModel { Name = "GMT+7", Offset = -defaultMinus };
            return View(model);
        }
    }
}