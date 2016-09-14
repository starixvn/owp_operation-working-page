namespace OWP.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Configuration;
    using Fanex.NAP.Core.Models.ValueObject;
    using Fanex.NAP.Core.Service.Interface;
    using Fanex.NAP.Core.Web.Session;
    using Models;

    public interface PermissionService
    {
        bool HasRight(string functionKey, Constant.Policy policy);

        IList<FunctionPolicy> GetPermissions(string parentFunctionKey);

        PermissionModel GetPermissionModel(string functionKey);
    }

    public class PermissionServiceImp : PermissionService
    {
        private readonly IUserService userService;
        private readonly ICurrentSession currentSession;

        public PermissionServiceImp(IUserService userService, ICurrentSession currentSession)
        {
            this.userService = userService;
            this.currentSession = currentSession;
        }

        public bool HasRight(string functionKey, Constant.Policy policy)
        {
            if (currentSession.UserId <= 0)
            {
                return false;
            }

            var functionPolicy = userService.GetPermission(
                currentSession.UserId,
                NapSettings.Settings.SiteId,
                functionKey);
            return functionPolicy >= (int)policy;
        }

        public IList<FunctionPolicy> GetPermissions(string parentFunctionKey)
        {
            if (currentSession.UserId <= 0)
            {
                return new List<FunctionPolicy>();
            }

            return userService.GetPermissions(
                currentSession.UserId,
                NapSettings.Settings.SiteId,
                parentFunctionKey,
                NapSettings.Settings.Environment).ToList();
        }

        public PermissionModel GetPermissionModel(string functionKey)
        {
            if (currentSession.UserId <= 0)
            {
                return new PermissionModel();
            }

            var functionPolicy = userService.GetPermission(
                currentSession.UserId,
                NapSettings.Settings.SiteId,
                functionKey);
            return new PermissionModel(functionPolicy >= (int)Constant.Policy.Read, functionPolicy >= (int)Constant.Policy.Host);
        }
    }
}