namespace OWP.AutoAssignment.Models
{
    using System;
    using Enumerations;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class Handicap1stAssignmentModel : TraderAssignmentModel
    {
        public Handicap1stAssignmentModel()
        {
            Bettype = (int)MajorBettype.Handicap1St;
        }

        [Column(ColumnName.MaxBet_1HHDP)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_1HHDP)]
        public string Spread { get; set; }

        [Column(ColumnName.OtherTrader_1HHDP)]
        public string OtherTraders { get; set; }
    }
}