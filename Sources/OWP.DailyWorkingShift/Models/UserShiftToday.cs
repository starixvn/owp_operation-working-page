namespace OWP.DailyWorkingShift.Models
{
    using System;
    using Attributes;
    using Newtonsoft.Json;

    public class UserShiftToday: QueryUserShift
    {
        public int LevelId { get; set; }

        public string UserName { get; set; }
    }
}