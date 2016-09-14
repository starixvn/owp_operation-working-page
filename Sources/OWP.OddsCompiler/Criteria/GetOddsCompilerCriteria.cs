namespace OWP.OddsCompiler.Criteria
{
    using System;
    using System.Web.Mvc;
    using Fanex.Data.Repository;

    public class GetOddsCompilerCriteria : CriteriaBase
    {
        [AllowHtml]
        public string League { get; set; }

        public DateTime Date { get; set; }

        public string MatchStatusIds { get; set; }

        public bool IsExcludeSpecialProducts { get; set; }

        public override string GetSettingKey() => "OWP_OddsCompiler_Get";

        public override bool IsValid() => Date > DateTime.MinValue;
    }
}