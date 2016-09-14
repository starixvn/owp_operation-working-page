using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NSubstitute;
using OWP.AutoAssignment.TraderVisualization.Models;
using OWP.AutoAssignment.TraderVisualization.Services;
using OWP.Services;
using Xunit;

namespace OWP.AutoAssignment.UnitTests.TraderVisualization.Services
{
    public class TraderExportServiceUnitTests
    {
        private readonly ConfigurationService configurationService;
        private readonly TraderCalculateService traderCalculateService;

        public TraderExportServiceUnitTests()
        {
            configurationService = Substitute.For<ConfigurationService>();
            traderCalculateService = Substitute.For<TraderCalculateService>();
        }

        [Fact]
        public async Task CreateExcelPackage()
        {
            var request = new Models.SchedulingRequest
            {
                RequestId = "abc",
                EventDate = new DateTime(2022, 1, 08)
            };
            traderCalculateService.Calculate(request).Returns(GetExcelModel());
            configurationService.CurrentDirectory.Returns(AppDomain.CurrentDomain.BaseDirectory);
            var services = new TraderExportServiceImp(configurationService, traderCalculateService); ;

            var result = await services.ExportExcel(request);

            Assert.NotNull(result.FileContent);
            Assert.Equal("Trader TimeTable - 20220108.xlsx", result.FileName);
        }

        private static TraderTimeTable GetExcelModel()
        {
            return new TraderTimeTable
            {
                EventDate = new DateTime(2022, 01, 08),
                Traders = new List<TraderInfo>
                {
                    new TraderInfo
                    {
                        UserId = 123456,
                        ShiftStartTime = new DateTime(2022, 01, 08, 3,0,0),
                        ShiftEndTime = new DateTime(2022, 01, 08, 10,0,0),
                        Assignments = new List<Assignment>
                        {
                            new Assignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2022, 1, 08,7,0,0) }
                        }
                    }
                }
            };
        }
    }
}
