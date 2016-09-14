namespace OWP.WorkingShift.UnitTests.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Criteria;
    using OWP.Models;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftTimezoneRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftTimezoneSettingRepository repository;

        public WorkingShiftTimezoneRepositoryUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();
            currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;
            repository = new WorkingShiftTimezoneSettingRepositoryImp(dynamicRepository, currentSession);
        }

        [Fact]
        public async Task GetTimezoneSettings_WhenCalled_ReturnListTimezoneSettingModel()
        {
            // Arrange

            var expected = new List<TimezoneSettingModel>
            {
               new TimezoneSettingModel{ Offset=0, Name="GMT+8", IsSelected=true },
               new TimezoneSettingModel{ Offset=-60, Name="GMT+7" }
            };

            // Act
            dynamicRepository.FetchAsync<TimezoneSettingModel>(Arg.Compat.Any<GetTimezoneSettingCriteria>()).Returns(expected);

            var actual = await repository.GetTimezoneSettings();

            // Assert
            Assert.Equal(expected, actual);

            await dynamicRepository.Received(1).FetchAsync<TimezoneSettingModel>(Arg.Compat.Is<GetTimezoneSettingCriteria>(x => x.UserId == currentSession.UserId));
        }

        [Fact]
        public async Task GetSelectedTimezoneSetting_WhenCalled_ReturnSelectedTimezoneSettingModel()
        {
            // Arrange

            var expected = new List<TimezoneSettingModel>
            {
               new TimezoneSettingModel{ Offset=0, Name="GMT+8", IsSelected=true },
               new TimezoneSettingModel{ Offset=-60, Name="GMT+7" }
            };

            // Act
            dynamicRepository.FetchAsync<TimezoneSettingModel>(Arg.Compat.Any<GetTimezoneSettingCriteria>()).Returns(expected);
            var actual = await repository.GetSelectedTimezoneSetting();

            // Assert
            Assert.Equal(expected.FirstOrDefault(), actual);

            await dynamicRepository.Received(1).FetchAsync<TimezoneSettingModel>(Arg.Compat.Is<GetTimezoneSettingCriteria>(x => x.UserId == currentSession.UserId));
        }

        [Fact]
        public async Task Update_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new TimezoneUpdateModel
            {
                SettingId = 1
            };

            var expected = new ResultDataObject
            {
                Code = 0
            };
            const int commandResult = 0;
            // Act
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<UpdateTimezoneCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<UpdateTimezoneCriteria>();
                criteria.UserId = currentSession.UserId;
                criteria.SettingId = mockModel.SettingId;

                return Task.FromResult(commandResult);
            });

            var actual = await repository.Update(mockModel);

            // Assert
            Assert.Equal(expected.Code, actual.Code);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<UpdateTimezoneCriteria>(x => x.UserId == currentSession.UserId &&
          x.SettingId == mockModel.SettingId));
        }
    }
}