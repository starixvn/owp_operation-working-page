namespace NAP.OWP.Websites
{
    using System.Web.Http;
    using Fanex.NAP.Core.SignIn.Attribute;
    using global::OWP.Attributes;
    using Newtonsoft.Json;
    using Olympus.WebApi.Attributes;

    public static class WebApiConfig
    {
        public const string SessionStateUrlPrefix = "state-api/";

        public static void Register(HttpConfiguration configuration)
        {
            configuration.MapHttpAttributeRoutes();
            var defaultOption = new
            {
                id = RouteParameter.Optional
            };
            configuration.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                defaultOption);
            configuration.Filters.Add(new CheckUMApiFilterAttribute());
            configuration.Filters.Add(new SessionAuthorizeApiAttribute());
            configuration.Filters.Add(new LogExceptionFilterAttribute());
            configuration.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings
            {
                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            };
        }
    }
}