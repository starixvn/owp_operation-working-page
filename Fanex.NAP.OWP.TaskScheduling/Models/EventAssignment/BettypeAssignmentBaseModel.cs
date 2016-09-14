namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Extensions.ExcelExtensions;

    [Serializable]
    public class BettypeAssignmentBaseModel
    {
        [ExcelIgnore]
        public int Bettype { get; set; }

        [ExcelIgnore]
        public int MonitorType { get; set; }
    }
}