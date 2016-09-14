namespace OWP.Application.Authorize
{
    using Fanex.NAP.Core.Configuration;
    using Fanex.NAP.Core.Service.Interface;
    using Fanex.NAP.Core.Web.Session;
    using System.Threading.Tasks;

    public interface Service
    {
        Task<AuthorizeResult> Authorize(AuthorizeModel model);
    }

    public class ServiceImp : Service
    {
        private readonly IUserService userService;
        private readonly ICurrentSession session;

        public ServiceImp(ICurrentSession session, IUserService userService)
        {
            this.session = session;
            this.userService = userService;
        }

        public Task<AuthorizeResult> Authorize(AuthorizeModel model)
        {
            var policy = userService.GetPermission(session.UserId, NapSettings.Settings.SiteId, model.FunctionKey);

            var result = new AuthorizeResult
            {
                UserId = session.UserId,
                Username = session.Username,
                HasRead = policy >= 1,
                HasWrite = policy == 2,
                SiteId = NapSettings.Settings.SiteId
            };
            return Task.FromResult(result);
        }
    }
}
