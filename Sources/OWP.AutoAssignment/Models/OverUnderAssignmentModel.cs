namespace OWP.AutoAssignment.Models
{
    using System;
    using Enumerations;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class OverUnderAssignmentModel : TraderAssignmentModel
    {
        public OverUnderAssignmentModel()
        {
            Bettype = (int)MajorBettype.OverUnder;
        }

        [Column(ColumnName.MaxBet_OU)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_OU)]
        public string Spread { get; set; }

        [Column(ColumnName.OtherTrader_OU)]
        public string OtherTraders { get; set; }
    }
}