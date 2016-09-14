namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    using Fanex.NAP.OWP.TaskScheduling.Builder;
    using Olympus.InfoSiteClient.Models;
    using System.Collections.Generic;
    using Xunit;

    public class OtherProviderBuilderUnitTest
    {
        [Fact]
        public void Build_General_ReturnOtherProvider()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                coverage_id = 1,
                website_id = 17,
                ext_info = new SoccerEventSchedule
                {
                    ip_tv = "14a",
                    provider = ",AB/,,CD/,"
                },
                ls_merge_match = new List<CommonSubMatch>
                    {
                        new CommonSubMatch(){website_id=19,coverage_id=1},
                        new CommonSubMatch(){website_id=19,coverage_id=0},
                    }
            };
            string expected = "TV/RB2TV/BGTV/BG/AB/CD";

            string actual = OtherProviderBuilder.Build(infositeMatch);

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_TVDoesNotExist_ReturnOtherProvider()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                coverage_id = 0,
                website_id = 17,
                ext_info = new SoccerEventSchedule
                {
                    ip_tv = "14a",
                    provider = ",AB/,,/,"
                },
            };
            string expected = "RB2/AB";

            string actual = OtherProviderBuilder.Build(infositeMatch);

            Assert.Equal(expected, actual);
        }
    }
}