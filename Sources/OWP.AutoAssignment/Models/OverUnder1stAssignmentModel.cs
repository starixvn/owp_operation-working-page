namespace OWP.AutoAssignment.Models
{
    using System;
    using Enumerations;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class OverUnder1stAssignmentModel : TraderAssignmentModel
    {
        public OverUnder1stAssignmentModel()
        {
            Bettype = (int)MajorBettype.OverUnder1St;
        }

        [Column(ColumnName.MaxBet_1HOU)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_1HOU)]
        public string Spread { get; set; }

        [Column(ColumnName.OtherTrader_1HOU)]
        public string OtherTraders { get; set; }
    }
}