namespace OWP.AutoAssignment.UnitTests.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using AutoAssignment.Visualization;
    using AutoAssignment.Visualization.Models;
    using AutoAssignment.Visualization.Services;
    using NSubstitute;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class VisualizationCalculateServiceUnitTests
    {
        private readonly VisualizationCalculateServiceImp services;
        private readonly Repository repository;
        private readonly RealAssignmentCalculateService realAssignmentCalculateService;
        private readonly TraderAnalyzerService traderAnalyzerService;

        public VisualizationCalculateServiceUnitTests()
        {
            repository = Substitute.For<Repository>();
            realAssignmentCalculateService = Substitute.For<RealAssignmentCalculateService>();
            traderAnalyzerService = Substitute.For<TraderAnalyzerService>();
            services = new VisualizationCalculateServiceImp(repository, realAssignmentCalculateService, traderAnalyzerService);
        }

        [Fact]
        public async void Calculate_Always_CalculateSuccessfully()
        {
            var request = new Models.SchedulingRequest
            {
                RequestId = "abc",
                EventDate = new DateTime(2021, 02, 24)
            };
            traderAnalyzerService.GetFilteredUsersByDate(request).Returns(GetTraders());
            traderAnalyzerService.GetFilteredUsersRealAssignmentByDate(request.EventDate, new List<UserShift>()).Returns(new List<UserShift>());
            repository.GetAssignments(new DateTime(2021, 02, 24), new List<int> { 123, 8 }).Returns(new List<AssignmentModel>());
            repository.GetAutoAssignmentResult(request.RequestId).Returns(GetAutoAssignments());

            var expect1 = new List<VisualizedAssignment>
            {
                //working shift
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 13,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 14,0,0) },

                // assignment
                new VisualizedAssignment { Text = "02:30", Color = "#ff6699", Time = new DateTime(2021,02,24, 14,30,0) },
                new VisualizedAssignment { Text = "", Color = "#ff6699", Time = new DateTime(2021,02,24, 15,30,0) },
            };

            var expect2 = new List<VisualizedAssignment>
            {
                //working shift
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 17,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 18,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 19,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 20,0,0) },

                // assignment
                new VisualizedAssignment { Text = "V", Color = "#92d050", Time = new DateTime(2021,02,24, 20,0,0) },
                new VisualizedAssignment { Text = "", Color = "#92d050", Time = new DateTime(2021,02,24, 21,0,0) },
                new VisualizedAssignment { Text = "PK", Color = "#262626", Time = new DateTime(2021,02,24, 22,0,0) },

                new VisualizedAssignment { Text = "01:15", Color = "#c00000", Time = new DateTime(2021,02,24, 13,15,0) },
                new VisualizedAssignment { Text = "", Color = "#c00000", Time = new DateTime(2021,02,24, 14,15,0) },
            };

            var result = await services.Calculate(request);

            //Assert.Equal(4, result.UserShifts[0].Assignments.Count);
            //Assert.Equal(9, result.UserShifts[1].Assignments.Count);
            //DeepAssert.Equal(expect1, result.UserShifts[0].Assignments);
            //DeepAssert.Equal(expect2, result.UserShifts[1].Assignments);
        }

        [Fact]
        public void CalculateWorkingShiftAutoAssignments_Always_CalculateSuccessfully()
        {
            var model = new ExcelVisualizationModel()
            {
                UserShifts = GetTraders()
            };

            var expectTrader1 = new List<VisualizedAssignment>
            {
                new VisualizedAssignment { Time = new DateTime(2021,02,24,13,0,0), Color = "#a6a6a6", Text = string.Empty },
                new VisualizedAssignment { Time = new DateTime(2021,02,24,14,0,0), Color = "#a6a6a6", Text = string.Empty },
                new VisualizedAssignment { Time = new DateTime(2021,02,24,15,0,0), Color = "#a6a6a6", Text = string.Empty }
            };

            var expectTrader2 = new List<VisualizedAssignment>
            {
                new VisualizedAssignment { Time = new DateTime(2021,02,24,17,0,0), Color = "#a6a6a6", Text = string.Empty },
                new VisualizedAssignment { Time = new DateTime(2021,02,24,18,0,0), Color = "#a6a6a6", Text = string.Empty },
                new VisualizedAssignment { Time = new DateTime(2021,02,24,19,0,0), Color = "#a6a6a6", Text = string.Empty },
                new VisualizedAssignment { Time = new DateTime(2021,02,24,20,0,0), Color = "#a6a6a6", Text = string.Empty }
            };

            VisualizationCalculateServiceImp.CalculateWorkingShiftAutoAssignments(model);

            DeepAssert.Equal(expectTrader1, model.UserShifts[0].Assignments);
            DeepAssert.Equal(expectTrader2, model.UserShifts[1].Assignments);
        }

        [Fact]
        public async void CalculateRealAssignment_Always_CalculateSuccessfully()
        {
            var dateTime = new DateTime(2021, 02, 24);
            var model = new ExcelVisualizationModel()
            {
                EventDate = dateTime,
                UserShifts = GetRealTrader()
            };

            traderAnalyzerService.GetFilteredUsersRealAssignmentByDate(dateTime, Arg.Compat.Any<List<UserShift>>())
                .Returns(GetRealTrader());
            repository.GetAssignments(dateTime, Arg.Compat.Any<List<int>>()).Returns(GetRealAssignment());
            realAssignmentCalculateService.CalculateVisualizedAssignment(Arg.Compat.Any<List<AssignmentModel>>());

            var expect = new List<VisualizedAssignment>
            {
                //working shift
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 13,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 14,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 15,0,0) },
                new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,02,24, 16,0,0) },

                // assignment
                new VisualizedAssignment { Text = "02:25", Color = "#fcd5b4", Time = new DateTime(2021,02,24, 14,25,0) },
                new VisualizedAssignment { Text = "", Color = "#fcd5b4", Time = new DateTime(2021,02,24, 15,25,0) },
            };

            await services.CalculateRealAssignment(model, dateTime, new List<UserShift>());

            Assert.Equal(6, model.UserShifts[0].Assignments.Count);
            DeepAssert.Equal(expect, model.UserShifts[0].Assignments);
        }

        private static List<AssignmentModel> GetRealAssignment()
        {
            return new List<AssignmentModel>
            {
                new AssignmentModel
                {
                    OWPMatchId = 1,
                    UserId_LA = 8,
                    GroupName = "RB6",
                    ExtraTime = "",
                    EventDateTime = new DateTime(2021,02,24, 14,25,0)
                }
            };
        }

        private static List<UserShift> GetRealTrader()
        {
            return new List<UserShift>
            {
                new UserShift
                {
                    UserId = 8,
                    ShiftStartTime =new DateTime(2021,02,24,13,0,0),
                    ShiftEndTime =new DateTime(2021,02,24,16,0,0)
                }
            };
        }

        private static List<AssignmentModel> GetAutoAssignments()
        => new List<AssignmentModel>
            {
                new AssignmentModel
                {
                    OWPMatchId = 1,
                    UserId_LA = 8,
                    GroupName = "FT",
                    ExtraTime = "PK",
                    EventDateTime = new DateTime(2021,02,24, 20,0,0)
                },
                new AssignmentModel
                {
                    OWPMatchId = 2,
                    UserId_LA = 8,
                    GroupName = "Corner",
                    ExtraTime = "",
                    EventDateTime = new DateTime(2021,02,24, 13,15,0)
                },
                new AssignmentModel
                {
                    OWPMatchId = 3,
                    UserId_LA = 123,
                    GroupName = "RB2",
                    ExtraTime = "",
                    EventDateTime = new DateTime(2021,02,24, 14,30,0)
                }
            };

        private static List<UserShift> GetTraders()
            => new List<UserShift>
            {
                new UserShift
                {
                    UserId = 123,
                    Username = "CLGCandy",
                    ShiftStartTime =new DateTime(2021,02,24,13,0,0),
                    ShiftEndTime =new DateTime(2021,02,24,15,0,0)
                },
                new UserShift
                {
                    UserId = 8,
                    Username = "sa",
                    ShiftStartTime =new DateTime(2021,02,24,17,0,0),
                    ShiftEndTime =new DateTime(2021,02,24,20,15,0)
                }
            };
    }
}
