namespace OWP.WorkingShift.Services
{
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using OWP.Constants;
    using OWP.Services;
    using OWP.Utils;

    public interface ModelService
    {
        WorkingShiftPermission BuildPermissionViewModel();

        int GetOrderUserId();

        int GetOrderUserId(WorkingShiftPermission permissionModel);
    }

    public class ModelServiceImp : ModelService
    {
        private readonly PermissionService permissionService;
        private readonly ICurrentSession currentSession;

        public ModelServiceImp(PermissionService permissionService, ICurrentSession currentSession)
        {
            this.permissionService = permissionService;
            this.currentSession = currentSession;
        }

        public WorkingShiftPermission BuildPermissionViewModel()
        {
            var workingShiftFunctionPolicies = permissionService.GetPermissions(FunctionKeys.WorkingShiftManagement);
            var dailyWorkingShiftFunctionPolicies = permissionService.GetPermissionModel(FunctionKeys.DailyWorkingShift);

            return new WorkingShiftPermission
            {
                WorkingShiftManagement = workingShiftFunctionPolicies.GetPermissionModel(FunctionKeys.WorkingShiftManagement_OwnSection),
                WorkingShiftManagementOwnSection = workingShiftFunctionPolicies.GetPermissionModel(FunctionKeys.WorkingShiftManagement_OwnSection),
                WorkingShiftManagementAllSections = workingShiftFunctionPolicies.GetPermissionModel(FunctionKeys.WorkingShiftManagement_AllSections),
                WorkingShiftManagementShiftManagement = workingShiftFunctionPolicies.GetPermissionModel(FunctionKeys.WorkingShiftManagement_ShiftManagement),
                DailyWorkingShiftManagement = dailyWorkingShiftFunctionPolicies
            };
        }

        public int GetOrderUserId(WorkingShiftPermission permissionModel)
        {
            return permissionModel.WorkingShiftManagementAllSections.IsRead ? 0 : currentSession.UserId;
        }

        public int GetOrderUserId()
        {
            var permissionModel = BuildPermissionViewModel();
            return GetOrderUserId(permissionModel);
        }
    }
}