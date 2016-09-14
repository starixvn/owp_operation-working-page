namespace Fanex.NAP.OWP.Core.Services
{
    using System.ComponentModel;
    using System.Configuration;

    public class ConfigurationManagerService : IConfigurationManagerService
    {
        public T GetAppSetting<T>(string key)
        {
            var converter = TypeDescriptor.GetConverter(typeof(T));

            var appSetting = ConfigurationManager.AppSettings[key];

            if (string.IsNullOrWhiteSpace(appSetting))
            {
                return default(T);
            }

            return (T)converter.ConvertFromInvariantString(appSetting);
        }
    }
}