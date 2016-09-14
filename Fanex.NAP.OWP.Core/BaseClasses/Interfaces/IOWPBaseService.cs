namespace Fanex.NAP.OWP.Core.BaseClasses.Interfaces
{
    using Configuration;
    using Data.Repository;
    using NAP.Core.Service.Interface;
    using NAP.Core.Web.Context;
    using NAP.Core.Web.Session;
    using Services;
    using System.Collections.Generic;

    public interface IOWPBaseService
    {
        IBaseRepository Repository { get; set; }

        IAppSettings AppSettings { get; set; }

        ICurrentContext CurrentContext { get; set; }

        IUserService UserService { get; set; }

        ICurrentSession CurrentSession { get; set; }

        IConfigurationManagerService ConfigManagerService { get; set; }

        IEnumerable<T> GetData<T>(ICriteria criteria);
    }
}