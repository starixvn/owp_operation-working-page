using FanexLogging = Fanex.Logging;

namespace Fanex.NAP.OWP.Core.Quartz
{
    using System;
    using global::Quartz.Logging;

    public class FanexLogProvider : ILogProvider
    {
        public Logger GetLogger(string name)
        {
            return (level, func, exception, parameters) =>
            {
                if (level >= LogLevel.Info && func != null)
                {
                    Console.WriteLine("[" + DateTime.Now.ToLongTimeString() + "] [" + level + "] " + func(), parameters);
                    if (exception != null)
                    {
                        FanexLogging.LogService.Error(exception.Message, exception);
                        Console.WriteLine(exception.Message);
                    }
                }

                return true;
            };
        }

        public IDisposable OpenNestedContext(string message)
        {
            throw new NotImplementedException();
        }

        public IDisposable OpenMappedContext(string key, string value)
        {
            throw new NotImplementedException();
        }
    }
}
