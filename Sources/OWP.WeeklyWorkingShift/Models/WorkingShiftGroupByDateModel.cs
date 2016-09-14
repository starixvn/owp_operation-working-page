namespace OWP.WeeklyWorkingShift.Models
{
    using System;
    using System.Collections.Generic;
    using WorkingShift.Models;

    public class WorkingShiftGroupByDateModel
    {
        public WorkingShiftColorModel WorkingShiftColor { get; set; }

        public Dictionary<DateTime, List<WorkingShiftModel>> WorkingShiftDates { get; set; }
    }
}
