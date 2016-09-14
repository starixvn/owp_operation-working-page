using Fanex.NAP.OWP.TaskScheduling.Builder;
using System;
using Olympus.InfoSiteClient.Models;
using Xunit;

namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    public class CommonBuilderUnitTests
    {
        [Fact]
        public static void BuildMatchId_WithCreateMatchId_Equal_Zero_ReturnNull()
        {
            var actual=CommonBuilder.BuildMatchId(new CommonMatchEx
            {
                ext_info = new SoccerEventSchedule
                {
                    create_match_id=0
                }
            });

            Assert.Null(actual);
        }

        [Fact]
        public static void BuildMatchId_WithCreateMatchId_Diff_Zero_ReturnValue()
        {
            var actual = CommonBuilder.BuildMatchId(new CommonMatchEx
            {
                ext_info = new SoccerEventSchedule
                {
                    create_match_id = 1
                }
            });

            var expected = 1;
            Assert.Equal(expected, actual);
        }

        /// <summary>
        /// Defaultdate=new DateTime(2000, 1, 1);
        /// </summary>
        [Fact]
        public static void BuildGameDate_WithGameDate_Is_Null_ReturnDefaultDate()
        {
            var actual = CommonBuilder.BuildGameDate(new CommonMatchEx
            {
                ext_info = new SoccerEventSchedule
                {
                    game_date= null
                }
            });

            var expected = new DateTime(2000, 1, 1);
            Assert.Equal(expected.Date, actual.Date);
        }

        [Fact]
        public static void BuildGameDate_WithGameDate_Not_Null_ReturnValueDateGmt8()
        {
            var actual = CommonBuilder.BuildGameDate(new CommonMatchEx
            {
                ext_info = new SoccerEventSchedule
                {
                    game_date = DateTime.Parse("2021-07-28")
                }
            }) ;

            var expected = DateTime.Parse("2021-07-28").AddHours(8);
            Assert.Equal(expected, actual);
        }
    }
}
