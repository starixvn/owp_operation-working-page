namespace OWP.AutoAssignment.Models
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Reflection;
    using Fanex.NAP.OWP.Core.Extensions;
    using Fanex.NAP.OWP.Core.Extensions.ExcelExtensions;
    using NPOI.HSSF.Util;
    using NPOI.SS.UserModel;
    using NPOI.XSSF.UserModel;
    using Utils;

    public class AutoAssignmentWriter : TemplateWriter
    {
        private readonly int _maxNote;
        private readonly ISheet _sheet;
        private readonly DateTime _date;
        private readonly ICellStyle highlightCellStyle;
        private const int startRow = 3;
        private const int headerRow = 2;
        private readonly string _requestId;

        private readonly List<ColumnName> ColorColumns = new List<ColumnName>{
            ColumnName.Time,
            ColumnName.League,
            ColumnName.Home,
            ColumnName.Away
        };

        public AutoAssignmentWriter(int maxNote, DateTime date, string requestId)
        {
            _maxNote = maxNote;
            _date = date;
            _sheet = new XSSFWorkbook().CreateSheet();
            _requestId = requestId;
            highlightCellStyle = _sheet.Workbook.CreateCellStyle();
            highlightCellStyle.FillForegroundColor = HSSFColor.Grey25Percent.Index;
            highlightCellStyle.FillPattern = FillPattern.SolidForeground;
        }

        public override ISheet CustomizedSheet => _sheet;

        public override int StartRow => startRow;

        public override int HeaderRow => headerRow;

        public override void WriteColumns(IRow row, PropertyInfo prop, object value)
        {
            var columnAttribute = prop.GetCustomAttribute<ColumnAttribute>();
            var columnIndex = (int)columnAttribute.Name;
            const int noteColumnIndex = (int)ColumnName.Note;
            if (columnIndex == noteColumnIndex)
            {
                var notes = (value as IEnumerable<string>).ToList();
                for (var i = 0; i < _maxNote; i++)
                {
                    columnIndex = noteColumnIndex + i;
                    var cell = row.CreateCell(columnIndex);
                    if (i < notes.Count)
                    {
                        cell.SetCellValue(notes[i]);
                        cell.CellStyle = highlightCellStyle;
                    }
                }
            }
            else
            {
                if (columnIndex > noteColumnIndex)
                {
                    columnIndex = columnIndex + _maxNote - 1;
                }
                var cell = row.CreateCell(columnIndex);
                cell.SetCellValue(value);
                if (ColorColumns.Contains(columnAttribute.Name))
                {
                    cell.CellStyle = highlightCellStyle;
                }
            }
        }

        public override void WrapUp(Type exportType)
        {
            var header = CustomizedSheet.CreateRow(HeaderRow);
            var requestCell = CustomizedSheet.CreateRow(0).CreateCell(0);
            var dateCell = CustomizedSheet.CreateRow(1).CreateCell(0);
            CustomizedSheet.MergeCells(0, 1, 0, 5);
            SetInfoDateAndRequestCell(requestCell, new DateAndRequestCellModel
            {
                CellLabel = "RequestID:",
                CellValue = _requestId,
                Row = 0,
                Column = 1
            });
            SetInfoDateAndRequestCell(dateCell, new DateAndRequestCellModel
            {
                CellLabel = "Date",
                CellValue = _date.ToOWPDateFormat(),
                Row = 1,
                Column = 1
            });
            IterHeader(header, exportType);
        }

        private void SetInfoDateAndRequestCell(ICell cell, DateAndRequestCellModel model)
        {
            cell.CellStyle = CustomizedSheet.Workbook.CreateCellStyle();
            cell.SetCellValue(model.CellLabel);
            CustomizedSheet
                .GetRow(model.Row)
                    .CreateCell(model.Column)
                        .SetCellValue(model.CellValue);
            cell.CellStyle.FillForegroundColor = HSSFColor.LightCornflowerBlue.Index;
            cell.CellStyle.FillPattern = FillPattern.SolidForeground;
        }

        private void IterHeader(IRow headeRow, Type t)
        {
            t.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Where(p => p.GetCustomAttribute<ExcelIgnoreAttribute>() == null)
                .Iter(p => IterProperty(headeRow, p));
        }

        private void IterProperty(IRow row, PropertyInfo prop)
        {
            if (ConvertTypeService.IsBasicType(prop.PropertyType))
            {
                WriteCell(row, prop);
            }
            else
            {
                IterHeader(row, prop.PropertyType);
            }
        }

        private void WriteCell(
            IRow row,
            PropertyInfo prop)
        {
            var columnAttribute = prop.GetCustomAttribute<ColumnAttribute>();
            var columnName = EnumUtils<ColumnName>.GetDescription(columnAttribute.Name);
            var columnIndex = (int)columnAttribute.Name;
            const int noteColumnIndex = (int)ColumnName.Note;
            if (columnIndex == noteColumnIndex)
            {
                for (var i = 0; i < _maxNote; i++)
                {
                    columnIndex = noteColumnIndex + i;
                    var cell = row.CreateCell(columnIndex);
                    cell.SetCellValue(columnName);
                    cell.CellStyle = GetCellStyle(columnIndex);
                }
            }
            else
            {
                if (columnIndex > noteColumnIndex)
                {
                    columnIndex = columnIndex + _maxNote - 1;
                }

                var cell = row.CreateCell(columnIndex);
                cell.SetCellValue(columnName);
                cell.CellStyle = GetCellStyle(columnIndex);
            }
        }

#pragma warning disable S1541 // Methods and properties should not be too complex
        private ICellStyle GetCellStyle(int index)
#pragma warning restore S1541 // Methods and properties should not be too complex
        {
            Color foregroundColor;
            var fontColor = IndexedColors.Black.Index;
            if (index <= (int)ColumnName.League || index > (int)ColumnName.AutoLA && index <= (int)ColumnName.Phone)
            {
                foregroundColor = Color.Black;
                fontColor = IndexedColors.White.Index;
            }
            else if (index <= (int)ColumnName.NoOfHDP)
            {
                foregroundColor = Color.FromArgb(155, 187, 89);
            }
            else if (index <= (int)ColumnName.Trader_1HOU)
            {
                foregroundColor = Color.FromArgb(218, 150, 148);
            }
            else if (index <= (int)ColumnName.OtherTrader_1HOU || index == (int)ColumnName.OtherTrader_1X2)
            {
                foregroundColor = Color.Red;
                fontColor = IndexedColors.White.Index;
            }
            else if (index <= (int)ColumnName.Trader_10Mins)
            {
                foregroundColor = Color.FromArgb(218, 150, 148);
            }
            else if (index <= (int)ColumnName.Trader_1X2)
            {
                foregroundColor = Color.FromArgb(204, 204, 255);
            }
            else if (index <= (int)ColumnName.Trader_AIO)
            {
                foregroundColor = Color.FromArgb(204, 204, 255);
            }
            else if (index <= (int)ColumnName.AutoLA)
            {
                foregroundColor = Color.FromArgb(255, 255, 204);
            }
            else
            {
                foregroundColor = Color.FromArgb(204, 204, 255);
            }

            var font = _sheet.Workbook.CreateFont();
            font.Color = fontColor;
            var cellStyle = (XSSFCellStyle)_sheet.Workbook.CreateCellStyle();
            cellStyle.SetFillForegroundColor(new XSSFColor(foregroundColor));
            cellStyle.FillPattern = FillPattern.SolidForeground;
            cellStyle.SetFont(font);
            return cellStyle;
        }
    }
}