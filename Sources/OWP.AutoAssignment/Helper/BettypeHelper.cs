namespace OWP.AutoAssignment.Helper
{
    using System.Collections.Generic;
    using System.Linq;
    using Constant;

    public static class BettypeHelper
    {
        public static Dictionary<string, IEnumerable<int>> BuildGroupBettype(IEnumerable<int> bettypes)
        {
            var groupBettype = new Dictionary<string, IEnumerable<int>>();
            var groupFullTime = bettypes.BuildGroupBettype(AutoAssignmentConst.GroupFullTime);
            var groupBooking = bettypes.BuildGroupBettype(AutoAssignmentConst.GroupBooking);
            var groupCorner = bettypes.BuildGroupBettype(AutoAssignmentConst.GroupCorners);
            var groupOther = bettypes.BuildGroupOther(AutoAssignmentConst.AllGroup);
            if (groupFullTime.Any())
            {
                groupBettype.Add(AutoAssignmentConst.GroupFTLabel, groupFullTime);
            }
            if (groupBooking.Any())
            {
                groupBettype.Add(AutoAssignmentConst.GroupBookingLabel, groupBooking);
            }
            if (groupCorner.Any())
            {
                groupBettype.Add(AutoAssignmentConst.GroupCornerLabel, groupCorner);
            }
            if (groupOther.Any())
            {
                groupBettype.Add(AutoAssignmentConst.GroupOtherLabel, groupOther);
            }
            return groupBettype;
        }

        private static IList<int> BuildGroupOther<T>(this IEnumerable<int> bettypes, T groups) where T : List<int>
        {
            var result = new List<int>();
            foreach (var bettype in bettypes)
            {
                if (groups != null && !groups.Exists(group => group == bettype))
                {
                    result.Add(bettype);
                }
            }
            return result;
        }

        private static IList<int> BuildGroupBettype<T>(this IEnumerable<int> bettypes, T groups) where T : List<int>
        {
            return bettypes.Where(bettype => groups != null && groups.Exists(group => group == bettype)).ToList();
        }
    }
}