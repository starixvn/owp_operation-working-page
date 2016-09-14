namespace OWP.UserManagement
{
    using Services;
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
            container.Register<ExportService, ExportServiceImp>(Lifestyle.Transient);
            container.Register<ModelService, ModelServiceImp>(Lifestyle.Transient);
            container.Register<UsersService, UsersServiceImp>(Lifestyle.Transient);
        }
    }
}