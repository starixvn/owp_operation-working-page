using System;
using System.Collections.Generic;
using Fanex.NAP.OWP.TaskScheduling.Builder;
using Olympus.InfoSiteClient.Models;
using Xunit;
using Xunit.Asserts.Compare;

namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    public class SpecialMatchBuilderUnitTests
    {
        
        [Fact]
        public void ReduceSpecialMatch_Always_ReturnChildMatch()
        {
            var expected = MockExpected(); 

            var actual = SpecialMatchBuilder.ReduceSpecialMatch(MockChildMatch());

            DeepAssert.Equal(expected, actual);
        }

        public IList<ChildMatch> MockChildMatch()
            => new List<ChildMatch>
            {
                new ChildMatch
                { 
                    home_name = "Hokkaido Consadole Sapporo 3rd Corner",
                    away_name = "Kyoto Sanga 3rd Corner",
                    league_name = "JAPAN LEAGUE CUP - CORNERS",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo 3rd Corner",
                    away_name = "Kyoto Sanga 3rd Corner",
                    league_name = "JAPAN LEAGUE CUP - CORNERS",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo 3rd booking",
                    away_name = "Kyoto Sanga 3rd booking",
                    league_name = "JAPAN LEAGUE CUP - BOOKING",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo 4rd booking",
                    away_name = "Kyoto Sanga 4rd booking",
                    league_name = "JAPAN LEAGUE CUP - BOOKING",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo",
                    away_name = "Kyoto Sanga ",
                    league_name = "JAPAN LEAGUE CUP",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo  00:00-15:00",
                    away_name = "Kyoto Sanga  00:00-15:00",
                    league_name = "JAPAN LEAGUE CUP - SPECIFIC 15 MINS",
                    match_id = 2,
                    game_date = new DateTime(2022,04,15),
                }
            };

        public IList<ChildMatch> MockExpected()
            => new List<ChildMatch>
            {
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo Next Corners",
                    away_name = "Kyoto Sanga Next Corners",
                    league_name = "JAPAN LEAGUE CUP - CORNERS",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                    create_match_id = 0,
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo Next Booking",
                    away_name = "Kyoto Sanga Next Booking",
                    league_name = "JAPAN LEAGUE CUP - BOOKING",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15),
                    create_match_id = 0,
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo",
                    away_name = "Kyoto Sanga ",
                    league_name = "JAPAN LEAGUE CUP",
                    match_id = 1,
                    game_date = new DateTime(2022,04,15)
                },
                new ChildMatch
                {
                    home_name = "Hokkaido Consadole Sapporo  (SPECIFIC 15 MINS)",
                    away_name = "Kyoto Sanga  (SPECIFIC 15 MINS)",
                    league_name = "JAPAN LEAGUE CUP - SPECIFIC 15 MINS",
                    match_id = 2,
                    game_date = new DateTime(2022,04,15),
                    create_match_id = 0,
                }
            };
    }
}
