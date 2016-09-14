namespace Fanex.NAP.OWP.Core.Configuration
{
    using System.Configuration;

    public class AppSettings : IAppSettings
    {
        public static string ClientTimezone => GetValue("ClientTimezone");

        public static string InfoSiteAPI => GetValue("InfositeAPI");

        public static string RedisServer => GetValue("redis_server");

        public static string RedisPort => GetValue("redis_port");

        public static string RedisPassword => GetValue("redis_password");

        public static string RedisAppName => GetValue("redis_appname");

        public static string RabbitMQConnectionString => GetValue("RabbitMQ-ConnectionString");

        public static string AutoAssignmentAPI => GetValue("AutoAssignmentAPI");

        public static string NetCoreRootUrl => GetValue("NetCoreRootUrl");

        public string TRGS_Report_ApiEndpoint => GetValue("TRGS_Report_ApiEndpoint");

        public static string RabbitMQHosting => GetValue("RabbitMQHosting");

        public static string RabbitMQVirtualHost => GetValue("RabbitMQVirtualHost");

        public static string RabbitMQUserName => GetValue("RabbitMQUserName");

        public static string RabbitMQPassword => GetValue("RabbitMQPassword");

        public static int RabbitMQPort => int.Parse(GetValue("RabbitMQPort"));

        public static string RabbitMQRequestQueue => GetValue("RabbitMQRequestQueue");

        private static string GetValue(string key) => ConfigurationManager.AppSettings[key];
    }
}