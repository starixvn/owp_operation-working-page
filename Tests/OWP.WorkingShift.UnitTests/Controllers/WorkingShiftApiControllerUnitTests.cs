namespace OWP.WorkingShift.UnitTests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http.Results;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Controllers;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftApiControllerUnitTests : IDisposable
    {
        private readonly WorkingShiftApiController controller;
        private readonly WorkingShiftRepository repository;

        public WorkingShiftApiControllerUnitTests()
        {
            var currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 8;
            repository = Substitute.For<WorkingShiftRepository>();
            controller = new WorkingShiftApiController(repository);
        }

        [Fact]
        public async Task GetUserWorkingShift_WhenCalled_ReturnEmployeeWorkingShiftList()
        {
            // Arrange
            var mockModel = new WorkingShiftQueryByUserModel
            {
                UserIds = "12",
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(2)
            };
            var expected = new List<WorkingShiftModel> {
                   new WorkingShiftModel
                   {
                       UserId = 11,
                       ShiftId= 22,
                       ShiftDate = DateTime.Today
                   }
            };

            repository.QueryByUser(Arg.Compat.Is<WorkingShiftQueryByUserModel>(x => x == mockModel)).Returns(expected);

            // Act
            var actual = await controller.GetUserWorkingShift(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<IList<WorkingShiftModel>>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<IList<WorkingShiftModel>>>(actual);
            Assert.Equal(expected, conNegResult.Content);
        }

        [Fact]
        public async Task GetSingleUserWorkingShift_WhenCalled_ReturnEmployeeWorkingShiftList()
        {
            // Arrange
            var mockModel = new WorkingShiftQueryBySingleUserModel
            {
                UserId = 11,
                FromDate = new DateTime(2019, 6, 12),
                ToDate = new DateTime(2019, 6, 12)
            };

            var expected = new List<WorkingShiftModel> {
                   new WorkingShiftModel
                   {
                       UserId = 11,
                       ShiftId= 22,
                       ShiftDate = new DateTime(2019, 6, 12)
                   }
            };

            repository.QueryByUser(Arg.Compat.Any<WorkingShiftQueryByUserModel>()).Returns(expected);

            // Act
            var actual = await controller.GetSingleUserWorkingShift(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<WorkingShiftModel[]>>(actual);
            var conNegResult = Assert.IsType<OkNegotiatedContentResult<WorkingShiftModel[]>>(actual);
            Assert.Equal(expected, conNegResult.Content);
        }

        [Fact]
        public async Task CopySingleShift_WhenCalled_ReturnEmployeeWorkingShift()
        {
            // Arrange
            var mockModel = new CopySingleShiftModel
            {
                UserId = 11,
                ShiftDate = DateTime.Today
            };

            // Act
            var resultData = new ResultDataObject
            {
                Code = 0
            };
            repository.CopySingleShift(mockModel).Returns(resultData);

            // Act
            var actionResult = await controller.CopySingleShift(mockModel);

            // Assert

            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);
            Assert.Equal(resultData, conNegResult.Content);

            // Assert
            await repository.Received(1).CopySingleShift(Arg.Compat.Is<CopySingleShiftModel>(x => x == mockModel));
        }

        [Fact]
        public async Task DeleteWholeShifts_WhenCalled_RepositoryExecuteDeleteWholeShifts()
        {
            // Arrange
            var mockModel = new DeleteWholeShiftsModel
            {
                UserId = 33,
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(6)
            };

            // Act
            await controller.DeleteWholeShifts(mockModel);

            // Assert
            await repository.Received(1).DeleteWholeShifts(Arg.Compat.Is<DeleteWholeShiftsModel>(x => x == mockModel));
        }

        [Fact]
        public async Task RemoveSingleShift_WhenCalled_RepositoryExecuteRemoveSingleShift()
        {
            // Arrange
            var mockModel = new RemoveSingleShiftModel
            {
                EmployeeId = 33,
                ShiftDate = DateTime.Today
            };

            var resultData = new ResultDataObject
            {
                Code = 0
            };
            repository.RemoveSingleShift(mockModel).Returns(resultData);

            repository.RemoveSingleShift(mockModel).Returns(resultData);

            // Act
            var actionResult = await controller.RemoveSingleShift(mockModel);

            // Assert

            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);
            Assert.Equal(resultData, conNegResult.Content);

            await repository.Received(1).RemoveSingleShift(Arg.Compat.Is<RemoveSingleShiftModel>(x => x == mockModel));
        }

        [Fact]
        public async Task CopyWholeShifts_WhenCalled_RepositoryExecuteCopyWholeShifts()
        {
            // Arrange
            var mockModel = new CopyWholeShiftsModel
            {
                FromUserId = 11,
                ToUserId = 22,
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(6)
            };

            // Act
            await controller.CopyWholeShifts(mockModel);

            // Assert
            await repository.Received(1).CopyWholeShifts(Arg.Compat.Is<CopyWholeShiftsModel>(x => x == mockModel));
        }

        [Fact]
        public async Task CopyWorkingShiftWeeklyPrevious_WhenCalled_ReturnListEmployees()
        {
            // Arrange
            var mockModel = new CopyWorkingShiftWeeklyPreviousModel
            {
                UserId = 99,
                StartDateOfWeek = DateTime.Today
            };

            // Act
            await controller.CopyWorkingShiftWeeklyPrevious(mockModel);

            // Assert
            await repository.Received(1).CopyWorkingShiftWeeklyPrevious(Arg.Compat.Is<CopyWorkingShiftWeeklyPreviousModel>(x => x == mockModel));
        }

        [Fact]
        public async Task UpdateSingleShift_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new UpdateWorkingShiftCodeModel
            {
                EmployeeId = 33,
                ShiftDate = DateTime.Today,
                IsOvertime = true,
                RefShiftId = 1,
                ShiftId = 2
            };
            var queryModel = new WorkingShiftQueryByUserModel
            {
                UserIds = mockModel.EmployeeId.ToString(),
                FromDate = mockModel.ShiftDate,
                ToDate = mockModel.ShiftDate
            };
            var mockData = new List<WorkingShiftModel>
            {
                new WorkingShiftModel{ShiftId = 1},
                new WorkingShiftModel{ShiftId = 2}
            };
            var resultData = new ResultDataObject
            {
                Code = 0
            };
            repository.UpdateWorkingShiftCode(mockModel).Returns(resultData);
            repository.QueryByUser(queryModel).Returns(mockData);
            // Act
            var actionResult = await controller.UpdateSingleShift(mockModel);

            // Assert

            Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<ResultDataObject>>(actionResult);
            Assert.Equal(resultData.IsSuccess, conNegResult.Content.IsSuccess);

            await repository.Received(1).UpdateWorkingShiftCode(Arg.Compat.Is<UpdateWorkingShiftCodeModel>(x => x == mockModel));
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

        ~WorkingShiftApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}