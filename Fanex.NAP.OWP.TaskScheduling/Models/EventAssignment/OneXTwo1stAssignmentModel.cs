namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Extensions.ExcelExtensions;
    using global::OWP.Enumerations;

    [Serializable]
    public class OneXTwo1stAssignmentModel : TraderAssignmentModel
    {
        public OneXTwo1stAssignmentModel()
        {
            Bettype = (int)MajorBettype.OneXTwo1St;
        }

        [Column(ColumnName.MaxBet_1H1X2)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_1H1X2)]
        public string Spread { get; set; }

        [Column(ColumnName.Trader_1H1X2)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherTrader_1H1X2)]
        public string OtherTraders { get; set; }
    }
}