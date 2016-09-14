namespace OWP.AutoAssignment.UnitTests.TraderVisualization.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoAssignment.TraderVisualization;
    using AutoAssignment.TraderVisualization.Models;
    using AutoAssignment.TraderVisualization.Services;
    using Models;
    using NSubstitute;
    using Xunit;
    using Xunit.Asserts.Compare;
    using TraderInfo = AutoAssignment.TraderVisualization.Models.TraderInfo;

    public class TraderCalculateServiceUnitTests
    {
        private readonly Repository repository;
        private readonly SingleAssignmentAnalyzerService singleAssignmentAnalyzerService;
        private readonly LinkAssignmentAnalyzerService linkAssignmentAnalyzerService;
        public TraderCalculateServiceUnitTests()
        {
            repository = Substitute.For<Repository>();
            singleAssignmentAnalyzerService = Substitute.For<SingleAssignmentAnalyzerServiceImp>();
            linkAssignmentAnalyzerService = Substitute.For<LinkAssignmentAnalyzerServiceImp>();
        }

        [Fact]
        public async Task Calculate_Always_CalculateSuccessfully()
        {
            repository.GetAssignmentInfos(Arg.Compat.Any<string>()).Returns(MockAssignments());
            repository.GetTradersByDate(Arg.Compat.Any<DateTime>()).Returns(MockTraderInfo());
            repository.GetUserIdFromDb02().Returns(new List<int> { 10, 11, 12 });
            repository.GetUserIdFromNapUser().Returns(new List<int> { 10, 11, 12 });

            var service = new TraderCalculateServiceImp(repository, linkAssignmentAnalyzerService, singleAssignmentAnalyzerService);
            var expected = MockExpected();
            var request = new SchedulingRequest
            {
                EventDate = new DateTime(2021, 12, 31),
                RequestId = "hello"
            };

            var actual = await service.Calculate(request);

            DeepAssert.Equal(expected, actual);
        }
        public IList<AssignmentInfo> MockAssignments()
        => new List<AssignmentInfo>
        {
             new AssignmentInfo
             {
                 MaxBet = 10000.00m,
                 IsSaba = false,
                 EventDateTime = new DateTime(2021,12,31,7,15,12),
                 ExtraTime = "ET",
                 GroupName = "hello",
                 BetType = 0,
                 UserId1HHdp = 12,
                 UserId1HOu = 10,
                 UserIdFtHdp = 10,
                 UserIdFtOu = 12,
                 UserIdLa = 10,
                 GroupTrader = "FT"
             },
             new AssignmentInfo
             {
                 MaxBet = 10.00m,
                 IsSaba = false,
                 EventDateTime = new DateTime(2021,12,31,7,15,12),
                 ExtraTime = "ET",
                 UserId1HHdp = 10,
                 UserId1HOu = 10,
                 UserIdFtHdp = 10,
                 UserIdFtOu = 10,
                 UserIdLa = 10,
                 GroupTrader = "SABA_Link2G_123"
             },
             new AssignmentInfo
             {
                 MaxBet = 20.00m,
                 IsSaba = false,
                 EventDateTime = new DateTime(2021,12,31,7,30, 20),
                 ExtraTime = "ET/PK",
                 UserId1HHdp = 10,
                 UserId1HOu = 10,
                 UserIdFtHdp = 10,
                 UserIdFtOu = 10,
                 UserIdLa = 10,
                 GroupTrader = "SABA_Link2G_123"
             },
        };

        public IList<TraderInfo> MockTraderInfo()
            => new List<TraderInfo>
            {
                new TraderInfo
                {
                    UserId = 10,
                    ShiftStartTime = new DateTime(2021,12,31,4,12,12),
                    ShiftEndTime = new DateTime(2021,12,31,15,13,13)
                }
            };

        public TraderTimeTable MockExpected()
            => new TraderTimeTable
            {
                EventDate = new DateTime(2021, 12, 31),
                Traders = new List<TraderInfo>
                {
                    new TraderInfo
                    {
                        UserId = 10,
                        ShiftStartTime = new DateTime(2021,12,31,4,12,12),
                        ShiftEndTime = new DateTime(2021,12,31,15,13,13),
                        Assignments = new List<Assignment>
                        {
                            new Assignment{Text = "07:15+07:30/0.01K**+0.02K**",Color = "#A34262", Time = new DateTime(2021,12,31,7,15,12)},
                            new Assignment{Text = "",Color = "#A34262", Time = new DateTime(2021,12,31,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,31,9,15,12)},
                            new Assignment{Text = "07:15/10K",Color = "#72667F", Time = new DateTime(2021,12,31,7,15,12)},
                            new Assignment{Text = "",Color = "#72667F", Time = new DateTime(2021,12,31,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,31,9,15,12)}
                        }
                    }
                }
            };
    }
}
