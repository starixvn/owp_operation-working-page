namespace OWP.AutoAssignment.Models
{
    using System;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class AutoTraderModel : LAAssignmentModel
    {
        [Column(ColumnName.Trader_HDP)]
        public string Trader_FTHDP { get; set; }

        [Column(ColumnName.Trader_OU)]
        public string Trader_FTOU { get; set; }

        [Column(ColumnName.Trader_1HHDP)]
        public string Trader_1HHDP { get; set; }

        [Column(ColumnName.Trader_1HOU)]
        public string Trader_1HOU { get; set; }
    }
}