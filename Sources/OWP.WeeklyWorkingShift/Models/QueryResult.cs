namespace OWP.WeeklyWorkingShift.Models
{
    using System.Collections.Generic;
    using WorkingShift.Models;

    public class QueryResult
    {
        public IList<WorkingShiftColorModel> WorkingShiftColors { get; set; }

        public IList<WorkingShiftUserModel> WorkingShiftUsers { get; set; }

        public IList<SectionPublishWorkingShiftModel> ListSectionPublish { get; set; }
    }
}