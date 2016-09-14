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
    using Xunit;

    public class WorkingShiftTimezoneApiControllerUnitTests : IDisposable
    {
        private readonly WorkingShiftTimezoneApiController controller;
        private readonly WorkingShiftTimezoneSettingRepository repository;

        public WorkingShiftTimezoneApiControllerUnitTests()
        {
            repository = Substitute.For<WorkingShiftTimezoneSettingRepository>();
            controller = new WorkingShiftTimezoneApiController(repository);
        }

        [Fact]
        public async Task UpdateTimeZoneSetting_WhenCalled_ReturnOk()
        {
            // Arrange
            var mockModel = new TimezoneUpdateModel
            {
                SettingId = 1
            };

            // Act
            var resultData = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };
            repository.Update(mockModel).Returns(resultData);

            var actionResult = await controller.UpdateTimeZoneSetting(mockModel);
            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };

            // Assert

            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);
            Assert.Equal(expected.Code, conNegResult.Content.Code);

            await repository.Received(1).Update(Arg.Compat.Is<TimezoneUpdateModel>(x => x == mockModel));
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

        ~WorkingShiftTimezoneApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}