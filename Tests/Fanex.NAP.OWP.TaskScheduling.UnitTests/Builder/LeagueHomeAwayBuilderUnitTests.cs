using Fanex.NAP.OWP.TaskScheduling.Builder;
using Olympus.InfoSiteClient.Models;
using Xunit;

namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    public class LeagueHomeAwayBuilderUnitTests
    {
        [Fact]
        public void GetHomeName_IsNeutralIsTrue_ReturnHomeNameCorrect()
        {
            var infositeMatch = new CommonMatchEx
            {
                away_name = "VN",
                home_name = "TL"
            };
            var extInfo = new SoccerEventSchedule
            {
                is_neutral = true
            };
            var homeName = LeagueHomeAwayBuilder.BuildHomeName(infositeMatch, extInfo);
            Assert.Equal("TL (N)", homeName);
        }

        [Fact]
        public void GetHomeName_IsNeutralIsTrue_is_team_reverse_isTrue_ReturnHomeNameCorrect()
        {
            var infositeMatch = new CommonMatchEx
            {
                away_name = "VN",
                home_name = "TL",
            };
            var extInfo = new SoccerEventSchedule
            {
                is_neutral = true,
                is_team_reverse= true,
            };
            var homeName = LeagueHomeAwayBuilder.BuildHomeName(infositeMatch, extInfo);
            Assert.Equal("VN (N)", homeName);
        }

        [Fact]
        public void GetAwayName_is_team_reverse_isTrue_ReturnAwayNameCorrect()
        {
            var infositeMatch = new CommonMatchEx
            {
                away_name = "VN",
                home_name = "TL",
            };
            var extInfo = new SoccerEventSchedule
            {
                is_neutral = true,
                is_team_reverse = true,
            };
            var awayName = LeagueHomeAwayBuilder.BuildAwayName(infositeMatch, extInfo);
            Assert.Equal("TL", awayName);
        }

        [Fact]
        public void GetAwayName_is_team_reverse_isFalse_ReturnAwayNameCorrect()
        {
            var infositeMatch = new CommonMatchEx
            {
                away_name = "VN",
                home_name = "TL",
            };
            var extInfo = new SoccerEventSchedule
            {
                is_neutral = true,
            };
            var awayName = LeagueHomeAwayBuilder.BuildAwayName(infositeMatch, extInfo);
            Assert.Equal("VN", awayName);
        }
    }
}
