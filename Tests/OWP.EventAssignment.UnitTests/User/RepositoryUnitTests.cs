namespace OWP.EventAssignment.UnitTests.User
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Data.Repository;
    using NSubstitute;
    using OWP.EventAssignment.User;
    using Xunit;

    public class RepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly Repository repository;

        public RepositoryUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();
            repository = new RepositoryImp(dynamicRepository);
        }

        [Fact]
        public async Task Query_Always_ReturnsData()
        {
            // Arrange
            var eventDate = new DateTime(2018, 10, 10);
            var userInfos = new List<UserInfo>();

            dynamicRepository.FetchAsync<UserInfo>(Arg.Compat.Any<GetUserCriteria>()).Returns(userInfos);

            // Act
            var result = await repository.Query(eventDate);

            // Assert
            Assert.Equal(userInfos, result);
        }
    }
}