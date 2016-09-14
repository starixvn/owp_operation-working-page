namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    using Fanex.NAP.OWP.TaskScheduling.Builder;
    using Olympus.InfoSiteClient.Models;
    using System.Collections.Generic;
    using Xunit;

    public class CoverageBuilderUnitTests
    {
        [Theory]
        [InlineData(null, null, "")]
        [InlineData(0, 17, "RB2")]
        [InlineData(1, 0, "TV")]
        [InlineData(1, 17, "RB2TV")]
        [InlineData(1, 18, "RTSTV")]
        public void BuildCoverage_Always_ReturnCoverageFormat(int? coverageId, int? websiteId, string expected)
        {
            CoverageBuilder coveragebuilder = new CoverageBuilder();
            var actual = coveragebuilder.BuildCoverage(coverageId, websiteId);
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_NosiblingMatches_ReturnCoverageFormat()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                website_id = 19,
                coverage_id = 0,
            };
            CoverageBuilder coveragebuilder = new CoverageBuilder();
            string expected = "BG";

            string actual = coveragebuilder.Build(infositeMatch);

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_MultipleSiblingMatches_ReturnListCoverageFormat()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                website_id = 18,
                coverage_id = 0,
                ls_merge_match = new List<CommonSubMatch>
                    {
                        new CommonSubMatch(){website_id=19,coverage_id=1},
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                        new CommonSubMatch(){website_id=20,coverage_id=1},
                        new CommonSubMatch(){website_id=19,coverage_id=null},
                    }
            };
            CoverageBuilder coveragebuilder = new CoverageBuilder();
            string expected = "RTS/BGTV/BG/BETTV";
            string actual = coveragebuilder.Build(infositeMatch);
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_MultipleSiblingMatchesSameValue_ReturnListCoverageFormat()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                website_id = 17,
                coverage_id = 0,
                ls_merge_match = new List<CommonSubMatch>
                    {
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                        new CommonSubMatch(){website_id=19,coverage_id=null},
                    }
            };
            CoverageBuilder coveragebuilder = new CoverageBuilder();
            string expected = "RB2/BG";
            string actual = coveragebuilder.Build(infositeMatch);
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_MainMatchAndSiblingMatchesSameValue_ReturnListCoverageFormat()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                website_id = 19,
                coverage_id = 0,
                ls_merge_match = new List<CommonSubMatch>
                    {
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                    }
            };
            CoverageBuilder coveragebuilder = new CoverageBuilder();
            string expected = "BG";
            string actual = coveragebuilder.Build(infositeMatch);
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_DoesNotExistMainMatchWebsiteId_ReturnListCoverageFormat()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                website_id = 100,
                coverage_id = 0,
                ls_merge_match = new List<CommonSubMatch>
                    {
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                    }
            };
            CoverageBuilder coveragebuilder = new CoverageBuilder();
            string expected = "BG";
            string actual = coveragebuilder.Build(infositeMatch);
            Assert.Equal(expected, actual);
        }
    }
}