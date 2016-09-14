namespace OWP.NotificationSetting.Models
{
    using System.Collections.Generic;

    public class NotificationSettingViewModel
    {
        public List<NotificationSettingMapping> Assignees { get; set; }

        public List<NotificationSettingMapping> Watchers { get; set; }

        public bool IsWatcher { get; set; }
    }
}