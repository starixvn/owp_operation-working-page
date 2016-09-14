namespace Fanex.NAP.OWP.Core.Extensions.ExcelExtensions
{
    using System;
    using System.Reflection;
    using NPOI.SS.UserModel;

    public abstract class TemplateWriter
    {
        public abstract ISheet CustomizedSheet { get; }

        public abstract int StartRow { get; }

        public abstract int HeaderRow { get; }

        public abstract void WriteColumns(IRow row, PropertyInfo prop, object value);

        public abstract void WrapUp(Type exportType);
    }
}