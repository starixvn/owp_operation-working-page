namespace NAP.OWP.Websites
{
    using System.Web.Mvc;
    using Fanex.NAP.Core.SignIn.Attribute;
    using global::OWP.Attributes;

    public static class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new OWPCheckUMFilterAttribute());
            filters.Add(new SessionAuthorizeAttribute());
            filters.Add(new BackdoorAttribute());
        }
    }
}