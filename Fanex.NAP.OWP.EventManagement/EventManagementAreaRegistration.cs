namespace Fanex.NAP.OWP.EventManagement
{
    using System.Web.Mvc;

    public class EventManagementAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "EventManagement";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            if (context != null)
            {
                context.MapRoute(
                    "EventManagement_default",
                    "EventManagement/{controller}/{action}/{id}",
                    new { action = "Index", id = UrlParameter.Optional });

                Registerdependency();
            }
        }

        private void Registerdependency()
        {
            //// to do
        }
    }
}