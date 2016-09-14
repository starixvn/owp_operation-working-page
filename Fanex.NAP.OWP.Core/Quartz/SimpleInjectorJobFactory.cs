namespace Fanex.NAP.OWP.Core.Quartz
{
    using System;
    using global::Quartz;
    using global::Quartz.Spi;

    public class SimpleInjectorJobFactory : IJobFactory
    {
        private readonly IServiceProvider serviceProvider;

        public SimpleInjectorJobFactory(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            var jobDetail = bundle.JobDetail;
            var jobType = jobDetail.JobType;
            return serviceProvider.GetService(jobType) as IJob;
        }

        public void ReturnJob(IJob job)
        {
            var disposable = job as IDisposable;
            disposable?.Dispose();
        }
    }
}
