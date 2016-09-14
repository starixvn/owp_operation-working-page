namespace OWP.MessageManagement.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Threading.Tasks;
    using Models;
    using NSubstitute;
    using Xunit;

    public class MessageManagementApiControllerUnitTests : IDisposable
    {
        private readonly Repository repository;
        private readonly MessageManagementApiController messageManagementController;

        public MessageManagementApiControllerUnitTests()
        {
            repository = Substitute.For<Repository>();
            messageManagementController = new MessageManagementApiController(repository);
        }

        [Fact]
        public async Task GetByUserIdWithPaging_WhenCall_ReturnMessageBoxViewModelFromRepository()
        {
            // Arrange
            var messageModels = new List<MessageModel> {
                new MessageModel{
                    MessageId = 1,
                    IsViewed = true,
                    MessageContent = "Change user name",
                    CreatedDate = DateTime.Now,
                    IsImportant = true,
                    MessageType = 1,
                    SystemMessageType = 1
                },
                new MessageModel
                {
                    MessageId = 2,
                    IsViewed = true,
                    MessageContent = "Change nick name",
                    CreatedDate = DateTime.Now,
                    IsImportant = true,
                    MessageType = 2,
                    SystemMessageType = 2
                }
            };
            var messageBoxViewModel = new MessageBoxViewModel
            {
                Messages = messageModels,
                TotalRecords = 2
            };
            var messageBoxQueryParam = new MessageBoxQueryParam
            {
                Keyword = "Notification",
                PageSize = 10,
                PageNumber = 5,
                IsWatcher = true
            };
            repository.GetByUserIdWithPaging(Arg.Compat.Any<MessageBoxQueryParam>())
                        .Returns(messageBoxViewModel);

            // Act
            var actual = await messageManagementController.GetByUserIdWithPaging(messageBoxQueryParam);

            // Assert
            Assert.Equal(messageBoxViewModel, actual);
        }


        [Fact]
        public async Task UpdateReadStatus_WhenRepositoryUpdateDataFromModel_ReturnMessageOK()
        {
            // Arrange
            const string messageExpected = "OK";
            var messageBoxUpdateParam = new MessageBoxUpdateParam
            {
                MessageId=1
            };
            repository.When(z => z.UpdateReadStatus(Arg.Compat.Any<MessageBoxUpdateParam>()));

            // Act
            var actual = await messageManagementController.UpdateReadStatus(messageBoxUpdateParam);
            var type = actual.GetType();
            var props = new List<PropertyInfo>(type.GetProperties());
            var messageActual = props.First().GetValue(actual, null);

            // Assert
            Assert.Equal(messageExpected, messageActual);
        }

        [Fact]
        public async Task UpdateReadStatus_WhenRepositoryUpdateDataFromModel_CallUpdateReadStatus()
        {
            // Arrange
            const int counterExpected = 1;
            var counterActual = 0;
            var messageBoxUpdateParam = new MessageBoxUpdateParam
            {
                MessageId = 1
            };
            repository.When(z => z.UpdateReadStatus(Arg.Compat.Any<MessageBoxUpdateParam>()))
                          .Do(x => counterActual++);

            // Act
            await messageManagementController.UpdateReadStatus(messageBoxUpdateParam);

            // Assert
            Assert.Equal(counterExpected, counterActual);
        }
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
