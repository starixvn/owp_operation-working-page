namespace OWP.OddsCompiler.Models
{
    using System;
    using System.Collections.Generic;

    public class QueryModel
    {
        public DateTime Date { get; set; }

        public string League { get; set; }

        public List<string> MatchStatusIds { get; set; } = new List<string>();

        public bool IsExcludeSpecialProducts { get; set; }
    }
}