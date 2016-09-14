namespace Fanex.NAP.OWP.Core.Extensions.ExcelExtensions
{
    using System.Collections.Generic;
    using NPOI.SS.UserModel;

    public class ExcelRow<T>
    {
        private readonly ISheet _template;
        private readonly IRow _row;
        private readonly T obj;
        private readonly IDictionary<string, int> _columns;

        internal ExcelRow(ISheet template, IRow currentRow, T currentObj, IDictionary<string, int> columns)
        {
            _template = template;
            _row = currentRow;
            obj = currentObj;
            _columns = columns;
        }

        public ISheet Template
        {
            get
            {
                return _template;
            }
        }

        public IRow CurrentRow
        {
            get
            {
                return _row;
            }
        }

        public T CurrentObj
        {
            get
            {
                return obj;
            }
        }

        public IDictionary<string, int> Columns
        {
            get
            {
                return _columns;
            }
        }
    }
}