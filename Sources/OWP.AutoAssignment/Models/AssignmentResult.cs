namespace OWP.AutoAssignment.Models
{
    using Fanex.NAP.OWP.Core.Extensions.XMLExtensions;
    using Newtonsoft.Json;

    [XMLName("Row")]
    public class AssignmentResult
    {
        public int Bettype { get; set; }

        [XMLName("OWPMatchId")]
        public int MatchId { get; set; }

        [JsonProperty("LA_SusId")]
        public int? UserId_LA { get; set; }

        [JsonProperty("FTHDP_TraderId")]
        public int? UserId_FTHDP { get; set; }

        [JsonProperty("1HHDP_TraderId")]
        public int? UserId_1HHDP { get; set; }

        [JsonProperty("FTOU_TraderId")]
        public int? UserId_FTOU { get; set; }

        [JsonProperty("1HOU_TraderId")]
        public int? UserId_1HOU { get; set; }

        public string Group { get; set; }

        public string ExtraTime { get; set; }

        public int StatusCode { get; set; }
    }
}