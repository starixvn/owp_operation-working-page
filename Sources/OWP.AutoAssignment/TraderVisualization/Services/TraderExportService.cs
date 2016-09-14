using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using OWP.AutoAssignment.Models;
using OWP.AutoAssignment.TraderVisualization.Constants;
using OWP.AutoAssignment.TraderVisualization.Models;
using OWP.Services;
using OWP.Utils;

namespace OWP.AutoAssignment.TraderVisualization.Services
{
    public interface TraderExportService
    {
        Task<TraderExport> ExportExcel(SchedulingRequest request = null);
    }

    public class TraderExportServiceImp : TraderExportService
    {
        private readonly ConfigurationService configurationService;
        private readonly TraderCalculateService traderCalculateService;
        private ExcelWorksheet worksheet;

        public TraderExportServiceImp(ConfigurationService configurationService, TraderCalculateService traderCalculateService)
        {
            this.configurationService = configurationService;
            this.traderCalculateService = traderCalculateService;
        }

        public async Task<TraderExport> ExportExcel(SchedulingRequest request = null)
        {
            var traderTimeTable = await traderCalculateService.Calculate(request);

            var existingFile = LoadTemplate();

            using (ExcelPackage package = new ExcelPackage(existingFile))
            {
                worksheet = package.Workbook.Worksheets[ExcelConst.ReportSheetIndex];

                VisualizeWorkingShift(traderTimeTable);

                AddDataToSheet(traderTimeTable);

                return new TraderExport(
                    $"Trader TimeTable - {traderTimeTable.EventDate:yyyyMMdd}.xlsx",
                    await package.GetAsByteArrayAsync());
            }
        }

        public FileInfo LoadTemplate()
        {
            var templatePath = ExcelConst.TraderTemplatePath;
            var filePath = $"{configurationService.CurrentDirectory}\\{templatePath}";
            return new FileInfo(filePath);
        }

        private void AddDataToSheet(TraderTimeTable traderTimeTable)
        {
            worksheet.Cells[ExcelConst.EventDateRowIndex, ExcelConst.EventDateColIndex].Value = traderTimeTable.EventDate.ToString("dd-MMM-yyyy");

            for (int i = 0; i < traderTimeTable.Traders.Count; i++)
            {
                var row = ExcelConst.DefaultRowData + i;
                var trader = traderTimeTable.Traders[i];

                worksheet.Cells[row, ExcelConst.RangeTimeColIndex].Value = trader.RangeShiftTime;
                worksheet.Cells[row, ExcelConst.GroupColIndex].Value = trader.Group;
                worksheet.Cells[row, ExcelConst.UserNameColIndex].Value = trader.Username;
                worksheet.Cells[row, ExcelConst.LocationColIndex].Value = trader.Location;
                worksheet.Cells[row, ExcelConst.MainBetTypeColIndex].Value = trader.MainBettype;
                worksheet.Cells[row, ExcelConst.LevelColIndex].Value = trader.LevelLabel;
                if (string.Equals(trader.Role, "Supervisor", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(trader.Role, "Leader", StringComparison.OrdinalIgnoreCase))
                {
                    var colorTraderFromHex = ColorTranslator.FromHtml(BackgroundColor.SupOrLeaderRole);
                    worksheet.Cells[row, ExcelConst.UserNameColIndex].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    worksheet.Cells[row, ExcelConst.UserNameColIndex].Style.Fill.BackgroundColor.SetColor(colorTraderFromHex);
                }

                AddAssignmentToSheet(trader.Assignments, traderTimeTable.EventDate, row);
            }

            worksheet.Cells.AutoFitColumns();
        }

        private void AddAssignmentToSheet(List<Assignment> assignments, DateTime eventDate, int row)
        {
            foreach (var assignment in assignments)
            {
                var colorFromHex = ColorTranslator.FromHtml(assignment.Color);
                var colIndex = GetStartWorkShiftCol(eventDate, assignment.Time);

                if (colIndex <= ExcelConst.DefaultMaxColEndShift && colIndex >= ExcelConst.DefaultColStartShift)
                {
                    worksheet.Cells[row, colIndex].Value = assignment.Text;
                    worksheet.Cells[row, colIndex].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    worksheet.Cells[row, colIndex].Style.Fill.BackgroundColor.SetColor(colorFromHex);

                    if (assignment.Text.IsContainsIgnoreCase("ET") || assignment.Text.IsContainsIgnoreCase("PK"))
                    {
                        worksheet.Cells[row, colIndex].Style.Font.Color.SetColor(Color.White);
                    }
                }
                worksheet.Cells[row, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
                worksheet.Cells[row, colIndex].Style.Font.Bold = true;
            }
        }

        private void VisualizeWorkingShift(TraderTimeTable traderTimeTable)
        {
            for (int i = 0; i < traderTimeTable.Traders.Count; i++)
            {
                var row = ExcelConst.DefaultRowData + i;
                var trader = traderTimeTable.Traders[i];
                var colorFromHex = ColorTranslator.FromHtml(BackgroundColor.WorkingShift);

                var startWorkShiftIndex = GetStartWorkShiftCol(traderTimeTable.EventDate, trader.ShiftStartTime);
                var startWorkShiftCol = startWorkShiftIndex < ExcelConst.DefaultColStartShift
                    ? ExcelConst.DefaultColStartShift
                    : startWorkShiftIndex;

                var endWorkShiftCol = GetEndWorkShiftCol(traderTimeTable.EventDate, trader.ShiftEndTime);

                worksheet.Cells[row, startWorkShiftCol, row, endWorkShiftCol].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[row, startWorkShiftCol, row, endWorkShiftCol].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[row, startWorkShiftCol, row, endWorkShiftCol].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[row, startWorkShiftCol, row, endWorkShiftCol].Style.Border.Left.Style = ExcelBorderStyle.Thin;

                worksheet.Cells[row, startWorkShiftCol, row, endWorkShiftCol].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[row, startWorkShiftCol, row, endWorkShiftCol].Style.Fill.BackgroundColor.SetColor(colorFromHex);
            }
        }

        private static int GetStartWorkShiftCol(DateTime eventDate, DateTime startTime)
        {
            var defaultStartTime = eventDate.Date.AddHours(ExcelConst.DefaultHourStartShift);
            var rangeStartTime = (int)(startTime - defaultStartTime).TotalHours;
            return rangeStartTime + ExcelConst.DefaultColStartShift;
        }

        private static int GetEndWorkShiftCol(DateTime eventDate, DateTime endTime)
        {
            var defaultStartTime = eventDate.Date.AddHours(ExcelConst.DefaultHourStartShift);
            var rangeEndTime = (int)Math.Ceiling((endTime - defaultStartTime).TotalHours);
            var endColIndex = rangeEndTime + ExcelConst.DefaultColStartShift;

            return endColIndex > ExcelConst.DefaultMaxColEndShift ? ExcelConst.DefaultMaxColEndShift : endColIndex;
        }
    }
}
