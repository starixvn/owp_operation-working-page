namespace OWP.MessageManagement.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using FluentAssertions;
    using Models;
    using NSubstitute;
    using Xunit;

    public class RepositoryUnitTests
    {
        private readonly IDynamicRepository fanexRepository;
        private readonly Repository messageManagementRepository;

        public RepositoryUnitTests()
        {
            fanexRepository = Substitute.For<IDynamicRepository>();
            var currentSession = Substitute.For<ICurrentSession>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = config.CreateMapper();
            messageManagementRepository = new RepositoryImp(mapper, fanexRepository, currentSession);
            currentSession.UserId = 1;
        }

        [Fact]
        public async Task GetByUserIdWithPaging_MessageBoxQueryParamValid_ReturnMessageBoxViewModel()
        {
            // Arrange
            var totalRecords = 0;
            const int totalRecordsExpect = 2;
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
            var messageBoxQueryParam = new MessageBoxQueryParam
            {
                Keyword = "Notification",
                PageSize = 10,
                PageNumber = 5,
                IsWatcher = true
            };
            fanexRepository.FetchAsync<MessageModel>(Arg.Compat.Any<MessageBoxQueryCriteria>())
                                .Returns(messageModels)
                                    .AndDoes(x => totalRecords = 2);

            // Act
            var actual = await messageManagementRepository.GetByUserIdWithPaging(messageBoxQueryParam);
            var messageBoxViewModelExpect = new MessageBoxViewModel
            {
                Messages = messageModels.ToList(),
                TotalRecords = totalRecordsExpect

            };
            var messageBoxViewModelActual = new MessageBoxViewModel
            {
                Messages = actual.Messages,
                TotalRecords = totalRecords
            };

            // Assert
            messageBoxViewModelActual.Should()
                                        .BeEquivalentTo(messageBoxViewModelExpect);
        }

        [Fact]
        public async Task Update_WhenModelIsValid_RepositoryExcuteSuccessful()
        {
            // Arrange
            const int counterExpected = 1;
            var counterActual = 0;
            var messageBoxUpdateParam = new MessageBoxUpdateParam
            {
                MessageId = 1
            };
            fanexRepository.When(z => z.ExecuteAsync(Arg.Compat.Any<INonQueryCommand>()))
                                .Do(x => counterActual++);
            // Act
            await messageManagementRepository.UpdateReadStatus(messageBoxUpdateParam);

            // Assert
            Assert.Equal(counterExpected, counterActual);
        }
    }
}
