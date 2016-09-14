namespace OWP.WorkingShift.UnitTests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http.Results;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Controllers;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftColorApiControllerUnitTests : IDisposable
    {
        private readonly WorkingShiftColorApiController controller;
        private readonly WorkingShiftColorRepository repository;

        public WorkingShiftColorApiControllerUnitTests()
        {
            repository = Substitute.For<WorkingShiftColorRepository>();

            controller = new WorkingShiftColorApiController(repository);
        }

        [Fact]
        public async Task GetAll_WhenCalled_Return_IEnumerable_WorkingShiftColorModel()
        {
            // Arrange

            // Act
            var resultData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1},
                new WorkingShiftColorModel{ShiftId=2}
            };
            repository.GetAll().Returns(resultData);

            var actionResult = await controller.GetAll();

            // Assert

            Assert.IsType<OkNegotiatedContentResult<List<WorkingShiftColorModel>>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<List<WorkingShiftColorModel>>>(actionResult);
            Assert.Equal(resultData, conNegResult.Content);

            await repository.Received(1).GetAll();
        }

        [Fact]
        public async Task GetAllGMT8_WhenCalled_Return_IList_WorkingShiftColorModel()
        {
            // Arrange

            // Act
            var resultData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1},
                new WorkingShiftColorModel{ShiftId=2}
            };

            repository.GetAllGmt8().Returns(resultData);

            var actionResult = await controller.GetAllGmt8();

            // Assert

            Assert.IsType<OkNegotiatedContentResult<List<WorkingShiftColorModel>>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<List<WorkingShiftColorModel>>>(actionResult);
            Assert.Equal(resultData, conNegResult.Content);

            await repository.Received(1).GetAllGmt8();
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new QuickInsertWorkingShiftColorModel
            {
                Background = "1",
                Color = "1",
                ShiftCode = "1"
            };

            var expected = new ResultDataObject
            {
                Code = 200
            };

            repository.ValidateBeforeCreateAsync(Arg.Compat.Is<string>(x => x == mockModel.ShiftCode)).Returns(expected);

            // Act
            var actual = await controller.ValidateBeforeCreate(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);
            Assert.Equal(expected, conNegResult.Content);

            await repository.Received(1).ValidateBeforeCreateAsync(Arg.Compat.Is<string>(x => x == mockModel.ShiftCode));
        }

        [Fact]
        public async Task ValidateBeforeDelete_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new WorkingShiftColorModel
            {
                ShiftId = 1
            };

            var expected = new ResultDataObject
            {
                Code = 200
            };

            repository.ValidateBeforeDeleteAsync(Arg.Compat.Is<int>(x => x == mockModel.ShiftId)).Returns(expected);

            // Act
            var actual = await controller.ValidateBeforeDelete(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);
            Assert.Equal(expected, conNegResult.Content);

            await repository.Received(1).ValidateBeforeDeleteAsync(Arg.Compat.Is<int>(x => x == mockModel.ShiftId));
        }

        [Fact]
        public async Task Insert_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new QuickInsertWorkingShiftColorModel
            {
                Background = "1",
                Color = "1",
                ShiftCode = "1"
            };

            var expected = new ResultDataObject
            {
                Code = 200
            };

            repository.Insert(Arg.Compat.Is<QuickInsertWorkingShiftColorModel>(x => x == mockModel)).Returns(expected);

            // Act
            var actual = await controller.Insert(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);
            Assert.Equal(expected, conNegResult.Content);

            await repository.Received(1).Insert(Arg.Compat.Is<QuickInsertWorkingShiftColorModel>(x => x == mockModel));
        }

        [Fact]
        public async Task Update_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new WorkingShiftColorModel
            {
                Background = "1",
                Color = "1",
                ShiftCode = "1",
                ShiftId = 1
            };

            var expected = new ResultDataObject
            {
                Code = 200
            };

            repository.Update(Arg.Compat.Is<WorkingShiftColorModel>(x => x == mockModel)).Returns(expected);

            // Act
            var actual = await controller.Update(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);
            Assert.Equal(expected, conNegResult.Content);

            await repository.Received(1).Update(Arg.Compat.Is<WorkingShiftColorModel>(x => x == mockModel));
        }

        [Fact]
        public async Task Delete_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new WorkingShiftColorModel
            {
                ShiftId = 1
            };

            var expected = new ResultDataObject
            {
                Code = 200
            };

            repository.Delete(Arg.Compat.Is<int>(x => x == mockModel.ShiftId)).Returns(expected);

            // Act
            var actual = await controller.Delete(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actual);
            Assert.Equal(expected, conNegResult.Content);

            await repository.Received(1).Delete(Arg.Compat.Is<int>(x => x == mockModel.ShiftId));
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

        ~WorkingShiftColorApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}