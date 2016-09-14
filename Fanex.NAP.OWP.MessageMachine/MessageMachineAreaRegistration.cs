namespace Fanex.NAP.OWP.MessageMachine
{
    using System.Web.Mvc;

    public class MessageMachineAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MessageMachine";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            if (context != null)
            {
                context.MapRoute(
                    "MessageMachine_default",
                    "MessageMachine/{controller}/{action}/{id}",
                    new { action = "Index", id = UrlParameter.Optional });
            }
        }
    }
}