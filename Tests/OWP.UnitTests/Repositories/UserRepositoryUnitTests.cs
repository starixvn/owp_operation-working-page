namespace OWP.Common.UnitTests.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Models;
    using NSubstitute;
    using OWP.Repositories;
    using Xunit;

    public class UserRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly UserRepository repository;

        public UserRepositoryUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();

            repository = new UserRepositoryImp(dynamicRepository);
        }

        [Fact]
        public async Task GetUserInfoById_WhenCalled_DynamicRepositorGetAsyncCriteria()
        {
            var criteria = new GetUserInfoByIdCriteria
            {
                UserId = 99
            };

            // Arrange
            var expected = new User
            {
                UserName = "sa",
                UserId = 99
            };

            dynamicRepository.GetAsync<User>(Arg.Compat.Any<GetUserInfoByIdCriteria>()).Returns(expected);

            // Act
            var actual = await repository.GetUserInfoById(criteria.UserId);

            Assert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).GetAsync<User>(Arg.Compat.Is<GetUserInfoByIdCriteria>(x => x.UserId == criteria.UserId));
        }

        [Fact]
        public async Task GetAllUsers_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            // Arrange
            var expected = new List<User>
            {
                new User{ UserId=1},
                new User{ UserId=2}
            };

            dynamicRepository.FetchAsync<User>(Arg.Compat.Any<GetAllUserCriteria>()).Returns(expected);

            // Act
            var actual = await repository.GetAllUsers();

            Assert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<User>(Arg.Compat.Any<GetAllUserCriteria>());
        }
    }
}