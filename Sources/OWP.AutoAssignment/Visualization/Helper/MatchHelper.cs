namespace OWP.AutoAssignment.Visualization.Helper
{
    using System.Collections.Generic;
    using Models;
    using Consts;
    using Utils;

    public static class MatchHelper
    {
        private static readonly Dictionary<int, string> sabaDictionary = new Dictionary<int, string>
        {
            {6, AssignmentType.SABA5Mins},
            {1, AssignmentType.SABA15Mins},
            {2, AssignmentType.SABA20Mins},
            {3, AssignmentType.SABA16Mins},
            {4, AssignmentType.SABA6Mins},
            {5, AssignmentType.SABAM88}
        };

        public static string GetGroupName(AssignmentModel assignment)
        {
            if (!assignment.IsSaba || !assignment.SabaType.HasValue)
            {
                return assignment.GroupName;
            }

            return sabaDictionary.GetValue(assignment.SabaType.Value, assignment.GroupName);
        }
    }
}