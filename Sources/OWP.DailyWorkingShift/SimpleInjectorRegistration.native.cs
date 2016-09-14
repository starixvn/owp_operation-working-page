namespace OWP.DailyWorkingShift
{
    using Repositories;
    using Services;
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
            container.Register<ModelService, ModelServiceImp>(Lifestyle.Transient);
        }
    }
}