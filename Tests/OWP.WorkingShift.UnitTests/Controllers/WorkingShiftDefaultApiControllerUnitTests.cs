namespace OWP.WorkingShift.UnitTests.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Models;
    using NSubstitute;
    using WorkingShift.Controllers;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftDefaultApiControllerUnitTests : IDisposable
    {
        private readonly WorkingShiftDefaultApiController controller;
        private readonly WorkingShiftDefaultRepository repository;

        public WorkingShiftDefaultApiControllerUnitTests()
        {
            repository = Substitute.For<WorkingShiftDefaultRepository>();
            controller = new WorkingShiftDefaultApiController(repository);
        }

        [Fact]
        public async Task UpdateDefaultShift_WhenCalled_RepositoryExecuteUpdateDefaultShift()
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
            await controller.UpdateDefaultShift(mockModel);

            // Assert
            await repository.Received(1).UpdateDefaultShift(Arg.Compat.Is<UpdateDefaultShiftModel>(x => x == mockModel));
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            controller.Dispose();
        }

        ~WorkingShiftDefaultApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}
