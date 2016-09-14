namespace OWP.AutoAssignment.Models
{
    using Newtonsoft.Json;

    public class TraderInfo
    {
        public int TraderId { get; set; }

        [JsonProperty("Lvl")]
        public int Level { get; set; }

        public string Role { get; set; }

        public string BettypesPreferences { get; set; }

        [JsonIgnore]
        public string MultipleGames { get; set; }

        public int? MaxGames { get; set; }

        public SchedulingWorkingShift[] WorkingShifts { get; set; }
    }
}