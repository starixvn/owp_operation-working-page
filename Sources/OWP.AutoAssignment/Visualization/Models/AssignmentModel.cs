namespace OWP.AutoAssignment.Visualization.Models
{
    using System;

    public class AssignmentModel
    {
        public int UserId_LA { get; set; }

        public int AssignmentId { get; set; }

        public string ProviderName { get; set; }

        public int? MinorBettypeId { get; set; }

        public int OWPMatchId { get; set; }

        public string OWPLeagueName { get; set; }

        public int? ParentMatchId { get; set; }

        public string GroupName { get; set; } = string.Empty;

        public int MultipleMatchGroup { get; set; }

        public string ExtraTime { get; set; } = string.Empty;

        public string ETPK { get; set; } = string.Empty;

        public string FullTimeETPK { get; set; } = string.Empty;

        public DateTime EventDateTime { get; set; }

        public bool IsSaba { get; set; }

        public int? SabaType { get; set; }
    }
}
