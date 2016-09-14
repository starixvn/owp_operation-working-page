namespace Fanex.NAP.OWP.Core.Services
{
    public interface IConfigurationManagerService
    {
        T GetAppSetting<T>(string key);
    }
}