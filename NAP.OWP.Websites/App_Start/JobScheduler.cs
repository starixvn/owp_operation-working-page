namespace NAP.OWP.Websites
{
    using System;
    using System.Configuration;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Mvc;
    using Fanex.NAP.OWP.Core.Quartz;
    using Quartz;

    public static class JobScheduler
    {
        public static void Start()
        {
            Task.Run(async () => await StartNotifyJob());
        }

        private static async Task StartNotifyJob()
        {
            var jobEnabled = ConfigurationManager.AppSettings["NotificationJobEnabled"] == "1";
            var virtualPath = HttpRuntime.AppDomainAppVirtualPath;
            if (!jobEnabled && !virtualPath.Equals("/V1", StringComparison.CurrentCultureIgnoreCase))
            {
                return;
            }

            var scheduler = DependencyResolver.Current.GetService<IScheduler>();

            var job = JobBuilder.Create<NotifyJob>()
                .WithIdentity("Notify", "Notification")
                .Build();
            var trigger = TriggerBuilder.Create()
                .WithIdentity("Notify", "Notification")
                .StartNow()
                .WithSimpleSchedule(x => x.WithIntervalInSeconds(30).RepeatForever())
                .Build();

            await scheduler.ScheduleJob(job, trigger);
            await scheduler.Start();
        }
    }
}