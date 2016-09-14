namespace Fanex.NAP.OWP.Core.Extensions.ExcelExtensions
{
    using NPOI.SS.Util;

    public static class XSSFCellRangeAddressExtensions
    {
        public static CellRangeAddress Clone(this CellRangeAddressBase range)
        {
            var result = new CellRangeAddress(range.FirstRow, range.LastRow, range.FirstColumn, range.LastColumn);

            return result;
        }
    }
}