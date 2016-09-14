namespace Fanex.NAP.OWP.TaskScheduling
{
    using System.Web.Mvc;

    public class TaskSchedulingAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "TaskScheduling";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            if (context != null)
            {
                context.MapRoute(
                    "TaskScheduling_default",
                    "TaskScheduling/{controller}/{action}/{id}",
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