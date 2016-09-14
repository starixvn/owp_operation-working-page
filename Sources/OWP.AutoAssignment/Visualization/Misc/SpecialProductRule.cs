namespace OWP.AutoAssignment.Visualization.Misc
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Consts;
    using Models;

    public class SpecialProductRule
    {
        public SpecialProductRule NextRule { get; set; }

        public virtual string Execute(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            return NextRule?.Execute(assignment, userAssignments) ?? AssignmentType.Other;
        }
    }

    public class NotCornerRule : SpecialProductRule
    {

        public override string Execute(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            if (assignment.MinorBettypeId.HasValue && BettypeConst.TotalBooking == assignment.MinorBettypeId.Value)
            {
                return AssignmentType.TotalBookingMatch;
            }

            return base.Execute(assignment, userAssignments);
        }
    }

    public class IsCornerRule : SpecialProductRule
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
            if (assignment.MinorBettypeId.HasValue && Array.IndexOf(cornerBettypeArray, assignment.MinorBettypeId.Value) >= 0)
            {
                var mainMatches = userAssignments.Where(x => !x.ParentMatchId.HasValue
                && x.OWPMatchId == assignment.ParentMatchId
                && x.EventDateTime == assignment.EventDateTime);

                return mainMatches.Any() ? AssignmentType.TwoInOneMatch : AssignmentType.Corner;
            }

            return base.Execute(assignment, userAssignments);
        }
    }
}