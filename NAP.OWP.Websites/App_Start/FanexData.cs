namespace NAP.OWP.Websites
{
    using Fanex.Data;
    using Fanex.Data.SqlServer;

    public static class FanexData
    {
        public static void Register()
        {
            DbSettingProviderManager
                .StartNewSession()
                .WithSqlServer()
                .UseDefaultDbSettingProvider(resourcePath: "~/App_Data")
                .UseDefaultConnectionStringProvider()
                .Run();

        }
    }
}