namespace OWP.Attributes
{
    using System;
    using System.Web.Mvc;
    using Fanex.Caching;
    using ONEbook.UM;
    using ONEbook.UM.AspNetMVC.Filters;
    using ONEbook.UM.Services;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class OWPCheckUMFilterAttribute : ActionFilterAttribute
    {
        private static readonly CheckUMFilterAttribute Filter = CreateCheckUMFilterAttribute();
        private static readonly ICache Cache = ConfiguredCacheService.CacheStorage;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var absolutePath = filterContext.HttpContext.Request.Url.AbsolutePath;
            var ignoredRequest = absolutePath.IndexOf("mountum", StringComparison.CurrentCultureIgnoreCase) >= 0;

            bool mountedUMPage;
            Cache.TryGet("OWP_UM_Mounted", out mountedUMPage);

            if (mountedUMPage && !ignoredRequest)
            {
                Filter.OnActionExecuting(filterContext);
            }
        }

        private static CheckUMFilterAttribute CreateCheckUMFilterAttribute()
        {
            var maintenanceService = new MaintenanceService(
                                  UMClientManager.RestClient,
                                  UMClientManager.CacheService,
                                  UMClientManager.UMClientConfigs,
                                  UMClientManager.HttpContext);

            return new CheckUMFilterAttribute(maintenanceService, UMClientManager.UMClientConfigs);
        }
    }
}
