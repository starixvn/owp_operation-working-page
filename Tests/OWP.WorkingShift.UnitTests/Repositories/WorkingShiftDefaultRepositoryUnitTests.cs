namespace OWP.WorkingShift.UnitTests.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftDefaultRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftDefaultRepository repository;

        public WorkingShiftDefaultRepositoryUnitTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = config.CreateMapper();
            dynamicRepository = Substitute.For<IDynamicRepository>();
            currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 1;
            repository = new WorkingShiftDefaultRepositoryImp(mapper, dynamicRepository, currentSession);
        }

        [Fact]
        public async Task QueryByUser_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var criteria = new QueryWorkingShiftDefaultByUserCriteria
            {
                UserIds = "1,3,5,7"
            };

            // Arrange
            var expected = new List<WorkingShiftDefaultModel>
            {
                new WorkingShiftDefaultModel{ ShiftId=1},
                new WorkingShiftDefaultModel{ ShiftId=2}
            };

            dynamicRepository.FetchAsync <  WorkingShiftDefaultModel > (Arg.Compat.Any<QueryWorkingShiftDefaultByUserCriteria>()).Returns(expected);

            // Act
            var actual = await repository.QueryByUser(criteria.UserIds);

            Assert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<WorkingShiftDefaultModel>(Arg.Compat.Is<QueryWorkingShiftDefaultByUserCriteria>(x => x.UserIds == criteria.UserIds));
        }

        [Fact]
        public async Task UpdateDefaultShift_WhenCalled_DynamicRepositoryExecuteCriteria()
        {
            // Arrange
            var mockModel = new UpdateDefaultShiftModel
            {
                EmployeeId = 11,
                DefaultShiftIds = "1,2,3,4",
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(6),
                IsApplyCurrentWeek = true
            };

            // Act
            await repository.UpdateDefaultShift(mockModel);

            // Assert
            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<UpdateDefaultShiftCriteria>(x =>
#pragma warning disable S1067 // Expressions should not be too complex
                x.Actor == currentSession.UserId &&
                x.EmployeeId == mockModel.EmployeeId &&
                x.DefaultShiftIds == mockModel.DefaultShiftIds &&
                x.IsApplyCurrentWeek == mockModel.IsApplyCurrentWeek &&
                x.FromDate == mockModel.FromDate &&
                x.ToDate == mockModel.ToDate
#pragma warning restore S1067 // Expressions should not be too complex
            ));
        }
    }
}
