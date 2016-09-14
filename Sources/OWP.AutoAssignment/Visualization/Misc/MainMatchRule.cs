namespace OWP.AutoAssignment.Visualization.Misc
{
    using System.Collections.Generic;
    using System.Linq;
    using Consts;
    using Models;
    using Utils;

    public class MainMatchRule
    {
        public MainMatchRule NextRule { get; set; }

        public virtual string Execute(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            return NextRule?.Execute(assignment, userAssignments) ?? AssignmentType.Other;
        }
    }

    public class FTCornerRule : MainMatchRule
    {
        private readonly int[] cornerBettypeArray = {
            BettypeConst.NextCorner,
            BettypeConst.NoOfCorner,
            BettypeConst.NoOfCorner15Mins,
            BettypeConst.AwaySingleTeamOUOfCorners,
            BettypeConst.HomeSingleTeamOUOfCorners,
            BettypeConst.LastCorner,
            BettypeConst.SingleTeamOUOfCorners,
        };

        public override string Execute(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            return IsContainCorner(assignment, userAssignments) ? AssignmentType.TwoInOneMatch : base.Execute(assignment, userAssignments);
        }

        private bool IsContainCorner(AssignmentModel assignment, IList<AssignmentModel> assignments)
        {
            return assignments.Any(x => x.MinorBettypeId.HasValue && cornerBettypeArray.Contains(x.MinorBettypeId.Value) && x.ParentMatchId == assignment.OWPMatchId);
        }
    }

    public class IsFantasyRule : MainMatchRule
    {
        public override string Execute(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            return IsFantasy(assignment.OWPLeagueName) ? AssignmentType.FantasyMatch : base.Execute(assignment, userAssignments);
        }

        private static bool IsFantasy(string leagueName)
            => leagueName.IsContainsIgnoreCase("FANTASY MATCH");
    }

    public class VirtualSoccerRule : MainMatchRule
    {
        private readonly Dictionary<int, string> sabaDictionary = new Dictionary<int, string>
        {
            {6, AssignmentType.SABA5Mins},
            {1, AssignmentType.SABA15Mins},
            {2, AssignmentType.SABA20Mins},
            {3, AssignmentType.SABA16Mins},
            {4, AssignmentType.SABA6Mins},
            {5, AssignmentType.SABAM88}
        };

        public override string Execute(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            return assignment.IsSaba && assignment.SabaType.HasValue ? 
                sabaDictionary.GetValue(assignment.SabaType.Value, AssignmentType.Other) : 
                base.Execute(assignment, userAssignments);
        }
    }
}