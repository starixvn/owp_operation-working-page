namespace OWP.AutoAssignment.UnitTests.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoAssignment.Visualization.Consts;
    using AutoAssignment.Visualization.Models;
    using NSubstitute;
    using OWP.AutoAssignment.Visualization.Services;
    using OWP.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class VisualizationExportServiceUnitTests
    {
        private readonly VisualizationExportServiceImp services;
        private readonly ConfigurationService configurationService;
        private readonly VisualizationCalculateService calculateService;

        public VisualizationExportServiceUnitTests()
        {
            configurationService = Substitute.For<ConfigurationService>();
            calculateService = Substitute.For<VisualizationCalculateService>();

            services = new VisualizationExportServiceImp(configurationService, calculateService);
        }

        [Theory]
        [InlineData("2021-03-08 15:30:05", 18)]
        [InlineData("2021-03-08 10:15:00", 13)]
        [InlineData("2021-03-09 08:30:00", 35)]
        [InlineData("2021-03-09 13:10:00", 40)]
        public void GetTimeColIndex(string assignmentTime, int expected)
        {
            var eventDate = new DateTime(2021, 3, 8);
            var time = DateTime.Parse(assignmentTime);

            var actual = VisualizationExportServiceImp.GetTimeColIndex(time, eventDate);

            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task CreateExcelPackage()
        {
            var request = new Models.SchedulingRequest
            {
                RequestId = "abc",
                EventDate = new DateTime(2021, 03, 08)
            };
            var model = GetExcelModel();
            calculateService.Calculate(request).Returns(model);
            configurationService.CurrentDirectory.Returns(AppDomain.CurrentDomain.BaseDirectory);

            var actual = await services.CreateExcelPackage(request);
            var reportSheet = actual.Workbook.Worksheets[ExcelConst.SheetName];
            DeepAssert.Equal(reportSheet.Cells[3, 16].Style.Fill.BackgroundColor.Rgb, "FFA6A6A6");
            DeepAssert.Equal(reportSheet.Cells[3, 16].Value, string.Empty);
            DeepAssert.Equal(reportSheet.Cells[3, 17].Style.Fill.BackgroundColor.Rgb, "FFFF6699");
            DeepAssert.Equal(reportSheet.Cells[3, 17].Value, "02:30");
        }

        private static ExcelVisualizationModel GetExcelModel()
        {
            return new ExcelVisualizationModel
            {
                EventDate = new DateTime(2021, 03, 08),
                UserShifts = new List<UserShift>
                {
                    new UserShift
                    {
                        UserId = 8,
                        Assignments = new List<VisualizedAssignment>
                        {
                            new VisualizedAssignment { Text = "", Color = "#a6a6a6", Time = new DateTime(2021,03,08, 13,0,0) },
                            new VisualizedAssignment { Text = "02:30", Color = "#ff6699", Time = new DateTime(2021,03,08, 14,30,0) },
                        },
                        ShiftStartTime = new DateTime(2021,03,11, 3,0,0),
                        ShiftEndTime = new DateTime(2021,03,11, 10,0,0)
                    }
                }
            };
        }
    }
}
