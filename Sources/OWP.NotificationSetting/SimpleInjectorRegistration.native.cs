namespace OWP.NotificationSetting
{
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
        }
    }
}
