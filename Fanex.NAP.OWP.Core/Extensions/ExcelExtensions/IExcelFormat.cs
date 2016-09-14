namespace Fanex.NAP.OWP.Core.Extensions.ExcelExtensions
{
    using NPOI.SS.UserModel;

    public interface IExcelFormatter<T>
    {
        void CustomizeSheet(ISheet sheet);

        void CustomizeRow(ExcelRow<T> row);
    }
}