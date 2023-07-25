using OWP.Services;

namespace OWP.DailyWorkingShift.Controllers
{
    using System;
    using System.Configuration;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using OWP.Repositories;
    using Services;
    using ViewModels;

    public class DailyWorkingShiftController : Controller
    {
        private readonly ResourceRepository resourceRepository;
        private readonly ModelService modelService;
        private readonly ICurrentSession currentSession;
        private readonly UserRepository userRepository;
        private readonly AccessCounter accessCounter;

        public DailyWorkingShiftController(ResourceRepository resourceRepository,
            ModelService modelService,
            ICurrentSession currentSession,
            UserRepository userRepository, AccessCounter accessCounter)
        {
            this.resourceRepository = resourceRepository;
            this.modelService = modelService;
            this.currentSession = currentSession;
            this.userRepository = userRepository;
            this.accessCounter = accessCounter;
        }

        [NapAuth(FunctionKey = FunctionKeys.DailyWorkingShift, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> Index()
        {
            var permission = modelService.BuildPermissionViewModel();
            var sections = (await resourceRepository.GetResourceByNameWithNone(ReferenceResourceNames.Section))
                .Where(x => !HiddenSectionConst.HiddenSections.Exists(i => i == x.ResourceId)).ToList();
            var departments = await resourceRepository.GetResourceByNameWithNone(ReferenceResourceNames.Department);
            var user = await userRepository.GetUserInfoById(currentSession.UserId);
            if (!permission.DailyWorkingShiftAllSections.IsRead && permission.DailyWorkingShiftOwnSection.IsRead)
            {
                sections = sections.Where(x => x.ResourceId == user.SectionId).ToList();
            }

            var model = new DailyViewModel
            {
                Permission = permission,
                Date = DateTime.Today,
                Sections = sections,
                Departments = departments,
                UserLocations = resourceRepository.GetAllLocations(),
                Username = currentSession.Username
            };
            var functionName = ConfigurationManager.AppSettings["DailyWorkingShift"];
            await accessCounter.UpdateCounter(functionName);
            return View(model);
        }
    }
}