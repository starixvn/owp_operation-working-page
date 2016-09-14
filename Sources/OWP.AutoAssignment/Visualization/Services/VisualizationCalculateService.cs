namespace OWP.AutoAssignment.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoAssignment.Models;
    using Consts;
    using Helper;
    using Models;
    using OWP.Utils;

    public interface VisualizationCalculateService
    {
        Task<ExcelVisualizationModel> Calculate(SchedulingRequest request);
    }

    public class VisualizationCalculateServiceImp : VisualizationCalculateService
    {
        private readonly Repository repository;

        private readonly RealAssignmentCalculateService realAssignmentCalculateService;

        private readonly TraderAnalyzerService traderAnalyzerService;

        public VisualizationCalculateServiceImp(Repository repository,
            RealAssignmentCalculateService realAssignmentCalculateService,
            TraderAnalyzerService traderAnalyzerService)
        {
            this.repository = repository;
            this.realAssignmentCalculateService = realAssignmentCalculateService;
            this.traderAnalyzerService = traderAnalyzerService;
        }

        public async Task<ExcelVisualizationModel> Calculate(SchedulingRequest request)
        {
            var filteredUsers = await traderAnalyzerService.GetFilteredUsersByDate(request);
            var model = new ExcelVisualizationModel
            {
                EventDate = request.EventDate,
                UserShifts = filteredUsers.OrderBy(x => x.ShiftStartTime).ThenBy(x => x.Level).ThenBy(x => x.Username).ToList()
            };

            await CalculateAutoAssignment(model, request.RequestId, filteredUsers);

            return model;
        }

        public async Task CalculateRealAssignment(ExcelVisualizationModel model, DateTime eventDate, IEnumerable<UserShift> autoAssignmentUsers)
        {
            var filteredUsers = await traderAnalyzerService.GetFilteredUsersRealAssignmentByDate(eventDate, autoAssignmentUsers);

            var assignments = await repository.GetAssignments(eventDate, filteredUsers.Select(x => x.UserId).ToList());
            var assignmentDict = assignments.GroupBy(x => x.UserId_LA).ToDictionary(x => x.Key, x => x.ToList());

            foreach (var user in model.UserShifts.Where(x => filteredUsers.Any(y => y.UserId == x.UserId)))
            {
                var userAssignments = assignmentDict.GetValue(user.UserId, new List<Models.AssignmentModel>());
                realAssignmentCalculateService.CalculateVisualizedAssignment(userAssignments);
            }

            CalculateWorkingShiftRealAssignments(model, filteredUsers);
            CalculateAssignments(model, assignments);
        }

        public static void CalculateWorkingShiftRealAssignments(ExcelVisualizationModel model, IEnumerable<UserShift> users)
        {
            foreach (var user in users)
            {
                var modelOfUserId = model.UserShifts.FirstOrDefault(a => a.UserId == user.UserId);
                var workingShiftAssignments = CreateWorkingShiftAssignments(user);

                modelOfUserId?.Assignments.AddRange(workingShiftAssignments);
            }
        }

        public async Task CalculateAutoAssignment(ExcelVisualizationModel model, string requestId, IEnumerable<UserShift> users)
        {
            var assignments = await repository.GetAutoAssignmentResult(requestId);

            CalculateWorkingShiftAutoAssignments(model);
            CalculateAssignments(model, assignments);
        }

        private static void CalculateAssignments(ExcelVisualizationModel model, IEnumerable<Models.AssignmentModel> assignments)
        {
            var assignmentsInDict = assignments
                    .Where(x => x.GroupName != AssignmentType.Other)
                    .GroupBy(x => x.UserId_LA)
                    .ToDictionary(a => a.Key, a => a.OrderByDescending(z => z.EventDateTime).ToList());

            foreach (var userId in assignmentsInDict.Keys)
            {
                var matchesGroupByUserId = assignmentsInDict[userId];
                var modelOfUserId = model.UserShifts.Where(a => a.UserId == userId);

                foreach (var userShift in modelOfUserId)
                {
                    CalculateAssignmentByMatch(matchesGroupByUserId, userShift);
                }
            }
        }

        public static void CalculateWorkingShiftAutoAssignments(ExcelVisualizationModel model)
        {
            foreach (var user in model.UserShifts)
            {
                var workingShiftAssignments = CreateWorkingShiftAssignments(user);

                user.Assignments.AddRange(workingShiftAssignments);
            }
        }

        public static IEnumerable<VisualizedAssignment> CreateWorkingShiftAssignments(UserShift shift)
        {
            var totalHours = shift.ShiftEndTime - shift.ShiftStartTime.AddMinutes(-shift.ShiftStartTime.Minute);
            var rangeTotalHour = Convert.ToInt32(totalHours.TotalHours);
            var timeStart = shift.ShiftStartTime;

            for (var i = 0; i <= rangeTotalHour; i++)
            {
                yield return CreateAssignment(string.Empty, BackgroundColor.WorkingShift, timeStart.AddHours(i));
            }
        }

        private static void CalculateAssignmentByMatch(List<Models.AssignmentModel> matches, UserShift modelOfUserId)
        {
            foreach (var match in matches)
            {
                if (match.EventDateTime >= modelOfUserId.ShiftStartTime && match.EventDateTime <= modelOfUserId.ShiftEndTime)
                {
                    var group = MatchHelper.GetGroupName(match);
                    var color = VisualizationHelper.GetColor(group);
                    var text = VisualizationHelper.GetValue(match, matches);

                    var startTimeMatch = CreateAssignment(text, color, match.EventDateTime);
                    var endTimeMatch = CreateAssignment(string.Empty, color, match.EventDateTime.AddHours(1));
                    modelOfUserId.Assignments.Add(startTimeMatch);
                    modelOfUserId.Assignments.Add(endTimeMatch);

                    if (VisualizationHelper.IsETPK(match.ExtraTime))
                    {
                        var ETPKValue = VisualizationHelper.GetETPKValue(match, matches);
                        var extraTimeMatch = CreateAssignment(ETPKValue, BackgroundColor.ETPKOrPKtime, match.EventDateTime.AddHours(2));
                        modelOfUserId.Assignments.Add(extraTimeMatch);
                    }
                }
            }
        }

        private static VisualizedAssignment CreateAssignment(string text, string color, DateTime eventDateTime)
            => new VisualizedAssignment
            {
                Time = eventDateTime,
                Text = text,
                Color = color
            };
    }
}