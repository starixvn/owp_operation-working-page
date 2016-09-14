namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria.EventPicking;
    using Models.EventPicking;
    using NSubstitute;
    using Olympus.InfoSiteClient.Models;
    using TaskScheduling.Misc;
    using TaskScheduling.Repositories.Implement;
    using TaskScheduling.Service.Implement;
    using Xunit;

    public class LeagueSettingServiceUnitTests
    {
        private readonly LeagueSettingRepository repository;
        private readonly IMapper mapper;
        private readonly LeagueSettingService service;

        public LeagueSettingServiceUnitTests()
        {
            repository = Substitute.For<LeagueSettingRepository>();
            mapper = Substitute.For<IMapper>();
            service = new LeagueSettingServiceImp(repository, mapper);
        }

        [Fact]
        public async Task ApplyMatchMaxbet_Always_ReturnData()
        {
            // Arrange
            var commonMatchEx = new CommonMatchEx
            {
                league_name = "*ENGLISH PREMIER LEAGUE",
                ext_info = new SoccerEventSchedule
                {
                    round = "35",
                    local_tv = "M833, K+PM, Euro7",
                    tv_live = "Italy Sport Football [203]",
                    game_date = new System.DateTime(2020, 7, 13, 7, 0, 0)
                }
            };
            var matches = new List<MatchExporting> {
                new MatchExporting(commonMatchEx)
            };
            IEnumerable<LeagueSetting> leagueSettings = new List<LeagueSetting>
            {
                new LeagueSetting
                {
                    HasTV = true,
                    FullConditionDescription = "{\"LeagueSettingId\":2,\"HasTV\":true,\"TV\":\"TV\",\"Rounds\":[{\"Type\":\"Equals\",\"Value\":\"35\"}],\"Divisions\":[]}",
                    LSTNote = "2-Jan new update maxbet by Pau kor",
                    Spread_HDP = 0.00888m,
                    Spread_OU = 0.1m,
                    MaxbetWD_HDP = 150123,
                    LeagueName = "*ENGLISH PREMIER LEAGUE",
                    LeagueSettingId = 2
                },
                new LeagueSetting
                {
                    HasTV = true,
                    LSTNote = "2-Jan new update maxbet by Pau kor",
                    Spread_HDP = 0.00888m,
                    Spread_OU = 0.1m,
                    MaxbetWD_HDP = 130000,
                    LeagueName = "*ENGLISH PREMIER LEAGUE",
                    LeagueSettingId = 3
                }
            };
            IEnumerable<TVList> tvList = new List<TVList>
            {
                new TVList
                {
                    Label = Constant.ContainsCondition,
                    Value = "M833"
                },
                new TVList
                {
                    Label = Constant.EqualsCondition,
                    Value = "M831"
                }
            };
            var syncedMatches = matches;
            syncedMatches[0].Maxbet_HDP = "150.123 K";
            syncedMatches[0].Spread_HDP = 0.00888m;
            syncedMatches[0].Spread_OU = 0.1m;
            syncedMatches[0].LSTNote = "2-Jan new update maxbet by Pau kor";

            repository.GetLeagueSettings(Arg.Compat.Any<GetLeagueSettingCriteria>()).Returns(Task.FromResult(leagueSettings));
            repository.GetTVList(Arg.Compat.Any<GetTVListCriteria>()).Returns(Task.FromResult(tvList));

            // Act
            var actual = await service.ApplyMatchMaxbet(matches);

            // Assert
            Assert.Equal(actual, syncedMatches);
        }
    }
}