namespace OWP.DailyWorkingShift.UnitTests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using DailyWorkingShift.Controllers;
    using DailyWorkingShift.Repositories;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using Services;
    using Xunit;

    public class DailyWorkingShiftControllerUnitTests
    {
        [Fact]
        public async Task SearchWorkingShiftDaily_Always_ReturnsDataFromService()
        {
            // Arrange
            var queryResult = new QueryResult
            {
                Matches = new List<QueryMatchInfo>(),
                Users = new List<QueryUserGroup>()
            };
            var repository = Substitute.For<Repository>();
            var permissionService = Substitute.For<ModelService>();
            var currentSession = Substitute.For<ICurrentSession>();
            repository.Query(Arg.Compat.Any<QueryModel>()).Returns(Task.FromResult(queryResult));
            permissionService.BuildPermissionViewModel().Returns(new DailyWorkingShiftPermission());
            currentSession.Username.Returns("starix");
            var controller = new DailyWorkingShiftApiController(repository, permissionService, currentSession);

            // Act
            var queryModel = new QueryModel
            {
                Date = DateTime.Now,
                SectionId = "1,2",
                LocationCode = "CTI",
                ShiftId = "1,2,3",
                User = "starix",
                ExcludeClosedAccount = true
            };
            var actualResult = await controller.SearchWorkingShiftDaily(queryModel);

            // Assert
            Assert.Equal(queryResult, actualResult);
        }
    }
}