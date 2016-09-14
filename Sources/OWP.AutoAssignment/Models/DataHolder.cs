namespace OWP.AutoAssignment.Models
{
    using System.Collections.Generic;

    public class DataHolder
    {
        public IEnumerable<SchedulingMatch> Matches { get; set; }

        public IEnumerable<SchedulingLAUser> Suspenders { get; set; }

        public IEnumerable<TraderInfo> Traders { get; set; }
    }
}