using System.Collections.Generic;
using System.Linq;

namespace OWP.AutoAssignment.TraderVisualization.Services
{
    using Builder;
    using Constants;
    using Fanex.Common.Extensions;
    using Helper;
    using Models;

    public interface LinkAssignmentAnalyzerService
    {
        void Calculate(TraderTimeTable model, IList<AssignmentInfo> assignments);
    }

    public class LinkAssignmentAnalyzerServiceImp : LinkAssignmentAnalyzerService
    {
        public void Calculate(TraderTimeTable model, IList<AssignmentInfo> assignments)
        {
            var linkAssignmentDict = assignments
                .OrderBy(x => x.EventDateTime)
                .GroupBy(x => x.GroupTrader)
                .ToDictionary(x => x.Key, x => x.ToList());

            foreach (var item in linkAssignmentDict.Keys)
            {
                var firstAssignment = linkAssignmentDict[item].First();
                var secondAssignment = linkAssignmentDict[item].Last();
                var trader = model.Traders
                    .Where(x => TraderVisualizationHelper.HasAssignment(firstAssignment, x))
                    .GetFirstOrDefault();
                if (trader != null)
                {
                    CalculateLinkAssignmentByMatch(firstAssignment, secondAssignment, trader);
                }
            }
        }

        private static void CalculateLinkAssignmentByMatch(AssignmentInfo firstAssignment, AssignmentInfo secondAssignment, TraderInfo trader)
        {
            var text = TimelineTextBuilder.GetTextForLinkMatch(firstAssignment, secondAssignment);
            var color = TimeLineColorBuilder.GetColorForLinkMatch(firstAssignment, secondAssignment);

            var startTimeMatch = new Assignment(firstAssignment.EventDateTime, color, text);
            var endTimeMatch = new Assignment(firstAssignment.EventDateTime.AddHours(1), color, string.Empty);

            trader.Assignments.Add(startTimeMatch);
            trader.Assignments.Add(endTimeMatch);
            var etPkValue = TraderVisualizationHelper.GetEtPkValue(firstAssignment.ExtraTime, secondAssignment.ExtraTime);
            if (!string.IsNullOrEmpty(etPkValue))
            {
                var extraTimeMatch = new Assignment(firstAssignment.EventDateTime.AddHours(2), BackgroundColor.ETPK, etPkValue);
                trader.Assignments.Add(extraTimeMatch);
            }
        }
    }
}
