namespace Fanex.NAP.OWP.Core.BaseClasses
{
    using Configuration;
    using Data.Repository;
    using Interfaces;
    using NAP.Core.Service.Interface;
    using NAP.Core.Web.Context;
    using NAP.Core.Web.Session;
    using Services;
    using System.Collections.Generic;
    using System.Web.Mvc;

    public class OWPBaseService : IOWPBaseService
    {
        private IBaseRepository baseRepository;
        private IAppSettings appSettings;
        private ICurrentContext currentContext;
        private ICurrentSession currentSession;
        private IUserService userService;
        private IConfigurationManagerService configManagerService;

        public IBaseRepository Repository
        {
            get
            {
                return baseRepository ?? (baseRepository = new BaseRepository());
            }
            set
            {
                baseRepository = value;
            }
        }

        public IAppSettings AppSettings
        {
            get
            {
                return appSettings ?? (appSettings = new AppSettings());
            }
            set
            {
                appSettings = value;
            }
        }

        public ICurrentContext CurrentContext
        {
            get
            {
                return currentContext ?? (currentContext = DependencyResolver.Current.GetService<ICurrentContext>());
            }
            set
            {
                currentContext = value;
            }
        }

        public IUserService UserService
        {
            get
            {
                return userService ?? (userService = DependencyResolver.Current.GetService<IUserService>());
            }
            set
            {
                userService = value;
            }
        }

        public ICurrentSession CurrentSession
        {
            get
            {
                return currentSession ?? (currentSession = DependencyResolver.Current.GetService<ICurrentSession>());
            }
            set
            {
                currentSession = value;
            }
        }

        public IConfigurationManagerService ConfigManagerService
        {
            get
            {
                return configManagerService ?? (configManagerService = DependencyResolver.Current.GetService<IConfigurationManagerService>());
            }
            set
            {
                configManagerService = value;
            }
        }

        public IEnumerable<T> GetData<T>(ICriteria criteria)
        {
            var repository = new DynamicRepository();
            return repository.Fetch<T>(criteria);
        }
    }
}