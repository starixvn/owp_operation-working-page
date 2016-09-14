namespace OWP.AutoAssignment.TraderVisualization.Builder
{
    using Constants;
    using Factory;
    using Models;
    using Utils;

    public static class TimeLineColorBuilder
    {
        public static string GetColorForSingleMatch(AssignmentInfo assignment, int traderId)
        {
            if (!IsFtAssignment(assignment, traderId))
            {
                return BackgroundColor.FirstStHalf;
            }
            var fantasy = SingleMatchRuleFactory.Create(RuleType.Fantasy);
            var conner = SingleMatchRuleFactory.Create(RuleType.Corner);
            var sabaMatch = SingleMatchRuleFactory.Create(RuleType.SabaMatch);
            var mainMatch = SingleMatchRuleFactory.Create(RuleType.MainMatch);
            fantasy.NextRule = conner;
            conner.NextRule = sabaMatch;
            sabaMatch.NextRule = mainMatch;
            return fantasy.GetColor(assignment);
        }

        public static string GetColorForLinkMatch(AssignmentInfo firstAssignment, AssignmentInfo secondAssignment)
            => firstAssignment.IsSaba
                ? GetColorForLinkSaBaMatch(firstAssignment, secondAssignment)
                : BackgroundColor.FtLink2G;

        public static string GetColorForLinkSaBaMatch(AssignmentInfo firstAssignment, AssignmentInfo secondAssignment)
            => firstAssignment.SabaType == secondAssignment.SabaType
                ? BackgroundColor.SaBaTypeColor.GetValue(firstAssignment.SabaType)
                : BackgroundColor.SaBaLink2G;

        private static bool IsFtAssignment(AssignmentInfo assignment, int traderId)
            => (traderId == assignment.UserId1HHdp && traderId == assignment.UserIdFtHdp) ||
               (traderId == assignment.UserId1HOu && traderId == assignment.UserIdFtOu);
    }

}
