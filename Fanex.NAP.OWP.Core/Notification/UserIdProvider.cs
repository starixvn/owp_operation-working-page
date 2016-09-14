namespace Fanex.NAP.OWP.Core.Notification
{
    using Microsoft.AspNet.SignalR;

    public class UserIdProvider : IUserIdProvider
    {
        public string GetUserId(IRequest request)
        {
            return request?.User?.Identity?.Name;
        }
    }
}