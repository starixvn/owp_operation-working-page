namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Constants;

    [Serializable]
    public class TraderAssignmentModel : BettypeAssignmentBaseModel
    {
        protected TraderAssignmentModel()
        {
            MonitorType = (int)EventMonitorType.Trader;
        }
    }
}