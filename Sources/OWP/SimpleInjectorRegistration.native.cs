namespace OWP
{
    using Repositories;
    using Services;
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void RegisterOWP(this Container container)
        {
            container.Register<PermissionService, PermissionServiceImp>(Lifestyle.Transient);
            container.Register<ResourceRepository, ResourceRepositoryImp>(Lifestyle.Transient);
            container.Register<NotificationService, NotificationServiceImp>(Lifestyle.Transient);
            container.Register<UserRepository, UserRepositoryImp>(Lifestyle.Transient);
            container.Register<CheckIsLiveStatusServices, CheckIsLiveStatusServicesImp>(Lifestyle.Transient);
        }
    }
}