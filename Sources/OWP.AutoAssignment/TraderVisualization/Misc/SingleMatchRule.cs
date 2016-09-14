namespace OWP.AutoAssignment.TraderVisualization.Misc
{
    using Constants;
    using Models;
    using Utils;

    public class SingleMatchRule
    {
        public SingleMatchRule NextRule { get; set; }

        public virtual string GetColor(AssignmentInfo assignment)
        {
            return NextRule?.GetColor(assignment) ?? BackgroundColor.WorkingShift;
        }
    }

    public class FantasyRule : SingleMatchRule
    {
        public override string GetColor(AssignmentInfo assignment)
        {
            return IsFantasyRule(assignment.GroupName) ? BackgroundColor.FantasyMatch
                : base.GetColor(assignment);
        }

        private static bool IsFantasyRule(string groupName)
            => groupName.IsContainsIgnoreCase("Fantasy");
    }

    public class ConnerRule : SingleMatchRule
    {
        public override string GetColor(AssignmentInfo assignment)
        {
            return IsConnerRule(assignment.BetType) ? BackgroundColor.Corner
                : base.GetColor(assignment);
        }

        private static bool IsConnerRule(int betType)
            => betType == BetType.NextCorner || betType == BetType.NoCorner;
    }

    public class SabaMatchRule : SingleMatchRule
    {
        public override string GetColor(AssignmentInfo assignment)
        {
            return assignment.IsSaba ? BackgroundColor.SaBaTypeColor.GetValue(assignment.SabaType)
                : base.GetColor(assignment);
        }

    }

    public class MainMatchRule : SingleMatchRule
    {
        public override string GetColor(AssignmentInfo assignment)
        {
            if (!IsMainMatchRule(assignment))
            {
                return base.GetColor(assignment);
            }
            if (assignment.MaxBet >= MaxBetMainMatch.Over50K)
            {
                return BackgroundColor.MainMatchOver50K;
            }
            if (assignment.MaxBet >= MaxBetMainMatch.From25KTo40K.Item1 &&
                assignment.MaxBet <= MaxBetMainMatch.From25KTo40K.Item2)
            {
                return BackgroundColor.MainMatch25To40K;
            }
            if (assignment.MaxBet >= MaxBetMainMatch.From2KTo20K.Item1 &&
                assignment.MaxBet <= MaxBetMainMatch.From2KTo20K.Item2)
            {
                return BackgroundColor.MainMatch2To20K;
            }
            return base.GetColor(assignment);
        }

        private static bool IsMainMatchRule(AssignmentInfo assignment)
            => assignment.BetType == BetType.MainMatch && assignment.MaxBet.HasValue;
    }

}
