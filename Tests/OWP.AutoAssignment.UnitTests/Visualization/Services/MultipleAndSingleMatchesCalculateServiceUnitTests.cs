namespace OWP.AutoAssignment.UnitTests.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using AutoAssignment.Visualization.Consts;
    using AutoAssignment.Visualization.Models;
    using AutoAssignment.Visualization.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class MultipleAndSingleMatchesCalculateServiceUnitTests
    {
        private readonly List<AssignmentModel> assignments =
            new List<AssignmentModel>
            {
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27",
                    MinorBettypeId = null,
                    OWPMatchId = 427031,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 00, 0, 0),
                    MultipleMatchGroup = 1
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = null,
                    OWPMatchId = 427035,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 00, 05, 0),
                    MultipleMatchGroup = 1
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27",
                    MinorBettypeId = null,
                    OWPMatchId = 428031,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 1, 0, 0),
                    MultipleMatchGroup = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = null,
                    OWPMatchId = 428035,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 1, 0, 0),
                    MultipleMatchGroup = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = null,
                    OWPMatchId = 428000,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 1, 05, 0),
                    MultipleMatchGroup = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar28",
                    MinorBettypeId = null,
                    OWPMatchId = 428029,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "VIETNAM CHAMPIONSHIP U19 QUALIFIERS FANTASY MATCH",
                    MinorBettypeId = null,
                    OWPMatchId = 425385,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 5 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425386,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 15 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425387,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 20 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425388,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 1, 0),
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = null,
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 15 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 415387,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 15, 0, 0),
                    MultipleMatchGroup = 4
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 20 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 415388,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 20, 1, 0),
                    MultipleMatchGroup = 5
                }
            };

        [Fact]
        public void Calculate_WithNotEmptyData_ReturnGroupedMatches()
        {
            var calculateService = new MultipleAndSingleMatchesCalculateServiceImp();

            var expect = new List<AssignmentModel>
            {
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27",
                    MinorBettypeId = null,
                    OWPMatchId = 427031,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 00, 0, 0),
                    GroupName = AssignmentType.MainMatchRB2,
                    MultipleMatchGroup = 1
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = null,
                    OWPMatchId = 427035,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 00, 05, 0),
                    GroupName = AssignmentType.MainMatchRB2,
                    MultipleMatchGroup = 1
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27",
                    MinorBettypeId = null,
                    OWPMatchId = 428031,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 1, 0, 0),
                    GroupName = AssignmentType.MainMatchRB3,
                    MultipleMatchGroup = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = null,
                    OWPMatchId = 428035,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 1, 0, 0),
                    GroupName = AssignmentType.MainMatchRB3,
                    MultipleMatchGroup = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = null,
                    OWPMatchId = 428000,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 1, 05, 0),
                    GroupName = AssignmentType.MainMatchRB3,
                    MultipleMatchGroup = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar28",
                    MinorBettypeId = null,
                    OWPMatchId = 428029,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    GroupName = AssignmentType.MainMatchRB5,
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "VIETNAM CHAMPIONSHIP U19 QUALIFIERS FANTASY MATCH",
                    MinorBettypeId = null,
                    OWPMatchId = 425385,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    GroupName = AssignmentType.MainMatchRB5,
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 5 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425386,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    GroupName = AssignmentType.MainMatchRB5,
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 15 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425387,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 0, 0),
                    GroupName = AssignmentType.MainMatchRB5,
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 20 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425388,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 3, 1, 0),
                    GroupName = AssignmentType.MainMatchRB5,
                    MultipleMatchGroup = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = null,
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 15 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 415387,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 15, 0, 0),
                    MultipleMatchGroup = 4,
                    GroupName = AssignmentType.MainMatch
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 20 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 415388,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 24, 20, 1, 0),
                    MultipleMatchGroup = 5,
                    GroupName = AssignmentType.MainMatch
                }
            };

            var result = calculateService.Calculate(assignments);

            DeepAssert.Equal(expect, result);
        }

        [Fact]
        public void Calculate_WithEmptyData_ReturnEmptyMatchList()
        {
            var calculateService = new MultipleAndSingleMatchesCalculateServiceImp();

            var expect = new List<AssignmentModel>();

            var result = calculateService.Calculate(new List<AssignmentModel>());

            DeepAssert.Equal(expect, result);
        }
    }
}