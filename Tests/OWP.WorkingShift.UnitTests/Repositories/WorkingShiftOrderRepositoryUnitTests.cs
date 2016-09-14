namespace OWP.WorkingShift.UnitTests.Repositories
{
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftOrderRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftOrderRepository repository;

        public WorkingShiftOrderRepositoryUnitTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = config.CreateMapper();
            dynamicRepository = Substitute.For<IDynamicRepository>();
            currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;
            repository = new WorkingShiftOrderRepositoryImp(mapper, dynamicRepository, currentSession);
        }

        [Fact]
        public async Task UpdateEmployeeWorkingShiftOrder_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new UpdateEmployeeWorkingShiftOrderModel
            {
                UserIds = "1,3,5,7",
                SectionId = 1
            };

            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };

            // Act
            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<UpdateEmployeeWorkingShiftOrderCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<UpdateEmployeeWorkingShiftOrderCriteria>();
                criteria.UserIds = mockModel.UserIds;
                criteria.ActorId = currentSession.UserId;
                criteria.SectionId = mockModel.SectionId;
                return Task.FromResult(commandResult);
            });

            var actual = await repository.UpdateEmployeeWorkingShiftOrder(mockModel);

            // Assert
            Assert.Equal(expected.IsSuccess, actual.IsSuccess);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<UpdateEmployeeWorkingShiftOrderCriteria>(x => x.UserIds == mockModel.UserIds &&
            x.SectionId == mockModel.SectionId &&
            x.ActorId == currentSession.UserId));
        }
    }
}