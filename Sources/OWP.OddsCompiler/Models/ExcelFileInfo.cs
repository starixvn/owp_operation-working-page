namespace OWP.OddsCompiler.Models
{
    using Epplus.Mapper.Annotations;

    public class ExcelFileInfo
    {
        [Cell("B1")]
        public string Date { get; set; }

        [Cell("E1")]
        public string League { get; set; }

        [Cell("F1")]
        public string MatchStatus { get; set; }

        [Cell("G1")]
        public string IsExcludeSpecialProducts { get; set; }

        [Cell("H1")]
        public string ExportTime { get; set; }

        [Cell("I1")]
        public string ExportBy { get; set; }
    }
}