namespace NAP.OWP.Websites
{
    using Fanex.Caching;
    using Fanex.Caching.Redis;
    using Fanex.NAP.OWP.Core.Configuration;

    public static class FanexCaching
    {
        public static void Register()
        {
            CacheServiceManager.Use(() => new RedisCache(new RedisCacheOptions
            {
                ConnectionString = $"{AppSettings.RedisServer}:{AppSettings.RedisPort},password={AppSettings.RedisPassword},defaultDatabase=11",
                ApplicationName = AppSettings.RedisAppName
            }));
        }
    }
}