namespace OWP.EventAssignment.UnitTests.EventAssignment
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Controllers;
    using Models;
    using NSubstitute;
    using Permission;
    using Repositories;
    using Services;
    using Xunit;

    public class EventAssignmentControllerUnitTests : IDisposable
    {
        private readonly Repository repository;
        private readonly EventAssignmentPermission eventAssignmentPermission;
        private readonly EventAssignmentController controller;
        private readonly GetAdminSiteMatchIdService getAdminSiteMatchIdService;

        public EventAssignmentControllerUnitTests()
        {
            repository = Substitute.For<Repository>();
            var notificationService = Substitute.For<NotificationService>();
            eventAssignmentPermission = Substitute.For<EventAssignmentPermission>();
            getAdminSiteMatchIdService = Substitute.For<GetAdminSiteMatchIdService>();
            controller = new EventAssignmentController(repository, notificationService, eventAssignmentPermission, getAdminSiteMatchIdService);
        }

        [Fact]
        public async Task Query_WhenCalledWithEventDate_ReturnListEventModel()
        {
            // Arrange
            var queryModel = new EventQueryModel
            {
                EventDate = DateTime.Today,
                Username = "sa",
                MatchStatusIds = new[] { 1, 2, 3 }
            };
            var expected = new List<EventModel> { new EventModel { OWPMatchId = 99, League = "abc" } };
            repository.Query(Arg.Compat.Is<EventQueryModel>(x => x == queryModel)).Returns(expected);
            eventAssignmentPermission.BuildPermission().Returns(new EventAssignmentPermissionModel());

            // Act
            var actual = await controller.Query(queryModel);

            // Assert
            Assert.Equal(expected, actual);
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

        ~EventAssignmentControllerUnitTests()
        {
            Dispose(false);
        }
    }
}