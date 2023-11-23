namespace OWP.UserManagement.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using Constants;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using Repositories;

    public interface UsersService
    {
        Task<UserManagementViewModel> GetUserPagingAsync(QueryModel model);
    }

    public class UsersServiceImp : UsersService
    {
        private readonly ModelService modelService;
        private readonly Repository repository;
        private readonly ICurrentSession currentSession;
        private readonly ResourceRepository resourceRepository;

        public UsersServiceImp(ModelService modelService, Repository repository, ICurrentSession currentSession, ResourceRepository resourceRepository)
        {
            this.modelService = modelService;
            this.repository = repository;
            this.currentSession = currentSession;
            this.resourceRepository = resourceRepository;
        }

        public async Task<UserManagementViewModel> GetUserPagingAsync(QueryModel model)
        {
            model.Permission = modelService.BuildPermissionViewModel();
            var result = await repository.GetUserPagingAsync(model);
            var levelDefault = await repository.GetLevelBySectionId(null);
            var levelLiveTrading = await repository.GetLevelBySectionId(3);
            var levelLiveAssistant = await repository.GetLevelBySectionId(30);
            var userId = currentSession.UserId;
            var userSectionId = await repository.GetSectionIdByUserId(userId);
            var allResource = resourceRepository.GetAllReferenceResource();
            
            var sections = allResource.FirstOrDefault(x =>
                x.Name == ReferenceResourceNames.Section && x.ResourceId == userSectionId);
            var userColumnModels = modelService.BuildUserColumnModel(model.Permission, sections?.Value);
            result.UserColumnModels = userColumnModels;
            result.LevelOfLiveTrading = levelLiveTrading;
            result.LevelOfLiveAssistant = levelLiveAssistant;
            result.LevelOfOtherSection = levelDefault;

            return result;
        }
    }
}