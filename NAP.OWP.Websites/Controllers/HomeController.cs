using System.Net.Http;

namespace NAP.OWP.Websites.Controllers
{
    using Fanex.Caching;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Fanex.NAP.Core.Web.Session;
    using global::OWP.Application.Header;
    using global::OWP.Constants;
    using global::OWP.Services;
    using System;
    using System.Configuration;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        private readonly Service headerService;
        private readonly PermissionService permissionService;
        private readonly ICache cache;
        private readonly ICurrentSession session;
        private readonly AccessCounter accessCounter;

        public HomeController(Service headerService, PermissionService permissionService, ICache cache,
            ICurrentSession session, AccessCounter accessCounter)
        {
            this.headerService = headerService;
            this.permissionService = permissionService;
            this.cache = cache;
            this.session = session;
            this.accessCounter = accessCounter;
        }
    }
}