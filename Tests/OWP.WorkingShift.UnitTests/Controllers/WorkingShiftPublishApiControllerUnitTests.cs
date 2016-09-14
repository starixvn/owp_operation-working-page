namespace OWP.WorkingShift.UnitTests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using WorkingShift.Controllers;
    using WorkingShift.Repositories;
    using Xunit;

    public class WorkingShiftPublishApiControllerUnitTests : IDisposable
    {
        private readonly WorkingShiftPublishApiController controller;
        private readonly WorkingShiftPublishRepository repository;

        public WorkingShiftPublishApiControllerUnitTests()
        {
            repository = Substitute.For<WorkingShiftPublishRepository>();
            controller = new WorkingShiftPublishApiController(repository);
        }

        [Fact]
        public async Task PublishWeeklyWorkingShift_WhenCalled_ReturnEmployeeWorkingShift()
        {
            var mockDate = new DateTime(2019, 05, 20);
            // Arrange
            var mockModel = new PublishWeeklyWorkingShiftModel
            {
                FromDate = mockDate,
                ToDate = mockDate.AddDays(6),
                IsPublished = true,
                SectionId = 1
            };

            var expected = new ResultDataObject
            {
                Code = (int)ErrorCode.Ok,
                Data = mockModel
            };
            var sectionPublish = new List<SectionPublishWorkingShiftModel>
            {
                 new SectionPublishWorkingShiftModel
                 {
                      FromDate=mockModel.FromDate,
                       IsPublished=true,
                         Name="sa",
                          SectionId=1,
                           ToDate=mockModel.ToDate,
                            LastPublishedDate=mockDate,
                             LastPublishedBy="sa"
                 }
            };
            repository.PublishSection(Arg.Compat.Is<PublishWeeklyWorkingShiftModel>(x => x == mockModel)).Returns(expected);

            repository.GetSectionPublishWorkingShift(Arg.Compat.Any<DateTime>(), Arg.Compat.Any<DateTime>(), Arg.Compat.Any<string>())
                .Returns(sectionPublish);

            repository.GetWeeklyWorkingShiftBySection(Arg.Compat.Any<WorkingShiftQueryBySectionModel>()).Returns(x => new List<WorkingShiftModel>
            {
                new WorkingShiftModel{ ShiftId=1, ShiftEndTime=mockDate, ShiftDate=mockDate, UserId=1, ShiftStartTime=mockDate}
            });

            // Act
            await controller.PublishWeeklyWorkingShift(mockModel);

            await repository.Received(1).PublishSection(Arg.Compat.Is<PublishWeeklyWorkingShiftModel>(x => x == mockModel));
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

        ~WorkingShiftPublishApiControllerUnitTests()
        {
            Dispose(false);
        }
    }
}