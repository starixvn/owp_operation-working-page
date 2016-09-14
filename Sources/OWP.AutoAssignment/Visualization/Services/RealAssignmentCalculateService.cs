namespace OWP.AutoAssignment.Visualization.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using Consts;
    using Enum;
    using Factory;
    using Models;
    using Utils;

    public interface RealAssignmentCalculateService
    {
        void CalculateVisualizedAssignment(List<AssignmentModel> userAssignments);
    }

    public class RealAssignmentCalculateServiceImp : RealAssignmentCalculateService
    {
        private readonly SpecialProductFactory specialProductFactory;

        private readonly MainMatchRuleFactory mainMatchRuleFactory;

        private readonly MultipleAndSingleMatchesCalculateService multipleAndSingleMatchesCalculateService;

        public RealAssignmentCalculateServiceImp(SpecialProductFactory specialProductFactory,
            MainMatchRuleFactory mainMatchRuleFactory,
            MultipleAndSingleMatchesCalculateService multipleAndSingleMatchesCalculateService)
        {
            this.specialProductFactory = specialProductFactory;
            this.mainMatchRuleFactory = mainMatchRuleFactory;
            this.multipleAndSingleMatchesCalculateService = multipleAndSingleMatchesCalculateService;
        }

        public void CalculateVisualizedAssignment(List<AssignmentModel> userAssignments)
        {
            CategorizeAssignments(userAssignments);
            CalculateETPK(userAssignments);
        }

        private void CategorizeAssignments(List<AssignmentModel> assignments)
        {
            MapGroupNameByMinorBetType(assignments);

            MapGroupNameByMultipleAssignments(assignments);
        }

        private void MapGroupNameByMinorBetType(List<AssignmentModel> assignments)
        {
            var notCornerRule = specialProductFactory.Create(RuleType.NOT_CORNER);
            var cornerRule = specialProductFactory.Create(RuleType.CORNER);
            notCornerRule.NextRule = cornerRule;

            var ftCornerRule = mainMatchRuleFactory.Create(RuleType.FT_CORNER);
            var fantasyRule = mainMatchRuleFactory.Create(RuleType.FANTASY);
            var virtualSoccerRule = mainMatchRuleFactory.Create(RuleType.SABA);
            ftCornerRule.NextRule = fantasyRule;
            fantasyRule.NextRule = virtualSoccerRule;

            foreach (var assignment in assignments)
            {
                assignment.GroupName = assignment.MinorBettypeId.HasValue
                    ? notCornerRule.Execute(assignment, assignments)
                    : ftCornerRule.Execute(assignment, assignments);
            }
        }

        private void MapGroupNameByMultipleAssignments(List<AssignmentModel> assignments)
        {
            var otherAssignments = assignments.Where(x => x.GroupName == AssignmentType.Other && !x.ParentMatchId.HasValue).ToList();
            var multipleGroupedAssignments = multipleAndSingleMatchesCalculateService.Calculate(otherAssignments);
            var groupNameMap = multipleGroupedAssignments
                .GroupBy(m => m.AssignmentId)
                .ToDictionary(m => m.Key, m => m.Select(x => x.GroupName).First());

            assignments.ForEach(a => a.GroupName = groupNameMap.GetValue(a.AssignmentId, a.GroupName));
        }

        private static void CalculateETPK(List<AssignmentModel> userAssignments)
        {
            foreach (var assignment in userAssignments)
            {
                assignment.ExtraTime = GetETPKText(assignment, userAssignments);
            }
        }

        private static string GetETPKText(AssignmentModel assignment, IList<AssignmentModel> userAssignments)
        {
            switch (assignment.GroupName)
            {
                case AssignmentType.Corner:
                case AssignmentType.TotalBookingMatch:
                case AssignmentType.TwoInOneMatch:
                    return GetSpecialETPKText(assignment);

                case AssignmentType.FantasyMatch:
                    return string.Empty;

                default:
                    return GetRBMatchesETPKText(assignment.GroupName, userAssignments);
            }
        }

        private static string GetSpecialETPKText(AssignmentModel assignment)
        {
            var etpkText = assignment.ParentMatchId.HasValue ? assignment.FullTimeETPK : assignment.ETPK;
            var ftETPKText = GetFTETPKText(etpkText);

            if (!string.IsNullOrEmpty(ftETPKText))
            {
                if (assignment.GroupName == AssignmentType.TotalBookingMatch || assignment.GroupName == AssignmentType.Corner)
                {
                    return ftETPKText != "PK" ? "ET" : string.Empty;
                }

                return ftETPKText;
            }

            return string.Empty;
        }

        private static string GetRBMatchesETPKText(string assignmentType, IList<AssignmentModel> userAssignments)
        {
            foreach (var assignment in userAssignments)
            {
                var etpkText = GetFTETPKText(assignment.ETPK);

                if (assignment.GroupName == assignmentType && !string.IsNullOrEmpty(etpkText))
                {
                    return etpkText;
                }
            }

            return string.Empty;
        }

        private static string GetFTETPKText(string etpkText)
        {
            var isET = etpkText.IsContainsIgnoreCase("ET");
            var isPK = etpkText.IsContainsIgnoreCase("PK");

            if (!isET && !isPK)
            {
                return string.Empty;
            }

            if (isET && isPK)
            {
                return "ET/PK";
            }

            return isET ? "ET" : "PK";
        }
    }
}