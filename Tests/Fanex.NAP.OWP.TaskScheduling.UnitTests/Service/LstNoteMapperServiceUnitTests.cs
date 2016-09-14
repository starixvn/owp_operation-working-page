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
    using Models.EventAssignment;

    public class LstNoteMapperServiceUnitTests
    {
        private readonly LeagueSettingRepository repository;
        private readonly IMapper mapper;
        private readonly LstNoteMapperService service;

        public LstNoteMapperServiceUnitTests()
        {
            repository = Substitute.For<LeagueSettingRepository>();
            mapper = Substitute.For<IMapper>();
            service = new LstNoteMapperServiceImp(repository, mapper);
        }

        [Fact]
        public async Task ApplyMatchMaxbet_Always_ReturnData()
        {
            // Arrange
            var matches = new List<EventModel> {
                new EventModel() {LeagueName="*ENGLISH PREMIER LEAGUE",
                    TVCode ="M833, K+PM, Euro7", Channel="Italy Sport Football [203]",
                    EventDateTime = new System.DateTime(2020, 7, 13, 7, 0, 0)
                }
            };
            IEnumerable<LeagueSetting> leagueSettings = new List<LeagueSetting>
            {
                new LeagueSetting
                {
                    HasTV = true,
                    FullConditionDescription = "{\"LeagueSettingId\":2,\"HasTV\":true,\"TV\":\"TV\",\"Rounds\":[{\"Type\":\"Equals\",\"Value\":\"35\"}],\"Divisions\":[]}",
                    LSTNote = "2-Jan new update maxbet by Pau kor",
                    LeagueName = "*ENGLISH PREMIER LEAGUE",
                    LeagueSettingId = 2
                },
                new LeagueSetting
                {
                    HasTV = true,
                    LSTNote = "2-Jan new update maxbet by Pau kor",
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
            syncedMatches[0].LSTNote = "150.123 K"; 

            repository.GetLeagueSettings(Arg.Compat.Any<GetLeagueSettingCriteria>()).Returns(Task.FromResult(leagueSettings));
            repository.GetTVList(Arg.Compat.Any<GetTVListCriteria>()).Returns(Task.FromResult(tvList));

            // Act
            var actual = await service.ApplyLstTNote(matches);

            // Assert
            Assert.Equal(actual, syncedMatches);
        }
    }
}