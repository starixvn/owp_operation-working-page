namespace OWP.NotificationSetting
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Web.Session;
    using Models;

    [RoutePrefix("api/notification-setting")]
    public class NotificationController : ApiController
    {
        private readonly Repository repository;
        private readonly ICurrentSession session;

        public NotificationController(Repository repository, ICurrentSession session)
        {
            this.repository = repository;
            this.session = session;
        }

        [Route("me")]
        public async Task<NotificationSettingViewModel> GetByCurrentUser()
        {
            var data = await repository.GetNotificationSettingByUserId(session.UserId);
            var assignees = data.Where(x => !x.IsWatcher).ToList();
            var watchers = data.Where(x => x.IsWatcher).ToList();
            var listNotifications = new NotificationSettingViewModel
            {
                Assignees = assignees,
                Watchers = watchers
            };

            return listNotifications;
        }

        [Route("update")]
        [HttpPut]
        public async Task<NotificationSettingUpdateModel> Update(NotificationSettingUpdateModel model)
        {
            model.UserId = session.UserId;
            await repository.Update(model);

            return model;
        }
    }
}