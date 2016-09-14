namespace OWP.WorkingShift.UnitTests.Controllers
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Http.Results;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Controllers;
    using WorkingShift.Repositories;
    using WorkingShift.Services;
    using Xunit;

    public class WorkingShiftOrderApiControllerUnitTests : IDisposable
    {
        private readonly WorkingShiftOrderApiController controller;
        private readonly WorkingShiftOrderRepository repository;

        public WorkingShiftOrderApiControllerUnitTests()
        {
            repository = Substitute.For<WorkingShiftOrderRepository>();
            var modelService = Substitute.For<ModelService>();
            controller = new WorkingShiftOrderApiController(repository, modelService);
        }

        [Fact]
        public async Task UpdateEmployeeWorkingShiftOrder_WhenCalled_ReturnEmployeeWorkingShift()
        {
            // Arrange
            var mockModel = new UpdateEmployeeWorkingShiftOrderModel
            {
                UserIds = "1,3,5,7",
                SectionId = 1
            };

            var expected = new ResultDataObject
            {
                Code = 200
            };

            repository.UpdateEmployeeWorkingShiftOrder(Arg.Compat.Is<UpdateEmployeeWorkingShiftOrderModel>(x => x == mockModel)).Returns(expected);

            // Act
            var actionResult = await controller.UpdateEmployeeWorkingShiftOrder(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);
            Assert.Equal(expected.IsSuccess, conNegResult.Content.IsSuccess);

            await repository.Received(1).UpdateEmployeeWorkingShiftOrder(Arg.Compat.Is<UpdateEmployeeWorkingShiftOrderModel>(x => x == mockModel));
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

        ~WorkingShiftOrderApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}