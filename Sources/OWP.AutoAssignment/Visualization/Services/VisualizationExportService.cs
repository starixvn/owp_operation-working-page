namespace OWP.AutoAssignment.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.IO;
    using System.Threading.Tasks;
    using AutoAssignment.Models;
    using Consts;
    using Models;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using OWP.Services;
    using Utils;

    public interface VisualizationExportService
    {
        Task<ExcelPackage> CreateExcelPackage(SchedulingRequest request);
    }

    public class VisualizationExportServiceImp : VisualizationExportService
    {
        private readonly ConfigurationService configurationService;

        private readonly VisualizationCalculateService visualizationCalculateService;

        private ExcelPackage excelPackage { get; set; }

        private ExcelWorksheet reportSheet;

        public VisualizationExportServiceImp(ConfigurationService configurationService, VisualizationCalculateService visualizationCalculateService)
        {
            this.configurationService = configurationService;
            this.visualizationCalculateService = visualizationCalculateService;
        }

        public async Task<ExcelPackage> CreateExcelPackage(SchedulingRequest request)
        {
            const string templatePath = @"App_Data\Templates\LAAutoAssignmentTimeTableTemplate.xlsx";
            var absoluteTemplatePath = $"{configurationService.CurrentDirectory}\\{templatePath}";
            var excelModels = await visualizationCalculateService.Calculate(request);

            return CreateExcelPackage(absoluteTemplatePath, excelModels);
        }

        private ExcelPackage CreateExcelPackage(string templatePath, ExcelVisualizationModel model)
        {
            LoadTemplate(templatePath);
            BuildVisualization(model);
            ClearTemplate();
            return excelPackage;
        }

        private void LoadTemplate(string templatePath)
        {
            using (var stream = new FileStream(templatePath, FileMode.Open, FileAccess.Read))
            {
                excelPackage = new ExcelPackage(stream);
                reportSheet = excelPackage.Workbook.Worksheets.Copy(ExcelConst.TemplateName, ExcelConst.SheetName);
            }
        }

        private void ClearTemplate()
        {
            excelPackage.Workbook.Worksheets.Delete(ExcelConst.TemplateName);
        }

        private void BuildVisualization(ExcelVisualizationModel model)
        {
            reportSheet.Cells[ExcelConst.DateRowIndex, ExcelConst.DateColIndex].Value = model.EventDate.ToString("dd-MMM-yyyy");

            for (int i = 0, row = ExcelConst.StartRowIndex; i < model.UserShifts.Count; i++, row++)
            {
                var trader = model.UserShifts[i];
                var startTime = trader.ShiftStartTime.ToString("HH");
                var endTime = trader.ShiftEndTime.ToString("HH");

                reportSheet.Cells[row, ExcelConst.TimeColIndex].Value = $"{startTime} > {endTime}";
                reportSheet.Cells[row, ExcelConst.GroupColIndex].Value = trader.Group;
                reportSheet.Cells[row, ExcelConst.NameColIndex].Value = trader.Username;
                reportSheet.Cells[row, ExcelConst.LocationColIndex].Value = trader.Location;
                reportSheet.Cells[row, ExcelConst.PcCodeColIndex].Value = trader.PcCode;
                reportSheet.Cells[row, ExcelConst.LevelColIndex].Value = trader.LevelLabel;

                if (string.Equals(trader.Role, "Supervisor", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(trader.Role, "Leader", StringComparison.OrdinalIgnoreCase))
                {
                    var colorTraderFromHex = ColorTranslator.FromHtml(BackgroundColor.SupOrLeaderRole);
                    reportSheet.Cells[row, ExcelConst.NameColIndex].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    reportSheet.Cells[row, ExcelConst.NameColIndex].Style.Fill.BackgroundColor.SetColor(colorTraderFromHex);
                }

                VisualizeAssignment(row, trader.Assignments, model.EventDate);
            }

            reportSheet.Cells.AutoFitColumns();
        }

        private void VisualizeAssignment(int row, IList<VisualizedAssignment> assignments, DateTime eventDate)
        {
            foreach (var assignment in assignments)
            {
                var colorFromHex = ColorTranslator.FromHtml(assignment.Color);
                var colIndex = GetTimeColIndex(assignment.Time, eventDate);

                if (colIndex > 0)
                {
                    reportSheet.Cells[row, colIndex].Value = assignment.Text;
                    reportSheet.Cells[row, colIndex].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    reportSheet.Cells[row, colIndex].Style.Fill.BackgroundColor.SetColor(colorFromHex);
                    if (assignment.Text.IsContainsIgnoreCase("ET") || assignment.Text.IsContainsIgnoreCase("PK"))
                    {
                        reportSheet.Cells[row, colIndex].Style.Font.Color.SetColor(Color.White);
                    }
                    reportSheet.Cells[row, colIndex].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                }
            }
        }

        public static int GetTimeColIndex(DateTime assignmentTime, DateTime eventDate)
        {
            var koHour = assignmentTime.AddMinutes(-assignmentTime.Minute);
            var koTimeFormat = koHour.ToString("hh:mm tt");

            if (assignmentTime < eventDate.AddHours(ExcelConst.OWPAddTime))
            {
                return ExcelConst.RealAssignmentTimeColIndex.GetValue(koTimeFormat, 0);
            }

            return assignmentTime < eventDate.AddDays(1).AddHours(ExcelConst.OWPAddTime)
                ? ExcelConst.AutoAssignmentTimeColIndex.GetValue(koTimeFormat, 0)
                : ExcelConst.AutoAssignmentTimeNextDayColIndex.GetValue(koTimeFormat, 0);
        }
    }
}