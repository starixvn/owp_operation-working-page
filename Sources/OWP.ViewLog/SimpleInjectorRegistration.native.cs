namespace OWP.ViewLog
{
    using Services;
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<LogService, LogServiceImp>(Lifestyle.Transient);
            container.Register<TemplateService, TemplateServiceImp>(Lifestyle.Transient);
        }
    }
}