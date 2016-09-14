namespace OWP.WeeklyWorkingShift.UnitTests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http.Results;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using Services;
    using WeeklyWorkingShift.Controllers;
    using WeeklyWorkingShift.Repositories;
    using WorkingShift.Models;
    using WorkingShift.Services;
    using Xunit;

    public class WeeklyWorkingShiftApiControllerUnitTests : IDisposable
    {
        private readonly WeeklyWorkingShiftApiController controller;
        private readonly Repository repository;
        private readonly ModelService modelService;

        public WeeklyWorkingShiftApiControllerUnitTests()
        {
            repository = Substitute.For<Repository>();
            modelService = Substitute.For<ModelService>();
            var importService = Substitute.For<ImportService>();
            var exportService = Substitute.For<ExportService>();
            var viewLogService = Substitute.For<ViewLogService>();
            var currentSession = Substitute.For<ICurrentSession>();
            controller = new WeeklyWorkingShiftApiController(repository, modelService, exportService, importService, viewLogService, currentSession);
        }

        [Fact]
        public async Task Search_WhenCalled_ReturnEmployeeWorkingShiftList()
        {
            // Arrange
            var fromDate = new DateTime(2019, 06, 10);
            var toDate = new DateTime(2019, 06, 16);
            var mockModel = new QueryModel
            {
                FromDate = fromDate,
                ToDate = toDate,
                User = "",
                Section = "1",
                Category = "",
                Location = "",
                ExcludeClosedAccount = true,
                OrderUserId = 1,
                IsFrame = false,
                TimeZoneOffset = 0
            };

            var expected = new QueryResult
            {
                ListSectionPublish = new List<SectionPublishWorkingShiftModel>(),
                WorkingShiftColors = new List<WorkingShiftColorModel>(),
                WorkingShiftUsers = new List<WorkingShiftUserModel>()
            };

            repository.SearchWorkingShiftWeekly(Arg.Compat.Any<QueryModel>()).Returns(expected);
            modelService.BuildPermissionViewModel().Returns(new WorkingShiftPermission());

            // Act
            var actual = await controller.SearchWorkingShiftWeekly(mockModel);

            // Assert
            Assert.IsType<OkNegotiatedContentResult<QueryResult>>(actual);

            var conNegResult = Assert.IsType<OkNegotiatedContentResult<QueryResult>>(actual);
            Assert.Equal(expected, conNegResult.Content);
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

        ~WeeklyWorkingShiftApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}