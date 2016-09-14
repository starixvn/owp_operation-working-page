namespace OWP.WorkingShift.UnitTests.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Repositories;
    using Xunit;

    public class RepositoryWorkingShiftColorUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;
        private readonly WorkingShiftColorRepository repository;
        private readonly WorkingShiftTimezoneSettingRepository workingShiftTimezoneSettingRepository;

        public RepositoryWorkingShiftColorUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();
            currentSession = Substitute.For<ICurrentSession>();
            workingShiftTimezoneSettingRepository = Substitute.For<WorkingShiftTimezoneSettingRepository>();

            currentSession.UserId.Returns(99);
            repository = new RepositoryWorkingShiftColorImp(dynamicRepository, currentSession, workingShiftTimezoneSettingRepository);
        }

        [Fact]
        public async Task GetAll_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var criteria = new GetAllWorkingShiftColorCriteria
            {
                UserId = currentSession.UserId
            };

            // Arrange
            var expected = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1},
                new WorkingShiftColorModel{ ShiftId=2}
            };

            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(expected);

            // Act
            var actual = await repository.GetAll();

            Assert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<WorkingShiftColorModel>(Arg.Compat.Is<GetAllWorkingShiftColorCriteria>(x => x.UserId == criteria.UserId));
        }

        [Fact]
        public async Task GetAllGMT8_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var criteria = new GetAllWorkingShiftColorCriteria
            {
                UserId = 0
            };

            // Arrange
            var expected = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1},
                new WorkingShiftColorModel{ ShiftId=2}
            };

            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(expected);

            // Act
            var actual = await repository.GetAllGmt8();

            Assert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<WorkingShiftColorModel>(Arg.Compat.Is<GetAllWorkingShiftColorCriteria>(x => x.UserId == criteria.UserId));
        }

        [Fact]
        public async Task GetAllByTimeZone_WhenCalled_DynamicRepositorFetchAsyncCriteria()
        {
            var criteria = new GetAllWorkingShiftColorCriteria
            {
                UserId = currentSession.UserId,
                TimeZoneOffset = -60
            };

            // Arrange
            var expected = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1},
                new WorkingShiftColorModel{ ShiftId=2}
            };

            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(expected);

            // Act
            var actual = await repository.GetAllByTimeZone(-60);

            Assert.Equal(expected, actual);

            // Assert
            await dynamicRepository.Received(1).FetchAsync<WorkingShiftColorModel>(Arg.Compat.Is<GetAllWorkingShiftColorCriteria>(x => x.UserId == criteria.UserId
            && x.TimeZoneOffset == criteria.TimeZoneOffset));
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnCode_Ok()
        {
            const string shiftCode = "AAA";

            // Arrange
            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, ShiftCode="ABC", IsTimeShift=false},
                new WorkingShiftColorModel{ ShiftId=2, ShiftCode="DEF", IsTimeShift=false}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            // Act
            var actual = await repository.ValidateBeforeCreateAsync(shiftCode);

            // Assert
            Assert.Equal(expected.Code, actual.Code);
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnError_IncorectFormat()
        {
            const string shiftCode = "05 >99999";

            // Arrange
            var expected = new ResultDataObject
            {
                Code = 1
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=true},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift=true, ShiftCode="05 >08"}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            workingShiftTimezoneSettingRepository.GetSelectedTimezoneSetting().Returns(x => new TimezoneSettingModel { IsSelected = true, Name = "GMT+7", Offset = 0, SettingId = 1 });

            // Act
            var actual = await repository.ValidateBeforeCreateAsync(shiftCode);

            // Assert
            Assert.Equal(expected.Code, actual.Code);
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnError_IncorectFormat_HourIN_RealShift()
        {
            const string shiftCode = "09:05 >10:00(REAL)";

            // Arrange
            var expected = new ResultDataObject
            {
                Code = 1,
                Message = "The hour(IN) of REAL shift violates the rules! You cannot add this shift!"
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=true},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift=true, ShiftCode="05 >08"}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);
            workingShiftTimezoneSettingRepository.GetSelectedTimezoneSetting().Returns(x => new TimezoneSettingModel { IsSelected = true, Name = "GMT+7", Offset = 0, SettingId = 1 });
            // Act
            var actual = await repository.ValidateBeforeCreateAsync(shiftCode);

            // Assert
            Assert.Equal(expected.Message, actual.Message);
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnError_IncorectFormat_HourIN_SpecialShift()
        {
            const string shiftCode = "6:05 >10:00(SPECIAL)";

            // Arrange
            var expected = new ResultDataObject
            {
                Code = 1,
                Message = "The hour(IN) of SPECIAL shift violates the rules! You cannot add this shift!"
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=true},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift=true, ShiftCode="05 >08"}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);
            workingShiftTimezoneSettingRepository.GetSelectedTimezoneSetting().Returns(x => new TimezoneSettingModel { IsSelected = true, Name = "GMT+7", Offset = 0, SettingId = 1 });
            // Act
            var actual = await repository.ValidateBeforeCreateAsync(shiftCode);

            // Assert
            Assert.Equal(expected.Message, actual.Message);
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnError_DuplicateShift()
        {
            const string shiftCode = "AAA";

            // Arrange
            var expected = new ResultDataObject
            {
                Code = -1
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift = false, ShiftCode = "AAA"},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift = true, ShiftCode = "05 >08",
                    StartTime =new TimeSpan(5,0,0),
                    EndTime=new TimeSpan(8,0,0)
                }
            };

            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            // Act
            var actual = await repository.ValidateBeforeCreateAsync(shiftCode);

            // Assert
            Assert.Equal(expected.Code, actual.Code);
        }

        [Fact]
        public async Task ValidateBeforeCreate_WhenCalled_ReturnError_SimilarShift()
        {
            const string shiftCode = "AA A";

            // Arrange
            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.WarningToContinue
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=false, ShiftCode="AAA"},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift = true, ShiftCode = "05 >08",
                    StartTime =new TimeSpan(5,0,0),
                    EndTime=new TimeSpan(8,0,0)
                }
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            // Act
            var actual = await repository.ValidateBeforeCreateAsync(shiftCode);

            // Assert
            Assert.Equal(expected.Code, actual.Code);
        }

        [Fact]
        public async Task Insert_WhenCalled_ReturnError_ShiftCodeContainsSpecialCharacter()
        {
            var mockModel = new QuickInsertWorkingShiftColorModel
            {
                ShiftCode = "<aabc"
            };

            // Arrange
            var expected = new ResultDataObject
            {
                Code = -1
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=false, ShiftCode="AAA"},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift=true, ShiftCode="05 >08"}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            // Act
            var actual = await repository.Insert(mockModel);

            // Assert
            Assert.Equal(expected.Code, actual.Code);
        }

        [Fact]
        public async Task Insert_WhenCalled_ResultDataObject()
        {
            var mockModel = new QuickInsertWorkingShiftColorModel
            {
                ShiftCode = "ABCD",
                Background = "#000",
                Color = "#3399cc"
            };
            var mockCriterial = new InsertWorkingShiftColorCriteria
            {
                ShiftCode = "ABCDEFGH",
                ActorId = currentSession.UserId,
                Background = "#000",
                Color = "#3399cc",
                StartTime = new TimeSpan(0, 5, 0),
                EndTime = new TimeSpan(4, 5, 0)
            };
            // Arrange
            var expected = new ResultDataObject
            {
                Code = 0
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=false, ShiftCode="AAA"},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift=true, ShiftCode="05 >08"}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<InsertWorkingShiftColorCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<InsertWorkingShiftColorCriteria>();
                criteria.ShiftCode = mockCriterial.ShiftCode;
                criteria.Color = mockCriterial.Color;
                criteria.Background = mockCriterial.Background;
                criteria.ActorId = currentSession.UserId;
                criteria.StartTime = mockCriterial.StartTime;
                criteria.EndTime = mockCriterial.EndTime;
                criteria.ErrCode = 0;
                criteria.ErrMsg = "123";
                criteria.ShiftId = 99;
                return Task.FromResult(commandResult);
            });
            // Act
            var actual = await repository.Insert(mockModel);

            // Assert
            Assert.Equal(expected.Code, actual.Code);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<InsertWorkingShiftColorCriteria>(p =>
               p.ActorId == currentSession.UserId &&
               p.Background == mockCriterial.Background &&
               p.Color == mockCriterial.Color

           ));
        }

        [Fact]
        public async Task Insert_Shift_OFF_WhenCalled_ResultDataObject()
        {
            var mockModel = new QuickInsertWorkingShiftColorModel
            {
                ShiftCode = "OFF",
                Background = "#000",
                Color = "#3399cc"
            };
            var mockCriterial = new InsertWorkingShiftColorCriteria
            {
                ShiftCode = "ABCDEFGH",
                ActorId = currentSession.UserId,
                Background = "#000",
                Color = "#3399cc",
                StartTime = new TimeSpan(0, 5, 0),
                EndTime = new TimeSpan(4, 5, 0)
            };
            // Arrange
            var expected = new ResultDataObject
            {
                Code = 0
            };

            var mockData = new List<WorkingShiftColorModel>
            {
                new WorkingShiftColorModel{ ShiftId=1, IsTimeShift=false, ShiftCode="AAA"},
                new WorkingShiftColorModel{ ShiftId=2, IsTimeShift=true, ShiftCode="05 >08"}
            };
            dynamicRepository.FetchAsync<WorkingShiftColorModel>(Arg.Compat.Any<GetAllWorkingShiftColorCriteria>()).Returns(mockData);

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<InsertWorkingShiftColorCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<InsertWorkingShiftColorCriteria>();
                criteria.ShiftCode = mockCriterial.ShiftCode;
                criteria.Color = mockCriterial.Color;
                criteria.Background = mockCriterial.Background;
                criteria.ActorId = currentSession.UserId;
                criteria.StartTime = mockCriterial.StartTime;
                criteria.EndTime = mockCriterial.EndTime;
                criteria.ErrCode = 0;
                criteria.ErrMsg = "123";
                criteria.ShiftId = 99;
                return Task.FromResult(commandResult);
            });

            // Act
            var actual = await repository.Insert(mockModel);

            // Assert
            Assert.Equal(expected.Code, actual.Code);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<InsertWorkingShiftColorCriteria>(p =>
               p.ActorId == currentSession.UserId &&
               p.Background == mockCriterial.Background &&
               p.Color == mockCriterial.Color

           ));
        }

        [Fact]
        public async Task Update_WhenCalled_ResultDataObject()
        {
            var mockModel = new WorkingShiftColorModel
            {
                ShiftId = 99,
                ShiftCode = "ABCDEFGH",
                Background = "#000",
                Color = "#3399cc"
            };
            var mockCriterial = new UpdateWorkingShiftColorCriteria
            {
                ShiftId = 99,

                ActorId = currentSession.UserId,
                Background = "#000",
                Color = "#3399cc"
            };
            // Arrange
            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<UpdateWorkingShiftColorCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<UpdateWorkingShiftColorCriteria>();
                criteria.ShiftId = mockCriterial.ShiftId;
                criteria.Color = mockCriterial.Color;
                criteria.Background = mockCriterial.Background;
                criteria.ActorId = currentSession.UserId;

                return Task.FromResult(commandResult);
            });

            // Act
            var actual = await repository.Update(mockModel);

            // Assert
            Assert.Equal(expected.Code, actual.Code);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<UpdateWorkingShiftColorCriteria>(p =>
               p.ActorId == currentSession.UserId &&
               p.Background == mockCriterial.Background &&
               p.Color == mockCriterial.Color &&
               p.ShiftId == mockCriterial.ShiftId
           ));
        }

        [Fact]
        public async Task ValidateBeforeDeleteAsync_WhenCalled_ResultDataObject()
        {
            var mockModel = new WorkingShiftColorModel
            {
                ShiftId = 99
            };
            var mockCriterial = new ValidateBeforeDeleteWorkingShiftColorCriteria
            {
                ShiftId = 99
            };
            // Arrange
            var expected = new ResultDataObject
            {
                Code = 0
            };

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<ValidateBeforeDeleteWorkingShiftColorCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<ValidateBeforeDeleteWorkingShiftColorCriteria>();
                criteria.ShiftId = mockCriterial.ShiftId;

                criteria.ErrCode = 0;

                return Task.FromResult(commandResult);
            });

            // Act
            var actual = await repository.ValidateBeforeDeleteAsync(mockModel.ShiftId);

            // Assert
            Assert.Equal(expected.IsSuccess, actual.IsSuccess);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<ValidateBeforeDeleteWorkingShiftColorCriteria>(p =>
               p.ShiftId == mockCriterial.ShiftId
           ));
        }

        [Fact]
        public async Task Delete_WhenCalled_ResultDataObject()
        {
            var mockModel = new WorkingShiftColorModel
            {
                ShiftId = 99
            };
            var mockCriterial = new DeleteWorkingShiftColorCriteria
            {
                ShiftId = 99
            };
            // Arrange
            var expected = new ResultDataObject
            {
                Code = 0
            };

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<DeleteWorkingShiftColorCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<DeleteWorkingShiftColorCriteria>();
                criteria.ShiftId = mockCriterial.ShiftId;

                criteria.ActorId = currentSession.UserId;

                return Task.FromResult(commandResult);
            });

            // Act
            var actual = await repository.Delete(mockModel.ShiftId);

            // Assert
            Assert.Equal(expected.IsSuccess, actual.IsSuccess);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<DeleteWorkingShiftColorCriteria>(p =>
               p.ActorId == currentSession.UserId &&
               p.ShiftId == mockCriterial.ShiftId
           ));
        }

        [Fact]
        public async Task Delete_WhenCalled_ResultDataObject_CannotDeleteShift()
        {
            var mockModel = new WorkingShiftColorModel
            {
                ShiftId = 99
            };
            var mockCriterial = new DeleteWorkingShiftColorCriteria
            {
                ShiftId = 99
            };
            // Arrange
            var expected = new ResultDataObject
            {
                Code = 1
            };

            const int commandResult = 0;
            dynamicRepository.ExecuteAsync(Arg.Compat.Any<DeleteWorkingShiftColorCriteria>()).Returns(x =>
            {
                var criteria = x.Arg<DeleteWorkingShiftColorCriteria>();
                criteria.ShiftId = mockCriterial.ShiftId;
                criteria.ErrCode = 1;
                criteria.ActorId = currentSession.UserId;

                return Task.FromResult(commandResult);
            });

            // Act
            var actual = await repository.Delete(mockModel.ShiftId);

            // Assert
            Assert.Equal(expected.IsSuccess, actual.IsSuccess);

            await dynamicRepository.Received(1).ExecuteAsync(Arg.Compat.Is<DeleteWorkingShiftColorCriteria>(p =>
               p.ActorId == currentSession.UserId &&
               p.ShiftId == mockCriterial.ShiftId
           ));
        }
    }
}