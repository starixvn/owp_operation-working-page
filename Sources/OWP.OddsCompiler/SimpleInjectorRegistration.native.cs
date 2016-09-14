namespace OWP.OddsCompiler
{
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
            container.Register<ExcelExportService, ExcelExportServiceImp>(Lifestyle.Transient);
        }
    }
}