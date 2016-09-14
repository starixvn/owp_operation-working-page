namespace OWP.AutoAssignment.Models
{
    using System;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class Specific10MinsAssignmentModel : TraderAssignmentModel
    {
        [Column(ColumnName.Trader_10Mins)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherTrader_10Mins)]
        public string OtherTraders { get; set; }
    }
}