namespace Fanex.NAP.OWP.Core.Quartz
{
    using System;
    using System.Threading.Tasks;
    using System.Web;
    using global::OWP.Services;
    using global::Quartz;
    using Logging;
    using ONEbook.UM.Services;

    [DisallowConcurrentExecution]
    public class NotifyJob : IJob
    {
        private readonly IMaintenanceService maintenanceService;

        private readonly NotificationService notificationService;

        public NotifyJob(IMaintenanceService maintenanceService, NotificationService notificationService)
        {
            this.maintenanceService = maintenanceService;
            this.notificationService = notificationService;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                if (await maintenanceService.IsUnderMaintenanceAsync())
                {
                    return;
                }

                await notificationService.Notify();
            }
            catch (Exception e)
            {
                var currentDirectory = HttpRuntime.AppDomainAppPath;
                var message = $"Error in NotifyJob: {e.Message}. Current Directory: {currentDirectory}";
                await Logger.Log.ErrorAsync(message);
            }
        }
    }
}
