namespace NAP.OWP.Websites
{
    using System;
    using System.Diagnostics.CodeAnalysis;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.SessionState;
    using Fanex.NAP.OWP.Core.Notification;
    using Fanex.NAP.OWP.Core.Quartz;
    using Microsoft.AspNet.SignalR;
    using Olympus.SimpleDataApi;
    using Quartz.Logging;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            LogProvider.SetCurrentLogProvider(new FanexLogProvider());
            FanexData.Register();
            FanexLogging.Register();
            FanexCaching.Register();
            OnebookUMConfig.Register();
            SimpleInjectorInitializer.Initialize();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteTable.Routes.MapMvcAttributeRoutes();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalHost.DependencyResolver.Register(typeof(IUserIdProvider), () => new UserIdProvider());
            JobScheduler.Start();
            SimpleDataApiConfigurationHandler.Instance()
                .SetActorIdParameterName("ActorId");
            // Make long polling connections wait a maximum of 110 seconds for a
            // response. When that time expires, trigger a timeout command and
            // make the client reconnect.
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(110);

            // Wait a maximum of 30 seconds after a transport connection is lost
            // before raising the Disconnected event to terminate the SignalR connection.
            GlobalHost.Configuration.DisconnectTimeout = TimeSpan.FromSeconds(30);

            // For transports other than long polling, send a keepalive packet every
            // 10 seconds. 
            // This value must be no more than 1/3 of the DisconnectTimeout value.
            GlobalHost.Configuration.KeepAlive = TimeSpan.FromSeconds(10);
        }

        [SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Justification = "Reviewed.")]
        [SuppressMessage("Microsoft.Globalization", "CA1303:Do not pass literals as localized parameters", Justification = "Reviewed.")]
        [SuppressMessage("Microsoft.Naming", "CA2204:Literals should be spelled correctly", Justification = "Reviewed.")]
        protected void Application_Error(object sender, EventArgs e)
        {
            FanexLogging.HandleApplicationError(Server);
        }

        protected void Application_PostAuthorizeRequest()
        {
            var sessionStateBehaviour = SessionStateBehavior.ReadOnly;
            if (IsWebApiRequest())
            {
                sessionStateBehaviour = SessionStateBehavior.Required;
            }

            HttpContext.Current.SetSessionStateBehavior(sessionStateBehaviour);
        }

        protected void Application_EndRequest()
        {
            if (Context.Response.StatusCode == 302 &&
                Context.Request.Headers["X-Requested-With"] == "XMLHttpRequest" &&
                Context.Response.RedirectLocation != null &&
                Context.Response.RedirectLocation.Contains(FormsAuthentication.LoginUrl))
            {
                Context.Response.Clear();
                Context.Response.StatusCode = 401;
            }
        }

        private bool IsWebApiRequest()
        {
            var request = HttpContext.Current.Request;
            return request.Url.ToString().Contains(WebApiConfig.SessionStateUrlPrefix);
        }
    }
}