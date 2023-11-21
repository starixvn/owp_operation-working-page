namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;

    [Serializable]
    public class SpecificXMinsAssignmentModel
    {
        [Column(ColumnName.MaxBet_XMins)]
        public string MaxBet { get; set; }

        [Column(ColumnName.Spread_XMins)]
        public string Spread { get; set; }
    }
}