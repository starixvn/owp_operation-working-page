using System;
using System.Collections.Generic;
using System.Linq;
using OWP.AutoAssignment.Visualization.Consts;
using OWP.AutoAssignment.Visualization.Models;
using OWP.Utils;

namespace OWP.AutoAssignment.Visualization.Helper
{
    public static class VisualizationHelper
    {
        public static bool IsETPK(string extraTime)
        {
            return extraTime == "ET/PK" || extraTime == "ETPK" || extraTime == "ET" || extraTime == "PK";
        }

        public static string GetETPKValue(AssignmentModel match, List<AssignmentModel> matches)
        {
            if (!match.GroupName.Contains("RB"))
            {
                return match.ExtraTime.Replace("ETPK", "ET/PK");

            }

            var linkedMatches = matches
                .Where(x => x.GroupName.Equals(match.GroupName, StringComparison.OrdinalIgnoreCase))
                .OrderBy(x => x.EventDateTime);

            return string.Join("+", linkedMatches.Where(x => IsETPK(x.ExtraTime)).Select(x => x.ExtraTime.Replace("ETPK", "ET/PK")));

        }

        public static string GetColor(string groupName)
        {
            if (groupName.StartsWith("RB"))
            {
                groupName = groupName.Substring(0, 3);
            }

            return BackgroundColor.ColorByGroupName.GetValue(groupName, string.Empty);
        }

        public static string GetValue(AssignmentModel match, List<AssignmentModel> matches)
        {
            if (match.GroupName.Contains("RB"))
            {
                var linkedMatches = matches
                    .Where(x => x.GroupName.Equals(match.GroupName, StringComparison.OrdinalIgnoreCase))
                    .OrderBy(x => x.EventDateTime)
                    .Select(x => x.EventDateTime);

                var value = string.Empty;

                if (linkedMatches.FirstOrDefault() != null)
                {
                    value = linkedMatches.First().Minute == 0
                        ? $"V+{string.Join("+", linkedMatches.Skip(1).Select(x => $"{x:hh:mm}"))}"
                        : string.Join("+", linkedMatches.Select(x => $"{x:hh:mm}"));
                }

                return value;
            }

            return match.EventDateTime.Minute == 0
                ? "V"
                : $"{match.EventDateTime:hh:mm}";
        }
    }
}