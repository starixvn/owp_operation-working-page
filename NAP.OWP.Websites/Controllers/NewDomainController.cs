
using System.Web.Mvc;

namespace NAP.OWP.Websites.Controllers
{
    [AllowAnonymous]
    public class NewDomainController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }
    }
}