namespace OWP.AutoAssignment.UnitTests.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using AutoAssignment.Visualization.Models;
    using Models;
    using NSubstitute;
    using OWP.AutoAssignment.Visualization.Services;
    using Xunit;
    using Xunit.Asserts.Compare;
    using Repository = AutoAssignment.Visualization.Repository;

    public class TraderAnalyzerServiceUnitTests
    {
        private readonly TraderAnalyzerServiceImp services;
        private readonly Repository repository;

        public TraderAnalyzerServiceUnitTests()
        {
            repository = Substitute.For<Repository>();
            services = new TraderAnalyzerServiceImp(repository);
        }

        [Fact]
        public void GetFilteredUsersByDate_Always_GetSuccessfully()
        {
            var request = new SchedulingRequest { EventDate = new DateTime(2020, 03, 11) };
            var userShifts = GetUserShift();
            var infoSiteAutoAssignmentResult = GetInfoSiteAutoAssignmentResult();
            repository.GetUsersByDate(Arg.Compat.Any<DateTime>(), Arg.Compat.Any<string>()).Returns((userShifts, infoSiteAutoAssignmentResult));
            repository.GetUserInfoFromNAPUserControl().Returns(new List<int> { 111, 222 });
            repository.GetCustInfoFromDB02().Returns(new List<int> { 111, 222 });

            var expected = new List<UserShift>
            {
                new UserShift
                {
                    UserId = 111,
                    Username = "sa",
                    Group = "group",
                    LevelLabel = "level",
                    Location = "SMS",
                    PcCode = "code1",
                    ShiftStartTime = new DateTime(2020,03,11, 13,30,0),
                    ShiftEndTime = new DateTime(2020,03,11, 15,30,0)
                },
                new UserShift
                {
                    UserId = 111,
                    Username = "sa",
                    Group = "group",
                    LevelLabel = "level",
                    Location = "SMS",
                    PcCode = "code1",
                    ShiftStartTime = new DateTime(2020,03,12, 10,00,0),
                    ShiftEndTime = new DateTime(2020,03,12, 15,00,0),
                },
                new UserShift
                {
                    UserId = 222,
                    Username = "starix13",
                    Group = "group",
                    LevelLabel = "level",
                    Location = "SMS",
                    PcCode = "code3",
                    ShiftStartTime = new DateTime(2020,03,12, 10,00,0),
                    ShiftEndTime = new DateTime(2020,03,12, 15,00,0)
                }
            };

            var actual = services.GetFilteredUsersByDate(request);

            DeepAssert.Equals(expected, actual);
        }

        [Fact]
        public void GetFilteredUsersRealAssignmentByDate_Always_GetSuccessfully()
        {
            repository.GetUsersByDate(Arg.Compat.Any<DateTime>(), Arg.Compat.Any<string>())
                .Returns((GetUserShift(), GetInfoSiteAutoAssignmentResult()));

            var autoAssignment = new List<UserShift>
            {
                new UserShift { UserId = 111 }
            };

            var expected = new List<UserShift>
            {
                new UserShift
                {
                    UserId = 111,
                    Username = "sa",
                    Group = "group",
                    LevelLabel = "level",
                    Location = "code1",
                    PcCode = "SMS",
                    ShiftStartTime = new DateTime(2020,03,11, 13,30,0),
                    ShiftEndTime = new DateTime(2020,03,11, 15,30,0)
                }
            };

            var actual = services.GetFilteredUsersRealAssignmentByDate(new DateTime(2020, 03, 11), autoAssignment);

            DeepAssert.Equals(expected, actual);
        }

        private List<InfoSiteAutoAssignment> GetInfoSiteAutoAssignmentResult()
            => new List<InfoSiteAutoAssignment>
            {
                new InfoSiteAutoAssignment
                {
                    EventDateTime = new DateTime(2020,03,11, 14,30,0),
                    PcCode = "code1",
                    UserId = 111
                },
                new InfoSiteAutoAssignment {
                    EventDateTime = new DateTime(2020,03,11, 15,00,0),
                    PcCode = "code1",
                    UserId = 111
                },
                new InfoSiteAutoAssignment {
                    EventDateTime = new DateTime(2020,03,12, 10,00,0),
                    PcCode = "code3",
                    UserId = 222
                }
            };

        private List<UserShift> GetUserShift()
        {
            return new List<UserShift>
            {
                new UserShift
                {
                    UserId = 111,
                    Username = "sa",
                    Group = "group",
                    LevelLabel = "level",
                    ShiftStartTime = new DateTime(2020,03,11, 13,30,0),
                    ShiftEndTime = new DateTime(2020,03,11, 15,30,0),
                    Location = "SMS"
                },
                new UserShift
                {
                    UserId = 111,
                    Username = "sa",
                    Group = "group",
                    LevelLabel = "level",
                    ShiftStartTime = new DateTime(2020,03,12, 10,00,0),
                    ShiftEndTime = new DateTime(2020,03,12, 15,00,0),
                    Location = "SMS"
                },
                new UserShift
                {
                    UserId = 222,
                    Username = "starix13",
                    Group = "group",
                    LevelLabel = "level",
                    ShiftStartTime = new DateTime(2020,03,12, 10,00,0),
                    ShiftEndTime = new DateTime(2020,03,12, 15,00,0),
                    Location = "SMS"
                },
                new UserShift
                {
                    UserId = 333,
                    Username = "starix133",
                    Group = "group",
                    LevelLabel = "level",
                    ShiftStartTime = new DateTime(2020,03,12, 10,00,0),
                    ShiftEndTime = new DateTime(2020,03,12, 15,00,0),
                    Location = "PHP"
                }
            };
        }
    }
}
