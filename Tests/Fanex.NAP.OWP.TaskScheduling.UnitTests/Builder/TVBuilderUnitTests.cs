namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    using Fanex.NAP.OWP.TaskScheduling.Builder;
    using Olympus.InfoSiteClient.Models;
    using Xunit;

    public class TVBuilderUnitTests
    {
        [Fact]
        public void Build_General_ReturnTV()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                coverage_id = 1,
                website_id = 17,
                ext_info = new SoccerEventSchedule
                {
                    ip_tv = "14a",
                },
            };
            string expected = "TV";

            string actual = TVBuilder.Build(infositeMatch);

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_coverageDoesnotExist_ReturnEmpty()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                coverage_id = null,
                website_id = 17,
                ext_info = new SoccerEventSchedule
                {
                    ip_tv = "14a",
                },
            };
            string expected = "";

            string actual = TVBuilder.Build(infositeMatch);

            Assert.Equal(expected, actual);
        }

        [Fact]
        public void Build_Ext_InfoDoesnotExist_ReturnEmpty()
        {
            CommonMatchEx infositeMatch = new CommonMatchEx()
            {
                coverage_id = null,
                website_id = 17,
                ext_info = new SoccerEventSchedule
                {
                },
            };
            string expected = "";

            string actual = TVBuilder.Build(infositeMatch);

            Assert.Equal(expected, actual);
        }
    }
}