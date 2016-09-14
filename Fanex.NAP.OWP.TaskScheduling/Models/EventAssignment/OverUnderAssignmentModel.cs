namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Extensions.ExcelExtensions;
    using global::OWP.Enumerations;

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

        [Column(ColumnName.Trader_OU)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherTrader_OU)]
        public string OtherTraders { get; set; }
    }
}