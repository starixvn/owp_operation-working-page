namespace OWP.AutoAssignment.UnitTests.TraderVisualization.Services
{
    using System;
    using System.Collections.Generic;
    using AutoAssignment.TraderVisualization.Models;
    using AutoAssignment.TraderVisualization.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class SingleAssignmentAnalyzerServiceUnitTests
    {
        [Fact]
        public void Calculate_Always_CalculateSuccessfully()
        {
            var service = new SingleAssignmentAnalyzerServiceImp();
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
                 MaxBet = 10000.00m,
                 IsSaba = false,
                 EventDateTime = new DateTime(2021,12,31,7,15,12),
                 ExtraTime = "ET",
                 GroupName = "hello",
                 BetType = 0,
                 UserId1HHdp = 10,
                 UserId1HOu = 10,
                 UserIdFtHdp = 10,
                 UserIdFtOu = 10,
                 UserIdLa = 10,
                 GroupTrader = "FT"
             },
             new AssignmentInfo
             {
                 MaxBet = 20000.00m,
                 IsSaba = false,
                 EventDateTime = new DateTime(2021,12,30,7,15,12),
                 ExtraTime = "ET",
                 GroupName = "hello",
                 BetType = 0,
                 UserId1HHdp = 10,
                 UserId1HOu = 10,
                 UserIdFtHdp = 11,
                 UserIdFtOu = 11,
                 UserIdLa = 10,
                 GroupTrader = "FT"
             },
             new AssignmentInfo
             {
                 MaxBet = 30000.00m,
                 IsSaba = true,
                 SabaType = 1,
                 EventDateTime = new DateTime(2021,12,29,7,15,12),
                 ExtraTime = "ET",
                 GroupName = "hello",
                 BetType = 0,
                 UserId1HHdp = 10,
                 UserId1HOu = 10,
                 UserIdFtHdp = 10,
                 UserIdFtOu = 10,
                 UserIdLa = 11,
                 GroupTrader = "FT"
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
                        ShiftStartTime = new DateTime(2021,12,27,4,15,12),
                        ShiftEndTime = new DateTime(2021,12,31,9,15,12)
                    },
                    new TraderInfo
                    {
                        UserId = 11,
                        ShiftStartTime = new DateTime(2021,12,27,4,15,12),
                        ShiftEndTime = new DateTime(2021,12,31,9,15,12)
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
                        ShiftStartTime = new DateTime(2021,12,27,4,15,12),
                        ShiftEndTime = new DateTime(2021,12,31,9,15,12),
                        Assignments = new List<Assignment>
                        {
                            new Assignment{Text = "07:15/10K**",Color = "#5E8533", Time = new DateTime(2021,12,31,7,15,12)},
                            new Assignment{Text = "",Color = "#5E8533", Time = new DateTime(2021,12,31,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,31,9,15,12)},
                            new Assignment{Text = "07:15/20K",Color ="#72667F", Time = new DateTime(2021,12,30,7,15,12)},
                            new Assignment{Text = "",Color = "#72667F", Time = new DateTime(2021,12,30,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,30,9,15,12)},
                            new Assignment{Text = "07:15/30K",Color ="#A3A382", Time = new DateTime(2021,12,29,7,15,12)},
                            new Assignment{Text = "",Color = "#A3A382", Time = new DateTime(2021,12,29,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,29,9,15,12)},
                        }
                    },
                    new TraderInfo
                    {
                        UserId = 11,
                        ShiftStartTime = new DateTime(2021,12,27,4,15,12),
                        ShiftEndTime = new DateTime(2021,12,31,9,15,12),
                        Assignments = new List<Assignment>
                        {
                            new Assignment{Text = "07:15/20K",Color = "#72667F", Time = new DateTime(2021,12,30,7,15,12)},
                            new Assignment{Text = "",Color = "#72667F", Time = new DateTime(2021,12,30,8,15,12)},
                            new Assignment{Text = "ET",Color = "#262626", Time = new DateTime(2021,12,30,9,15,12)},
                        }
                    },
                }
            };
    }
}
