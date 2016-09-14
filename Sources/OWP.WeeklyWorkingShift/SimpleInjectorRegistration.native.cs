namespace OWP.WeeklyWorkingShift
{
    using Repositories;
    using Services;
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
            container.Register<ImportService, ImportServiceImp>(Lifestyle.Transient);
            container.Register<ExportService, ExportServiceImp>(Lifestyle.Transient);
            container.Register<ViewLogService, ViewLogServiceImp>(Lifestyle.Transient);
        }
    }
}