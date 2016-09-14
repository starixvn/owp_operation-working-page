namespace OWP.AutoAssignment.TraderVisualization.Models
{
    using System;

    public class AssignmentInfo
    {
        public int InfoSiteMatchId { get; set; }

        public DateTime EventDateTime { get; set; }

        public decimal? MaxBet { get; set; }

        public string GroupName { get; set; }

        public string ExtraTime { get; set; }

        public string GroupTrader { get; set; }

        public int BetType { get; set; }

        public bool IsSaba { get; set; }

        public int SabaType { get; set; }

        public int UserId1HHdp { get; set; }

        public int UserId1HOu { get; set; }

        public int UserIdFtOu { get; set; }

        public int UserIdFtHdp { get; set; }

        public int UserIdLa { get; set; }
    }
}
