namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Extensions.ExcelExtensions;

    [Serializable]
    public class Specific10MinsAssignmentModel : TraderAssignmentModel
    {
        [Column(ColumnName.Trader_10Mins)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherTrader_10Mins)]
        public string OtherTraders { get; set; }
    }
}