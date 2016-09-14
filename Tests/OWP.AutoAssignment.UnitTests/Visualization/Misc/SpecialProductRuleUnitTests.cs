namespace OWP.AutoAssignment.UnitTests.Visualization.Misc
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AutoAssignment.Visualization.Consts;
    using AutoAssignment.Visualization.Misc;
    using AutoAssignment.Visualization.Models;
    using Xunit;

    public class SpecialProductRuleUnitTests
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
                    OWPLeagueName = "leaguemar27 - CORNERS",
                    MinorBettypeId = -4,
                    OWPMatchId = 428000,
                    ParentMatchId = 428031,
                    EventDateTime = new DateTime(2020, 7, 25, 20, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "leaguemar28",
                    MinorBettypeId = -6,
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
                    MinorBettypeId = -4,
                    OWPMatchId = 425386,
                    ParentMatchId = 123456,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 15 mins play",
                    MinorBettypeId = -100,
                    OWPMatchId = 425387,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0)
                },
                new AssignmentModel
                {
                    UserId_LA = 15477090,
                    ProviderName = "IPSD",
                    OWPLeagueName = "SABA VIETNAM CHAMPIONSHIP U19 QUALIFIERS - CORNERS - 20 mins play",
                    MinorBettypeId = null,
                    OWPMatchId = 425388,
                    ParentMatchId = null,
                    EventDateTime = new DateTime(2020, 7, 26, 15, 0, 0)
                }
            };

        [Fact]
        public void Excute_NotCornerRule_ShouldReturnTotalBookingMatch()
        {
            // Arrange
            var firstRule = new NotCornerRule();
            var secondRule = new IsCornerRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 428029);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.TotalBookingMatch, actual);
        }

        [Fact]
        public void Excute_NotCornerRule_ShouldReturnOther()
        {
            // Arrange
            var firstRule = new NotCornerRule();
            var secondRule = new IsCornerRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 425388);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.Other, actual);
        }

        [Fact]
        public void Excute_IsCornerRule_ShouldReturnTwoInOneMatch()
        {
            // Arrange
            var firstRule = new NotCornerRule();
            var secondRule = new IsCornerRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 428035);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.TwoInOneMatch, actual);
        }

        [Fact]
        public void Excute_IsCornerRule_ShouldReturnCorner()
        {
            // Arrange
            var firstRule = new NotCornerRule();
            var secondRule = new IsCornerRule();
            firstRule.NextRule = secondRule;
            var assignment = assignments.FirstOrDefault(x => x.OWPMatchId == 428000);

            // Act
            var actual = firstRule.Execute(assignment, assignments);

            // Assert
            Assert.Equal(AssignmentType.Corner, actual);
        }
    }
}