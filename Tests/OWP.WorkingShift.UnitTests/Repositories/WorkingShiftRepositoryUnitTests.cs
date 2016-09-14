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

    public class WorkingShiftRepositoryUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftRepository repository;

        public WorkingShiftRepositoryUnitTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = config.CreateMapper();
            dynamicRepository = Substitute.For<IDynamicRepository>();
            currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 1;
            repository = new WorkingShiftRepositoryImp(mapper, dynamicRepository, currentSession);
        }

        [Fact]
        public async Task GetEmployeeWorkingShift_WhenCalled_ReturnEmployeeWorkingShiftList()
        {
            // Arrange
            var mockModel = new WorkingShiftQueryByUserModel
            {
                UserIds = "12",
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(2)
            };
            var expected = new List<WorkingShiftModel>{
                new WorkingShiftModel
                   {
                       UserId = 11,
                       ShiftId = 22,
                       ShiftDate = DateTime.Today
                   }
            };

            dynamicRepository.FetchAsync<WorkingShiftModel>(Arg.Compat.Any<QueryWorkingShiftByUserCriteria>()).Returns(expected);

            // Act
            var actual = await repository.QueryByUser(mockModel);

            // Assert
            Assert.Equal(expected, actual);
            await dynamicRepository.Received(1).FetchAsync<WorkingShiftModel>(Arg.Compat.Is<QueryWorkingShiftByUserCriteria>(x =>
                x.UserIds == mockModel.UserIds &&
                x.FromDate == mockModel.FromDate &&
                x.ToDate == mockModel.ToDate
            ));
        }

        [Fact]
        public async Task CopyWorkingShiftWeeklyPrevious_WhenCalled_DynamicRepositoryExecuteCriteria()
        {
            // Arrange
            var mockModel = new CopyWorkingShiftWeeklyPreviousModel
            {
                StartDateOfWeek = DateTime.Today,
                UserId = currentSession.UserId
            };

            // Act
            await repository.CopyWorkingShiftWeeklyPrevious(mockModel);

            // Assert
            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<CopyWorkingShiftWeeklyPreviousCriteria>(x =>
                x.ActorId == currentSession.UserId &&
                x.StartDateOfWeek == mockModel.StartDateOfWeek
            ));
        }

        [Fact]
        public async Task CopyWholeShifts_WhenCalled_DynamicRepositoryExecuteCriteria()
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
            await repository.CopyWholeShifts(mockModel);

            // Assert
            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<CopyWholeShiftsCriteria>(x =>
#pragma warning disable S1067 // Expressions should not be too complex
                x.ActorId == currentSession.UserId &&
                x.FromUserId == mockModel.FromUserId &&
                x.ToUserId == mockModel.ToUserId &&
                x.FromDate == mockModel.FromDate &&
                x.ToDate == mockModel.ToDate
#pragma warning restore S1067 // Expressions should not be too complex
            ));
        }

        [Fact]
        public async Task DeleteWholeShifts_WhenCalled_DynamicRepositoryExecuteCriteria()
        {
            // Arrange
            var mockModel = new DeleteWholeShiftsModel
            {
                UserId = 33,
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(6)
            };

            // Act
            await repository.DeleteWholeShifts(mockModel);

            // Assert
            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<DeleteWholeShiftsCriteria>(x =>
                x.ActorId == currentSession.UserId &&
                x.UserId == mockModel.UserId &&
                x.FromDate == mockModel.FromDate &&
                x.ToDate == mockModel.ToDate
            ));
        }

        [Fact]
        public async Task CopySingleShift_WhenCalled_ReturnEmployeeWorkingShift()
        {
            // Arrange
            var mockModel = new CopySingleShiftModel
            {
                UserId = 11,
                ShiftDate = DateTime.Today,
                ShiftId = 22,
                RefShiftId = 11
            };

            // Act
            await repository.CopySingleShift(mockModel);

            // Assert
            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<CopySingleShiftCriteria>(x =>
#pragma warning disable S1067 // Expressions should not be too complex
                x.ActorId == currentSession.UserId &&
                x.UserId == mockModel.UserId &&
                x.ShiftDate == mockModel.ShiftDate &&
                x.ShiftId == mockModel.ShiftId &&
                x.RefShiftId == mockModel.RefShiftId
#pragma warning restore S1067 // Expressions should not be too complex
            ));
        }

        [Fact]
        public async Task RemoveSingleShift_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new RemoveSingleShiftModel
            {
                EmployeeId = currentSession.UserId,
                ShiftDate = DateTime.Today
            };

            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };

            // Act
            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<RemoveSingleShiftCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<RemoveSingleShiftCriteria>();
                criteria.EmployeeId = mockModel.EmployeeId;
                criteria.ShiftDate = mockModel.ShiftDate;

                criteria.ActorId = currentSession.UserId;

                return Task.FromResult(commandResult);
            });

            var actual = await repository.RemoveSingleShift(mockModel);

            // Assert
            Assert.Equal(expected.IsSuccess, actual.IsSuccess);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<RemoveSingleShiftCriteria>(x => x.EmployeeId == mockModel.EmployeeId && x.ShiftDate == mockModel.ShiftDate));
        }

        [Fact]
        public async Task UpdateWorkingShiftCode_WhenCalled_ReturnResultDataObject()
        {
            // Arrange
            var mockModel = new UpdateWorkingShiftCodeModel
            {
                ShiftId = 99,
                IsOvertime = false,
                EmployeeId = 8,
                ShiftDate = DateTime.Today
            };

            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };

            // Act
            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<UpdateWorkingShiftCodeCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<UpdateWorkingShiftCodeCriteria>();
                criteria.EmployeeId = currentSession.UserId;
                criteria.ShiftDate = mockModel.ShiftDate;
                criteria.ShiftId = mockModel.ShiftId;
                criteria.IsOvertime = mockModel.IsOvertime;
                criteria.ActorId = currentSession.UserId;

                return Task.FromResult(commandResult);
            });

            var actual = await repository.UpdateWorkingShiftCode(mockModel);

            // Assert
            Assert.Equal(expected.IsSuccess, actual.IsSuccess);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<UpdateWorkingShiftCodeCriteria>(x => x.EmployeeId == currentSession.UserId &&
            x.ShiftDate == mockModel.ShiftDate &&
            x.ShiftId == mockModel.ShiftId
            && x.IsOvertime == mockModel.IsOvertime));
        }
    }
}