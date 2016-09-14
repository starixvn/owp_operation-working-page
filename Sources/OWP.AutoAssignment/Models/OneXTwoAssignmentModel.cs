namespace OWP.AutoAssignment.Models
{
    using System;
    using Enumerations;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class OneXTwoAssignmentModel : TraderAssignmentModel
    {
        public OneXTwoAssignmentModel()
        {
            Bettype = (int)MajorBettype.OneXTwo;
        }

        [Column(ColumnName.MaxBet_1X2)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_1X2)]
        public string Spread { get; set; }

        [Column(ColumnName.Trader_1X2)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherTrader_1X2)]
        public string OtherTraders { get; set; }
    }
}