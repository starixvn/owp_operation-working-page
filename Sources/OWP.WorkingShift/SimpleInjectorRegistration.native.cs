namespace OWP.WorkingShift
{
    using Repositories;
    using Services;
    using SimpleInjector;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<WorkingShiftColorRepository, RepositoryWorkingShiftColorImp>(Lifestyle.Transient);
            container.Register<WorkingShiftTimezoneSettingRepository, WorkingShiftTimezoneSettingRepositoryImp>(Lifestyle.Transient);
            container.Register<WorkingShiftPublishRepository, WorkingShiftPublishRepositoryImp>(Lifestyle.Transient);
            container.Register<WorkingShiftDefaultRepository, WorkingShiftDefaultRepositoryImp>(Lifestyle.Transient);
            container.Register<WorkingShiftOrderRepository, WorkingShiftOrderRepositoryImp>(Lifestyle.Transient);
            container.Register<WorkingShiftRepository, WorkingShiftRepositoryImp>(Lifestyle.Transient);
            container.Register<ModelService, ModelServiceImp>(Lifestyle.Transient);
        }
    }
}