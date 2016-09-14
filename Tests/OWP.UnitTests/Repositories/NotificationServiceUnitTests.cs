namespace OWP.Common.UnitTests.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Models;
    using NSubstitute;
    using OWP.Services;
    using Xunit;

    public class NotificationServiceUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly NotificationService repository;

        public NotificationServiceUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();

            repository = new NotificationServiceImp(dynamicRepository);
        }

        [Fact]
        public async Task Notify_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            // Arrange

            var mockDataSessionIds = new List<string> { "sid" };

            var mockDataMessage = new ValueTuple<IEnumerable<User>, IEnumerable<Message>>(
                new List<User> { new User { UserId = 8 } },
                new List<Message> { new Message { UserId = 8, MessageContent = "Msg", IsImportant = false, MessageType = 1 } }
             );

            dynamicRepository.FetchAsync<string>(Arg.Compat.Any<GetNotificationQueueCriteria>()).Returns(mockDataSessionIds);

            var criteria = new GetMessageBySessionCriteria
            {
                SessionId = "sid"
            };

            dynamicRepository.FetchMultipleAsync<User, Message>(Arg.Compat.Any<ICriteria>()).Returns(mockDataMessage);

            // Act
            await repository.Notify();

            await dynamicRepository.Received(1).FetchAsync<string>(Arg.Compat.Any<GetNotificationQueueCriteria>());

            await dynamicRepository.Received(1).FetchMultipleAsync<User, Message>(Arg.Compat.Any<GetMessageBySessionCriteria>());
        }

        [Fact]
        public async Task NotifyBySessionId_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            // Arrange

            var mockDataMessage = new ValueTuple<IEnumerable<User>, IEnumerable<Message>>(
                new List<User> { new User { UserId = 8 } },
                new List<Message> { new Message { UserId = 8, MessageContent = "Msg", IsImportant = false, MessageType = 1 } }
             );

            dynamicRepository.FetchMultipleAsync<User, Message>(Arg.Compat.Any<GetMessageBySessionCriteria>()).Returns(mockDataMessage);

            // Act
            await repository.Notify("sid");

            await dynamicRepository.Received(1).FetchMultipleAsync<User, Message>(Arg.Compat.Any<GetMessageBySessionCriteria>());
        }
    }
}