namespace Fanex.NAP.OWP.Core.Extensions.ExcelExtensions
{
    using System.Globalization;
    using System.Web;
    using NPOI.SS.UserModel;

    public static class XSSFWorkbookExtensions
    {
        public static ISheet CloneSheet(this IWorkbook workbook, string sourceSheetName, string newSheetName)
        {
            var sheetIndex = workbook.GetSheetIndex(sourceSheetName);
            var newSheet = workbook.CloneSheet(sheetIndex);
            var newSheetIndex = workbook.GetSheetIndex(newSheet);
            workbook.SetSheetName(newSheetIndex, newSheetName);
            return newSheet;
        }

        public static void ToReponseStream(this IWorkbook workbook, string fileName)
        {
            if (workbook != null)
            {
                var response = HttpContext.Current.Response;

                response.Clear();
                response.ContentType = "application/vnd.ms-excel";
                response.AddHeader("Content-Disposition", string.Format(CultureInfo.InvariantCulture, "attachment; filename={0}.xlsx", fileName));

                workbook.Write(response.OutputStream);
            }
        }
    }
}