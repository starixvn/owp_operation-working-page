using OWP.Application.DocumentTitle;
using NapUserService = Fanex.NAP.Core.Service.Impl.UserService;

namespace NAP.OWP.Websites
{
    using Fanex.Caching;
    using Fanex.Caching.Redis;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Context;
    using Fanex.NAP.Core.Service.Impl;
    using Fanex.NAP.Core.Service.Interface;
    using Fanex.NAP.Core.Web.Context;
    using Fanex.NAP.Core.Web.Session;
    using Fanex.NAP.OWP.Core.BaseClasses;
    using Fanex.NAP.OWP.Core.BaseClasses.Interfaces;
    using Fanex.NAP.OWP.Core.Configuration;
    using Fanex.NAP.OWP.Core.Quartz;
    using Fanex.NAP.OWP.Core.Services;
    using Fanex.NAP.OWP.EventManagement.Repositories.Implement;
    using Fanex.NAP.OWP.EventManagement.Repositories.Interfaces;
    using Fanex.NAP.OWP.EventManagement.Service.Implement;
    using Fanex.NAP.OWP.EventManagement.Service.Interfaces;
    using Fanex.NAP.OWP.MessageMachine.Service.Implement;
    using Fanex.NAP.OWP.MessageMachine.Service.Interfaces;
    using Fanex.NAP.OWP.TaskScheduling.Repositories.Implement;
    using Fanex.NAP.OWP.TaskScheduling.Repositories.Interfaces;
    using Fanex.NAP.OWP.TaskScheduling.Service.Implement;
    using Fanex.NAP.OWP.TaskScheduling.Service.Interfaces;

    using global::OWP;
    using global::OWP.Application.Header;
    using global::OWP.Application.Message;
    using global::OWP.EventAssignment.Permission;
    using global::OWP.RabbitMQ;
    using global::OWP.Services;
    using global::OWP.SimpleDataApi;
    using Olympus.SimpleDataApi;
    using ONEbook.UM.Configurations;
    using ONEbook.UM.Helpers;
    using ONEbook.UM.NETFramework;
    using ONEbook.UM.Services;
    using ONEbook.UM.Transport;
    using Quartz.Impl;
    using SimpleInjector;
    using SimpleInjector.Integration.Web;
    using SimpleInjector.Integration.Web.Mvc;
    using SimpleInjector.Integration.WebApi;
    using System.Reflection;
    using System.Web.Http;
    using System.Web.Mvc;

    public static class SimpleInjectorInitializer
    {
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            InitializeCore(container);
            InitializeApplication(container);
            InitializeTaskList(container);
            InitializeWorkingShift(container);
            InitializeEventPicking(container);
            InitializeEventAssignment(container);
            InitializeRabbitMq(container);
            InitializeSimpleDataApiModule(container);
            InitializeFanexCaching(container);
            InitializeNAPModules(container);
            InitializeOnebookUM(container);

            container.RegisterOWP();
            global::OWP.NotificationSetting.SimpleInjectorRegistration.Register(container);
            global::OWP.AutoAssignment.SimpleInjectorRegistration.Register(container);
            global::OWP.MessageManagement.SimpleInjectorRegistration.Register(container);
            global::OWP.ViewLog.SimpleInjectorRegistration.Register(container);
            global::OWP.UserManagement.SimpleInjectorRegistration.Register(container);
            global::OWP.OddsCompiler.SimpleInjectorRegistration.Register(container);

            InitializeQuartz(container);
            container.RegisterMvcControllers(typeof(Assembly).Assembly);
            container.Verify();

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }

        private static void InitializeQuartz(Container container)
        {
            var factory = new StdSchedulerFactory();
            var scheduler = factory.GetScheduler().Result;
            scheduler.JobFactory = new SimpleInjectorJobFactory(container);
            container.Register(() => scheduler, Lifestyle.Singleton);
        }

        private static void InitializeCore(Container container)
        {
            container.RegisterSingleton(AutoMapperConfig.Initialize);
            container.Register<ICurrentContext, CurrentContext>();
            container.Register<ICurrentSession, CurrentSession>();
            container.Register<IUserService, NapUserService>();
            container.Register<IGroupService, GroupService>();
            container.Register<ISiteService, SiteService>();
            container.Register<ISecurityService, SecurityService>();

            container.Register<IAppSettings, AppSettings>(Lifestyle.Singleton);
            container.Register<IConfigurationManagerService, ConfigurationManagerService>(Lifestyle.Singleton);
            container.Register<ConfigurationService, ConfigurationServiceImp>(Lifestyle.Singleton);
            container.Register<IOWPBaseService, OWPBaseService>(Lifestyle.Transient);
            container.Register<IBaseRepository>(() => new BaseRepository(), Lifestyle.Transient);

            container.Register<IDynamicRepository, DynamicRepository>(Lifestyle.Transient);

            container.Register<RichHttpClient, RichHttpClientImp>(Lifestyle.Singleton);
        }

        private static void InitializeApplication(Container container)
        {
            container.Register<Service, ServiceImp>(Lifestyle.Transient);
            container.Register<Repository, RepositoryImp>(Lifestyle.Transient);
            container.Register<DocumentTitleRepository, DocumentTitleRepositoryImp>(Lifestyle.Transient);
            container.Register<global::OWP.Application.Authorize.Service, global::OWP.Application.Authorize.ServiceImp>(Lifestyle.Transient);
            container.Register<global::OWP.Application.QuickSearch.Repository, global::OWP.Application.QuickSearch.RepositoryImp>(Lifestyle.Transient);
        }

        private static void InitializeTaskList(Container container)
        {
            container.Register<ITaskListTodayService, TaskListTodayService>(Lifestyle.Transient);
            container.Register<ITaskListTodayRepository, TaskListTodayRepository>(Lifestyle.Transient);
            container.Register<GetAdminSiteMatchIdService, GetAdminSiteMatchIdServiceImp>(Lifestyle.Transient);
        }

        private static void InitializeWorkingShift(Container container)
        {
            global::OWP.WorkingShift.SimpleInjectorRegistration.Register(container);
            global::OWP.WeeklyWorkingShift.SimpleInjectorRegistration.Register(container);
            global::OWP.DailyWorkingShift.SimpleInjectorRegistration.Register(container);
        }

        private static void InitializeEventPicking(Container container)
        {
            container.Register<LeagueSettingRepository, LeagueSettingRepositoryImp>(Lifestyle.Transient);
            container.Register<LeagueSettingService, LeagueSettingServiceImp>(Lifestyle.Transient);
            container.Register<LeagueSettingNewFormatService, LeagueSettingNewFormatServiceImp>(Lifestyle.Transient);
            container.Register<ExcelService, ExcelServiceImp>(Lifestyle.Transient);
            container.Register<EventPickingService, EventPickingServiceImp>(Lifestyle.Transient);
            container.Register<BuildEventInfoService, BuildEventInfoServiceImp>(Lifestyle.Transient);
        }

        private static void InitializeEventAssignment(Container container)
        {
            container.Register<EventAssignmentExportFilter, EventAssignmentExportFilterImp>(Lifestyle.Transient);
            container.Register<IEventAssignmentService, EventAssignmentService>(Lifestyle.Transient);
            container.Register<IEventAssignmentRepository, EventAssignmentRepository>(Lifestyle.Transient);
            container.Register<LstNoteMapperService, LstNoteMapperServiceImp>(Lifestyle.Transient);
            container.Register<OrderMatchService, OrderMatchServiceImp>(Lifestyle.Transient);
            container.Register<global::OWP.EventAssignment.Repositories.Repository, global::OWP.EventAssignment.Repositories.RepositoryImp>(Lifestyle.Transient);
            container.Register<EventAssignmentPermission, EventAssignmentPermissionImp>(Lifestyle.Transient);
        }

        private static void InitializeNAPModules(Container container)
        {
            container.Register<IEventInformationService, EventInformationService>(Lifestyle.Transient);
            container.Register<IEventInformationRepository, EventInformationRepository>(Lifestyle.Transient);

            container.Register<IFilterService, FilterService>(Lifestyle.Transient);
            container.Register<IFilterRepository, FilterRepository>(Lifestyle.Transient);

            container.Register<ITelevisionService, TelevisionService>(Lifestyle.Transient);
            container.Register<IAgentService, AgentService>(Lifestyle.Transient);
            container.Register<IOtherProviderService, OtherProviderService>(Lifestyle.Transient);
            container.Register<IProviderService, ProviderService>(Lifestyle.Transient);

            container.Register<IMessageBoxService, MessageBoxService>(Lifestyle.Transient);

            container.Register<ILeagueManagementService, LeagueManagementService>(Lifestyle.Transient);
        }

        private static void InitializeSimpleDataApiModule(Container container)
        {
            container.Register<SimpleCriteriaFactory, SimpleCriteriaFactoryImp>(Lifestyle.Transient);
            container.Register<SimpleFunctionPermissionFactory, SimpleFunctionPermissionFactoryImp>(Lifestyle.Transient);
            container.Register<SimpleMapperFactory, SimpleMapperFactoryImp>(Lifestyle.Transient);
        }

        private static void InitializeFanexCaching(Container container)
        {
            container.RegisterInstance<ICache>(new RedisCache(new RedisCacheOptions
            {
                ConnectionString = $"{AppSettings.RedisServer}:{AppSettings.RedisPort},password={AppSettings.RedisPassword},defaultDatabase=11",
                ApplicationName = AppSettings.RedisAppName
            }));
        }

        private static void InitializeOnebookUM(Container container)
        {
            container.RegisterInstance(new UMClientConfiguration().Initialize());
            container.RegisterInstance<ICacheService>(new CacheService());
            container.RegisterSingleton<IUMCacheService, UMCacheService>();
            container.RegisterSingleton<IPHelper, IPHelperImpl>();
            container.RegisterSingleton<IUMRestClient, UMRestClient>();
            container.RegisterSingleton<IHttpContextHelper, HttpContextHelper>();
            container.RegisterSingleton<IMaintenanceService, MaintenanceService>();
        }

        private static void InitializeRabbitMq(Container container)
        {
            container.RegisterInstance(new RabbitMqClientImp().Initialize());
        }
    }
}