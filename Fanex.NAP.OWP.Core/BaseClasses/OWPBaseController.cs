namespace Fanex.NAP.OWP.Core.BaseClasses
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Criteria;
    using global::OWP.Models;
    using Interfaces;
    using NAP.Core.Business;
    using NAP.Core.Configuration;
    using NAP.Core.Web;
    using NAP.Core.Web.Session;

    public class OWPBaseController : Controller
    {
        protected IOWPBaseService BaseService;

        public OWPBaseController()
        {
            BaseService = new OWPBaseService();
            ViewFlags = new ViewFlags
            {
                IsReCheckin = NapSettings.Settings.EnableReCheckIn,
                IsLive = NapSettings.Settings.Environment == Constant.LIVE,
                HasEditRight = false
            };

            ViewBag.Session = CurrentSession;
        }

        public ICurrentSession CurrentSession
        {
            get { return BaseService.CurrentSession; }
        }

        protected ViewFlags ViewFlags
        {
            get
            {
                return ViewBag.ViewFlags;
            }

            set
            {
                ViewBag.ViewFlags = value;
            }
        }

        public bool HasRight(string functionKey, Constant.Policy policy)
        {
            var functionPolicy = BaseService.UserService.GetPermission(
                CurrentSession.UserId,
                NapSettings.Settings.SiteId,
                functionKey);
            return functionPolicy >= (int)policy;
        }

        protected IEnumerable<ReferenceResource> GetResourceByName(string name)
        {
            var criteria = new GetRefResourceByNameCriteria { RefName = name };

            return BaseService.GetData<ReferenceResource>(criteria);
        }
    }
}