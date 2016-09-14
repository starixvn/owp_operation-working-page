namespace OWP.OddsCompiler.Models
{
    using System.Collections.Generic;

    public class ExcelModel
    {
        public IList<ExcelReportModel> ExcelModels { get; set; }

        public ExcelFileInfo FileInfo { get; set; }
    }
}