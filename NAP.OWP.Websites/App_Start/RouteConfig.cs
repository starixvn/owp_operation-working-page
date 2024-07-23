namespace NAP.OWP.Websites
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                "iframe",
                url: "WeeklyWorkingShift/iframe",
                defaults: new { controller = "WeeklyWorkingShift", action = "Iframe", id = UrlParameter.Optional });

            routes.MapRoute(
                "CatchAllRoute",
                "{*url}",
                new { controller = "NewDomain", action = "Index" }
            );
        }
    }
}