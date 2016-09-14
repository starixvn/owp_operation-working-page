namespace OWP.AutoAssignment.TraderVisualization.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using Builder;
    using Constants;
    using Helper;
    using Models;

    public interface SingleAssignmentAnalyzerService
    {
        void Calculate(TraderTimeTable model, IList<AssignmentInfo> assignments);
    }

    public class SingleAssignmentAnalyzerServiceImp : SingleAssignmentAnalyzerService
    {

        public void Calculate(TraderTimeTable model, IList<AssignmentInfo> assignments)
        {
            foreach (var assignment in assignments)
            {
                var traderOfAssignment =
                    model.Traders.Where(a => TraderVisualizationHelper.HasAssignment(assignment, a)).ToList();
                traderOfAssignment.ForEach(
                    x => x.Assignments.AddRange(CalculateAssignmentByMatch(assignment, x.UserId)));
            }
        }

        private static List<Assignment> CalculateAssignmentByMatch(AssignmentInfo assignmentInfo, int traderId)
        {
            var assignments = new List<Assignment>();

            var text = TimelineTextBuilder.GetTextForSingleMatch(assignmentInfo);
            var color = TimeLineColorBuilder.GetColorForSingleMatch(assignmentInfo, traderId);
            var startTimeMatch = new Assignment(assignmentInfo.EventDateTime, color, text);
            var endTimeMatch = new Assignment(assignmentInfo.EventDateTime.AddHours(1), color);

            assignments.Add(startTimeMatch);
            assignments.Add(endTimeMatch);

            var etPkValue = TraderVisualizationHelper.GetEtPkValue(assignmentInfo.ExtraTime);
            if (!string.IsNullOrWhiteSpace(etPkValue))
            {
                var extraTimeMatch = new Assignment(assignmentInfo.EventDateTime.AddHours(2), BackgroundColor.ETPK, etPkValue);
                assignments.Add(extraTimeMatch);
            }

            return assignments;
        }

    }
}
