namespace OWP.AutoAssignment.TraderVisualization.Builder
{
    using System.Collections.Generic;
    using System.Linq;
    using Models;
    using Utils;

    public static class TimelineTextBuilder
    {
        public static string GetTextForSingleMatch(AssignmentInfo assignment)
        {

            var koTimeFormat = GetKoTimeFormat(assignment);
            var maxBetFormat = GetMaxBet(assignment) + GetLaRole(assignment);
            var textItems = new List<string> { koTimeFormat, maxBetFormat };
            return string.Join("/", textItems.Where(x => !string.IsNullOrEmpty(x)));
        }

        public static string GetTextForLinkMatch(AssignmentInfo firstAssignment, AssignmentInfo secondAssignment)
        {
            var linkKoTime = GetLinkKoTime(firstAssignment, secondAssignment);
            var linkMaxBet = GetLinkMaxBet(firstAssignment, secondAssignment);
            var linkedTextItems = new List<string> { linkKoTime, linkMaxBet };
            return string.Join("/", linkedTextItems.Where(x => !string.IsNullOrEmpty(x)));
        }

        public static string GetLinkMaxBet(AssignmentInfo firstAssignment, AssignmentInfo secondAssignment)
        {
            var firstMaxBet = GetMaxBet(firstAssignment) + GetLaRole(firstAssignment);
            var secondMaxBet = GetMaxBet(secondAssignment) + GetLaRole(secondAssignment);
            var maxBetFormat = new List<string> { firstMaxBet, secondMaxBet };
            return string.Join("+", maxBetFormat.Where(x => !string.IsNullOrEmpty(x)));
        }

        public static string GetLinkKoTime(AssignmentInfo firstAssignment, AssignmentInfo secondAssignment)
        {
            var firstKoTime = GetKoTimeFormat(firstAssignment);
            var secondKoTime = GetKoTimeFormat(secondAssignment);
            var linkKoTime = new List<string> { firstKoTime, secondKoTime };
            return string.Join("+", linkKoTime.Where(x => !string.IsNullOrEmpty(x)));
        }

        public static string GetMaxBet(AssignmentInfo assignment)
        => assignment.MaxBet.HasValue
            ? assignment.MaxBet.ToOWPMaxBetFormat()
            : string.Empty;

        public static string GetKoTimeFormat(AssignmentInfo assignment)
            => assignment.EventDateTime.Minute == 0 ? "V"
                : $"{assignment?.EventDateTime:hh:mm}";

        public static string GetLaRole(AssignmentInfo assignment)
        {
            if (assignment.UserIdLa == assignment.UserId1HHdp &&
                assignment.UserIdLa == assignment.UserId1HOu &&
                assignment.UserIdLa == assignment.UserIdFtHdp &&
                assignment.UserIdLa == assignment.UserIdFtOu)
            {
                return "**";
            }
            return string.Empty;
        }



    }
}
