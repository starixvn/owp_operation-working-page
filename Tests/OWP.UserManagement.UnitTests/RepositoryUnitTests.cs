namespace OWP.UserManagement.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using Repositories;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class RepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;

        private readonly Repository repository;

        private readonly ResourceRepository resourceRepository;

        public RepositoryUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();
            resourceRepository = Substitute.For<ResourceRepository>();
            repository = new RepositoryImp(dynamicRepository, resourceRepository);
        }

        [Fact]
        public async Task GetUserPagingAsync_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var queryModel = new QueryModel
            {
                CategoryId = 1,
                PageIndex = 1,
                PageSize = 10,
                User = "",
                DepartmentId = 1,
                LocationCode = "SMS",
                RoleId = 1,
                SectionId = 1
            };

            var listUser = new List<User>
            {
                new User{UserId=1, UserName="sa" },
                new User{UserId=2, UserName="starix15" }
            };
            // Arrange
            var expected = new UserManagementViewModel
            {
                Users = listUser,
                CurrentPage = 1,
                TotalItem = 2,
                ItemsPerPage = 10
            };

            dynamicRepository.FetchAsync<User>(Arg.Compat.Any<GetUsersCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<GetUsersCriteria>();
                criteria.TotalRecords = 2;
                criteria.PageSize = 10;
                criteria.PageIndex = 1;

                return listUser;
            });
            resourceRepository.GetResourceByName(Arg.Compat.Any<string>()).Returns(x => new List<ReferenceResource>
            {
                new ReferenceResource{ Name="Language", Value="1", ResourceId=1}
            });
            // Act
            var actual = await repository.GetUserPagingAsync(queryModel);

            // Assert

            DeepAssert.Equal(expected, actual);

            await dynamicRepository.Received(1).FetchAsync<User>(Arg.Compat.Is<GetUsersCriteria>(p =>
             p.CategoryId == queryModel.CategoryId &&
             p.DepartmentId == queryModel.DepartmentId &&
             p.User == queryModel.User &&
             p.RoleId == queryModel.RoleId &&
             p.SectionId == queryModel.SectionId

         ));
        }
    }
}