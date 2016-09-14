namespace OWP.AutoAssignment.Models
{
    using System;
    using Enumerations;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

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

        [Column(ColumnName.OtherTrader_HDP)]
        public string OtherTraders { get; set; }
    }
}