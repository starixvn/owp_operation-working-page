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
    using Xunit.Asserts.Compare;

    public class ResourceRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ResourceRepository repository;

        public ResourceRepositoryUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();

            repository = new ResourceRepositoryImp(dynamicRepository);
        }

        [Fact]
        public void GetAllLocations_WhenCalled_ReturnListUserLocation()
        {
            // Arrange
            var expected = new List<UserLocation>
            {
                new UserLocation { LocationName = "CTI", LocationCode = "CTI" },
                new UserLocation { LocationName = "SMS", LocationCode = "SMS" },
                new UserLocation { LocationName = "WAH HCMC", LocationCode = "WAH HCMC" },
                new UserLocation { LocationName = "WAH MAL", LocationCode = "WAH MAL" },
                new UserLocation { LocationName = "WAH MNL", LocationCode = "WAH MNL" },
                new UserLocation { LocationName = "None", LocationCode = "None" }
            };

            // Act
            var actual = repository.GetAllLocations();

            DeepAssert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetResourceByName_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            // Arrange
            const string resourceName = "SA";
            var criteria = new GetRefResourceByNameCriteria
            {
                RefName = resourceName
            };
            var expected = new List<ReferenceResource>
            {
              new ReferenceResource{ ResourceId=1, Value="SA"}
            };

            dynamicRepository.FetchAsync<ReferenceResource>(Arg.Compat.Any<GetAllUserCriteria>()).Returns(expected);

            // Act
            await repository.GetResourceByName(resourceName);

            //  DeepAssert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<ReferenceResource>(Arg.Compat.Is<GetRefResourceByNameCriteria>(x => x.RefName == criteria.RefName));
        }

        [Fact]
        public async Task GetResourceByNameWithNone_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            // Arrange
            const string resourceName = "SA";
            var criteria = new GetRefResourceByNameCriteria
            {
                RefName = resourceName
            };
            var expected = new List<ReferenceResource>
            {
              new ReferenceResource{ ResourceId=1, Value="SA"}
            };

            dynamicRepository.FetchAsync<ReferenceResource>(Arg.Compat.Any<GetAllUserCriteria>()).Returns(expected);

            // Act
            await repository.GetResourceByNameWithNone(resourceName);

            //  DeepAssert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<ReferenceResource>(Arg.Compat.Is<GetRefResourceByNameCriteria>(x => x.RefName == criteria.RefName));
        }
    }
}