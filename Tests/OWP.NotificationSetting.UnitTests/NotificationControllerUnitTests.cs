namespace OWP.NotificationSetting.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using Xunit;

    public class NotificationControllerUnitTests : IDisposable
    {
        private readonly ICurrentSession session;
        private readonly Repository repository;
        private readonly NotificationController controller;

        public NotificationControllerUnitTests()
        {
            session = Substitute.For<ICurrentSession>();
            repository = Substitute.For<Repository>();
            controller = new NotificationController(repository, session);
        }

        [Fact]
        public async Task GetByCurrentUser_Always_ReturnNotificationSettingViewModelWithDataFromRepository()
        {
            // Arrange
            const int userId = 8;
            var settings = MockListNotificationSetting();
            session.UserId.Returns(userId);
            repository.GetNotificationSettingByUserId(Arg.Compat.Is<int>(x => x == userId)).Returns(settings);

            // Act
            var actual = await controller.GetByCurrentUser();

            // Assert
            Assert.IsType<NotificationSettingViewModel>(actual);
            Assert.Equal(settings.Where(x => !x.IsWatcher), actual.Assignees);
            Assert.Equal(settings.Where(x => x.IsWatcher), actual.Watchers);
        }

        [Fact]
        public async Task Update_WhenRepositoryUpdateDataFromModel_ReturnNotificationSettingUpdateModel()
        {
            // Arrange
            const int userId = 8;
            var expected = new NotificationSettingUpdateModel
            {
                NotificationSettingId = 2,
                Value = "False"
            };

            session.UserId.Returns(userId);

            // Act
            var actual = await controller.Update(expected);

            // Assert
            Assert.IsType<NotificationSettingUpdateModel>(actual);
            Assert.Equal(expected, actual);
            Assert.Equal(userId, actual.UserId);
        }

        private IEnumerable<NotificationSettingMapping> MockListNotificationSetting()
        {
            return new List<NotificationSettingMapping> {
                new NotificationSettingMapping
                {
                    UserId = 9,
                    NotificationSettingId = 1,
                    Name = "Assignment",
                    Value = "True",
                    IsWatcher = false
                },
                new NotificationSettingMapping
                {
                    UserId = 9,
                    NotificationSettingId = 2,
                    Name = "abc",
                    Value = "False",
                    IsWatcher = true
                }
            };
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

        ~NotificationControllerUnitTests()
        {
            Dispose(false);
        }
    }
}