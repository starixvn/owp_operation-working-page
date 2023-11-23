namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using global::OWP.Enumerations;

    [Serializable]
    public class HandicapAssignmentModel : TraderAssignmentModel
    {
        public HandicapAssignmentModel()
        {
            Bettype = (int)MajorBettype.Handicap;
        }

        [Column(ColumnName.MaxBet_HDP)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_HDP)]
        public string Spread { get; set; }

        [Column(ColumnName.Trader_HDP)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherTrader_HDP)]
        public string OtherTraders { get; set; }
    }
}