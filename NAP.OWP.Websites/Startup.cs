using Microsoft.Owin;
using NAP.OWP.Websites;

[assembly: OwinStartup(typeof(Startup))]

namespace NAP.OWP.Websites
{
    using System;
    using System.Globalization;
    using Fanex.Logging;
    using global::OWP.Resources;
    using Microsoft.AspNet.SignalR;
    using Owin;

    public static class Startup
    {
        public static void Configuration(IAppBuilder app)
        {
            try
            {
                var config = new HubConfiguration
                {
                    EnableJavaScriptProxies = true,
                    EnableDetailedErrors = true,
                };

                app.MapSignalR(config);
            }
            catch (ArgumentException ex)
            {
                var message = string.Format(CultureInfo.InvariantCulture, ViewLang.SignalR_Err, ex);
                LogService.Error(message);
            }
        }
    }
}