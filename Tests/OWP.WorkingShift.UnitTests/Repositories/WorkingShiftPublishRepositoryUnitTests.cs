namespace OWP.WorkingShift.UnitTests.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftPublishRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftPublishRepository repository;

        public WorkingShiftPublishRepositoryUnitTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = config.CreateMapper();
            dynamicRepository = Substitute.For<IDynamicRepository>();
            currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;
            repository = new WorkingShiftPublishRepositoryImp(mapper, dynamicRepository, currentSession);
        }

        [Fact]
        public async Task GetSectionPublishWorkingShift_WhenCalled_ReturnListSectionPublishWorkingShiftModel()
        {
            // Arrange
            var mockModel = new GetSectionWorkingShiftPublishByWeekCriteria
            {
                FromDate = new DateTime(2019, 06, 10),
                ToDate = new DateTime(2019, 06, 16),
                SectionIds = "1,3,5,7"
            };

            var expected = new List<SectionPublishWorkingShiftModel>
            {
               new SectionPublishWorkingShiftModel{  SectionId=1, IsPublished=true, Name="LA"},
               new SectionPublishWorkingShiftModel{ SectionId=2, IsPublished=false, Name="LG"}
            };

            // Act
            dynamicRepository.FetchAsync<SectionPublishWorkingShiftModel>(Arg.Compat.Any<GetSectionWorkingShiftPublishByWeekCriteria>()).Returns(expected);

            var actual = await repository.GetSectionPublishWorkingShift(mockModel.FromDate, mockModel.ToDate, mockModel.SectionIds);

            // Assert
            Assert.Equal(expected, actual);

            await dynamicRepository.Received(1).FetchAsync<SectionPublishWorkingShiftModel>(Arg.Compat.Is<GetSectionWorkingShiftPublishByWeekCriteria>(x => x.FromDate == mockModel.FromDate
            && x.ToDate == mockModel.ToDate
            && x.SectionIds == mockModel.SectionIds));
        }

        [Fact]
        public async Task PublishSection_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new PublishWeeklyWorkingShiftModel
            {
                FromDate = new DateTime(2019, 06, 10),
                ToDate = new DateTime(2019, 06, 16),
                SectionId = 8,
                IsPublished = true
            };

            var expected = new ResultDataObject
            {
                Code = 0
            };
            // Act

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<UpdateEmployeeWorkingShiftOrderCriteria>()).Returns(Task.FromResult(commandResult));

            var actual = await repository.PublishSection(mockModel);

            // Assert
            Assert.Equal(expected.Code, actual.Code);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<PublishWeeklyWorkingShiftCriteria>(x =>
#pragma warning disable S1067 // Expressions should not be too complex
                x.ActorId == currentSession.UserId &&
                x.FromDate == mockModel.FromDate
                && x.ToDate == mockModel.ToDate
                && x.IsPublished == mockModel.IsPublished
                && x.SectionId == mockModel.SectionId
#pragma warning restore S1067 // Expressions should not be too complex
            ));
        }
    }
}