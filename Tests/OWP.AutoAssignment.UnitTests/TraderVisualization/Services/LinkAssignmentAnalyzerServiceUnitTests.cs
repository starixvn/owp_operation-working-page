namespace OWP.AutoAssignment.UnitTests.TraderVisualization.Services
{
    using System;
    using System.Collections.Generic;
    using AutoAssignment.TraderVisualization.Models;
    using AutoAssignment.TraderVisualization.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class LinkAssignmentAnalyzerServiceUnitTests
    {
        [Fact]
        public void Calculate_Always_CalculateSuccessfully()
        {
            var service = new LinkAssignmentAnalyzerServiceImp();
            var linkAssignment = MockLinkAssignment();
            var traderModel = GetTraderTimeTable();
            var expected = MockExpected();

            service.Calculate(traderModel, linkAssignment);

            DeepAssert.Equal(expected, traderModel);
        }

        public IList<AssignmentInfo> MockLinkAssignment()
         => new List<AssignmentInfo>()
         {
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
                 GroupTrader = "Link_2G-123456"
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
                 GroupTrader = "Link_2G-123456"
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
                 GroupTrader = "Link_2G-123457"
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
                 GroupTrader = "Link_2G-123457"
             }
         };

        public TraderTimeTable GetTraderTimeTable()
            => new TraderTimeTable
            {
                Traders = new List<TraderInfo>
                {
                    new TraderInfo
                    {
                        UserId = 10,
                        ShiftStartTime = new DateTime(2021,12,31,4,30, 20),
                        ShiftEndTime = new DateTime(2021,12,31,17,30, 20)
                    }
                }
            };

        public TraderTimeTable MockExpected()
            => new TraderTimeTable
            {
                Traders = new List<TraderInfo>
                {
                    new TraderInfo
                    {
                        UserId = 10,
                        ShiftStartTime = new DateTime(2021,12,31,4,30, 20),
                        ShiftEndTime = new DateTime(2021,12,31,17,30, 20),
                        Assignments = new List<Assignment>
                        {
                            new Assignment{Text = "07:15+07:30/0.01K**+0.02K**",Color = "#A34262", Time = new DateTime(2021,12,31,7,15,12)},
                            new Assignment{Text = "",Color = "#A34262", Time = new DateTime(2021,12,31,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,31,9,15,12)},
                            new Assignment{Text = "07:15+07:30/0.01K**+0.02K**",Color = "#A34262", Time = new DateTime(2021,12,31,7,15,12)},
                            new Assignment{Text = "",Color = "#A34262", Time = new DateTime(2021,12,31,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,31,9,15,12)}
                        }
                    }
                }
            };

    }
}
