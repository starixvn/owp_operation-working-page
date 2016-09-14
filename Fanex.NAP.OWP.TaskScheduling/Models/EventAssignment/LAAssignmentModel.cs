namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Constants;

    [Serializable]
    public class LAAssignmentModel : BettypeAssignmentBaseModel
    {
        public LAAssignmentModel()
        {
            MonitorType = (int)EventMonitorType.LiveAssistant;
        }
    }
}