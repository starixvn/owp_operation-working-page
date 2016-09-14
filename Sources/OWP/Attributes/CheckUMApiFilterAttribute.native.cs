namespace OWP.Attributes
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;
    using Fanex.Caching;
    using ONEbook.UM;
    using ONEbook.UM.Services;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class CheckUMApiFilterAttribute : ActionFilterAttribute
    {
        private static readonly ICache Cache = ConfiguredCacheService.CacheStorage;

        private static readonly IMaintenanceService MaintenanceService = CreateMaintenanceService();

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            bool mountedUMPage;
            Cache.TryGet("OWP_UM_Mounted", out mountedUMPage);
            if (mountedUMPage && MaintenanceService.IsUnderMaintenance())
            {
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "Under maintenance time.");
            }
        }

        private static IMaintenanceService CreateMaintenanceService()
        {
            return new MaintenanceService(
                                  UMClientManager.RestClient,
                                  UMClientManager.CacheService,
                                  UMClientManager.UMClientConfigs,
                                  UMClientManager.HttpContext);
        }
    }
}
