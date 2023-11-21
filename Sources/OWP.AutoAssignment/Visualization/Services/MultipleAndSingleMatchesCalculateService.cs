namespace OWP.AutoAssignment.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Consts;
    using Models;
    using Utils;

    public interface MultipleAndSingleMatchesCalculateService
    {
        IList<AssignmentModel> Calculate(IList<AssignmentModel> userAssignments);
    }

    public class MultipleAndSingleMatchesCalculateServiceImp : MultipleAndSingleMatchesCalculateService
    {
        private readonly Dictionary<int, string> multipleMatchesDict = new Dictionary<int, string>
            {
                {1, AssignmentType.MainMatch},
                {2, AssignmentType.MainMatchRB2},
                {3, AssignmentType.MainMatchRB3},
                {4, AssignmentType.MainMatchRB4},
                {5, AssignmentType.MainMatchRB5},
                {6, AssignmentType.MainMatchRB6}
            };

        public IList<AssignmentModel> Calculate(IList<AssignmentModel> userAssignments)
        {
            var result = new List<AssignmentModel>();

            var groupedAssignment = GroupMultipleMatches(userAssignments.OrderBy(x => x.EventDateTime).ToList());
            var matchGroups = groupedAssignment.GroupBy(x => x.MultipleMatchGroup).ToDictionary(x => x.Key, x => x.ToList());
            foreach (var group in matchGroups.Keys)
            {
                var matches = matchGroups.GetValue(group, new List<AssignmentModel>());
                var type = multipleMatchesDict.GetValue(matches.Count, AssignmentType.MainMatch);
                matches.ForEach(x => x.GroupName = type);

                result.AddRange(matches);
            }

            return result;
        }

        private static IList<AssignmentModel> GroupMultipleMatches(IList<AssignmentModel> assignments)
        {
            if (!assignments.Any())
            {
                return new List<AssignmentModel>();
            }

            assignments[0].MultipleMatchGroup = 1;

            for (int i = 1; i < assignments.Count; i++)
            {
                assignments[i].MultipleMatchGroup = IsKOTimeDifferentWithin5Mins(assignments[i], assignments[i - 1])
                    ? assignments[i - 1].MultipleMatchGroup
                    : assignments[i - 1].MultipleMatchGroup + 1;
            }

            return assignments;
        }

        private static bool IsKOTimeDifferentWithin5Mins(AssignmentModel assignmentA, AssignmentModel assignmentB)
           => Math.Abs(assignmentA.EventDateTime.Subtract(assignmentB.EventDateTime).TotalMinutes) <= 5;
    }
}