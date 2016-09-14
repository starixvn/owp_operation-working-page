namespace OWP.AutoAssignment.Models
{
    using System;

    public class MatchInfo
    {
        public int MatchId { get; set; }

        public DateTime KOTime { get; set; }

        public TimeSpan? OtherTime { get; set; }

        public int SchedulingBettypeId { get; set; }

        public bool HasTV { get; set; }

        public double MaxBet { get; set; }

        public bool IsSoloMatch { get; set; }

        public bool IsMajorLeague { get; set; }

        public string Provider { get; set; }

        public string ExtraTime { get; set; }

        public string Venue { get; set; }

        public bool IsFantasy { get; set; }

        public bool HasReporter { get; set; }

        public bool HasChannel { get; set; }

        public bool RequireChinese { get; set; }
    }
}