namespace OWP.AutoAssignment.UnitTests.Visualization.Misc
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AutoAssignment.Visualization.Consts;
    using AutoAssignment.Visualization.Misc;
    using AutoAssignment.Visualization.Models;
    using Xunit;

    public class MainMatchRuleUnitTests
    {
        private readonly IList<AssignmentModel> assignments = new List<AssignmentModel>
            {
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27",
                    MinorBettypeId = null,
                    OWPMatchId = 428031,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 25, 15, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = -4,
                    OWPMatchId = 428035,
                    ParentMatchId = 428031,
                    EventDateTime = new DateTime(2020, 7, 25, 15, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar28",
                    MinorBettypeId = null,
                    OWPMatchId = 428029,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 25, 15, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "VIETNAM CHAMPIONSHIP U19 QUALIFIERS FANTASY MATCH",
                    MinorBettypeId = null,
                    OWPMatchId = 425385,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 5 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425386,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0),
                    IsSaba = true,
                    SabaType = 1
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 6 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425389,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0),
                    IsSaba = true,
                    SabaType = 2
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 15 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425387,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0),
                    IsSaba = true,
                    SabaType = 3
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 20 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425388,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0),
                    IsSaba = true,
                    SabaType = 4
                }
            };

        [Fact]
        public void Execute_MainMatchRule_ShouldReturnOTHERS()
        {
            // Arrange
            var firstRule = new FTCornerRule();
            var secondRule = new IsFantasyRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 428029);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.Other, actual);
        }

        [Fact]
        public void Execute_FTCornerRule_ShouldReturnFT_CORNER()
        {
            // Arrange
            var firstRule = new FTCornerRule();
            var secondRule = new IsFantasyRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 428031);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.TwoInOneMatch, actual);
        }

        [Fact]
        public void Execute_IsFantasyRule_ShouldReturnFANTASY()
        {
            // Arrange
            var firstRule = new FTCornerRule();
            var secondRule = new IsFantasyRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 425385);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.FantasyMatch, actual);
        }

        [Theory]
        [InlineData(425386, AssignmentType.SABA15Mins)]
        [InlineData(425389, AssignmentType.SABA20Mins)]
        [InlineData(425387, AssignmentType.SABA16Mins)]
        [InlineData(425388, AssignmentType.SABA6Mins)]
        public void Execute_VirtualSoccerRule_ShouldReturnSABA(int matchId, string expected)
        {
            // Arrange
            var firstRule = new FTCornerRule();
            var secondRule = new IsFantasyRule();
            var thirdRule = new VirtualSoccerRule();
            firstRule.NextRule = secondRule;
            secondRule.NextRule = thirdRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == matchId);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(expected, actual);
        }
    }
}
