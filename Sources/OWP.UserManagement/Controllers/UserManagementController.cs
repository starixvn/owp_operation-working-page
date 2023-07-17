using OWP.Services;

namespace OWP.UserManagement.Controllers
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using Helpers;
    using Models;
    using Repositories;
    using Services;

    public class UserManagementController : Controller
    {
        private readonly ResourceRepository resourceRepository;
        private readonly ExportService exportService;
        private readonly ModelService modelService;
        private readonly Repository repository;
        private readonly ICurrentSession currentSession;
        private readonly AccessCounter accessCounter;

        public UserManagementController(ResourceRepository resourceRepository, ExportService exportService,
            ModelService modelService,
            Repository repository, ICurrentSession currentSession, AccessCounter accessCounter)
        {
            this.resourceRepository = resourceRepository;
            this.exportService = exportService;
            this.modelService = modelService;
            this.repository = repository;
            this.currentSession = currentSession;
            this.accessCounter = accessCounter;
        }

        [NapAuth(FunctionKey = FunctionKeys.UserManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> Index()
        {
            var userId = currentSession.UserId;
            var userSectionId = await repository.GetSectionIdByUserId(userId);
            var allResource = resourceRepository.GetAllReferenceResource();
            var permission = modelService.BuildPermissionViewModel();
            var roles = allResource.Where(x => x.Name == ReferenceResourceNames.UserRole);
            var sections = allResource.Where(x => x.Name == ReferenceResourceNames.Section)
                .Where(x => !HiddenSectionConst.HiddenSections.Exists(i => i == x.ResourceId));
            var sectionsByPermission = permission.UserManagementAllSections.IsRead ? sections 
                : sections.Where(x=> x.ResourceId == userSectionId);
            var departments = allResource.Where(x => x.Name == ReferenceResourceNames.Department);
            var categories = allResource.Where(x => x.Name == ReferenceResourceNames.UserCategory);
            var locationCodes = allResource.Where(x => x.Name == ReferenceResourceNames.LocationCode);
            var levels = allResource.Where(x => x.Name == ReferenceResourceNames.UserLevel);
            var userGroups = allResource.Where(x => x.Name == ReferenceResourceNames.UserGroup);
            var languages = allResource.Where(x => x.Name.Equals(ReferenceResourceNames.Language));

            var filter = new FilterViewModel
            {
                PageIndex = PagingConstant.PageIndex,
                PageSize = PagingConstant.PageSize,
                Roles = roles,
                Sections = sectionsByPermission,
                Departments = departments,
                Categories = categories,
                LocationCodes = locationCodes,
                Levels = levels,

                Languages = languages,
                UserGroups = RefResourceHelper.SortUserGroups(userGroups.ToList()),
                Permission = permission
            };
            await accessCounter.UpdateCounter(MenuItems.UserManagement);
            return View(filter);
        }

        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.UserManagement, Policy = Constant.Policy.Read)]
        public async Task<ActionResult> ExportToExcel(QueryModel model)
        {
            const int defaultPageZie = 10000;
            model.PageSize = defaultPageZie;
            model.PageIndex = 1;

            var dataResult = await repository.GetUserPagingAsync(model);

            var exportDate = DateTime.Now;
            byte[] bytes;
            using (var stream = new MemoryStream())
            {
                exportService.ExportToExcel(stream, dataResult.Users, exportDate);
                bytes = stream.ToArray();
            }

            var fileName = $"UserManagement-{exportDate.ToString("yyyyMMdd")}.xlsx";
            return File(bytes, "application/xlsx", fileName);
        }
    }
}