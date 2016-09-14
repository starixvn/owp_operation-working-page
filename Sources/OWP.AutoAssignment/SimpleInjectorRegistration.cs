namespace OWP.AutoAssignment
{
    using Builder;
    using Services;
    using SimpleInjector;
    using TraderVisualization.Services;
    using Visualization.Factory;
    using Visualization.Services;

    public static class SimpleInjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
            container.Register<ExportService, ExportServiceImp>(Lifestyle.Transient);
            container.Register<GetRequestService, GetRequestServiceImp>(Lifestyle.Transient);
            container.Register<CreateRequestService, CreateRequestServiceImp>(Lifestyle.Transient);
            container.Register<SaveRequestService, SaveRequestServiceImp>(Lifestyle.Transient);
            container.Register<SchedulingMatchBuilder, SchedulingMatchBuilderImp>(Lifestyle.Transient);
            container.Register<SchedulingUserBuilder, SchedulingUserBuilderImp>(Lifestyle.Transient);
            container.Register<RequestBuilder, RequestBuilderImp>(Lifestyle.Transient);
            container.Register<Visualization.Repository, Visualization.RepositoryImp>(Lifestyle.Transient);
            container.Register<TraderVisualization.Repository, TraderVisualization.RepositoryImp>(Lifestyle.Transient);
            container.Register<VisualizationExportService, VisualizationExportServiceImp>(Lifestyle.Transient);
            container.Register<VisualizationCalculateService, VisualizationCalculateServiceImp>(Lifestyle.Transient);
            container.Register<RealAssignmentCalculateService, RealAssignmentCalculateServiceImp>(Lifestyle.Transient);
            container.Register<MultipleAndSingleMatchesCalculateService, MultipleAndSingleMatchesCalculateServiceImp>(Lifestyle.Transient);
            container.Register<SpecialProductFactory, SpecialProductFactoryImp>(Lifestyle.Transient);
            container.Register<MainMatchRuleFactory, MainMatchRuleFactoryImp>(Lifestyle.Transient);
            container.Register<TraderAnalyzerService, TraderAnalyzerServiceImp>(Lifestyle.Transient);
            container.Register<TraderExportService, TraderExportServiceImp>(Lifestyle.Transient);
            container.Register<TraderCalculateService, TraderCalculateServiceImp>(Lifestyle.Transient);
            container.Register<LinkAssignmentAnalyzerService, LinkAssignmentAnalyzerServiceImp>(Lifestyle.Transient);
            container.Register<SingleAssignmentAnalyzerService, SingleAssignmentAnalyzerServiceImp>(Lifestyle.Transient);
        }
    }
}
