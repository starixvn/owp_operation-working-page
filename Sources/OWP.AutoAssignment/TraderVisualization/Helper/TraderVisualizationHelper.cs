namespace OWP.AutoAssignment.TraderVisualization.Helper
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Constants;
    using Models;
    using Utils;

    public static class TraderVisualizationHelper
    {
        public static bool HasAssignment(AssignmentInfo assignment, TraderInfo trader)
        {
            return IsConsistTrader(assignment, trader.UserId)
                   && IsConsistWorkingShift(trader, assignment.EventDateTime);
        }

        public static string GetEtPkValue(string extraTime)
            => EtPkConst.EtPkDict.GetValue(extraTime.ToUpperInvariant(), string.Empty);

        public static string GetEtPkValue(string firstExtraTime, string secondExtraTime)
        {
            var etPkValue = new List<string>
            {
                EtPkConst.EtPkDict.GetValue(firstExtraTime.ToUpperInvariant(), string.Empty),
                EtPkConst.EtPkDict.GetValue(secondExtraTime.ToUpperInvariant(), string.Empty)
            };
            return string.Join("+", etPkValue.Where(x => !string.IsNullOrWhiteSpace(x)));
        }

        private static bool IsConsistTrader(AssignmentInfo assignment, int traderId)
            => assignment.UserId1HHdp == traderId
               || assignment.UserId1HOu == traderId
               || assignment.UserIdFtHdp == traderId
               || assignment.UserIdFtOu == traderId;

        public static bool IsConsistWorkingShift(TraderInfo trader, DateTime eventDate)
            => (eventDate >= trader.ShiftStartTime && eventDate < trader.ShiftEndTime);
    }
}
