namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Repositories
{
    using System.Collections.Generic;
    using Fanex.Data.Repository;
    using NSubstitute;
    using System.Threading.Tasks;
    using Xunit;
    using Criteria.EventPicking;
    using Models.EventPicking;
    using TaskScheduling.Repositories.Implement;

    public class LeagueSettingRepositoryUnitTest
    {
        private readonly LeagueSettingRepository leagueSettingRepository;
        private readonly IDynamicRepository dynamicRepository;

        public LeagueSettingRepositoryUnitTest()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();

            leagueSettingRepository = new LeagueSettingRepositoryImp(dynamicRepository);
        }

        [Fact]
        public async Task GetTVList_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var criteria = new GetTVListCriteria();

            // Arrange
            List<TVList> list = new List<TVList>();
            list.Add(new TVList { Label = "M1", Value = "M1" });
            IEnumerable<TVList> expected = list;

            dynamicRepository.FetchAsync<TVList>(Arg.Compat.Any<GetTVListCriteria>()).Returns(expected);

            // Act
            var actual = await leagueSettingRepository.GetTVList(criteria);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<TVList>(Arg.Compat.Any<GetTVListCriteria>());
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetLeagueSettings_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var criteria = new GetLeagueSettingCriteria();

            // Arrange
            List<LeagueSetting> list = new List<LeagueSetting>();
            list.Add(new LeagueSetting
            {
            });
            IEnumerable<LeagueSetting> expected = list;

            dynamicRepository.FetchAsync<LeagueSetting>(Arg.Compat.Any<GetLeagueSettingCriteria>()).Returns(expected);

            // Act
            var actual = await leagueSettingRepository.GetLeagueSettings(criteria);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<LeagueSetting>(Arg.Compat.Any<GetLeagueSettingCriteria>());
            Assert.Equal(expected, actual);
        }
    }
}