namespace Fanex.NAP.OWP.TaskScheduling.Models.EventPicking
{
    using System.Collections.Generic;

    public class LeagueSettingCondition
    {
        public IEnumerable<Condition> Rounds { get; set; } = new List<Condition>();

        public IEnumerable<Condition> Divisions { get; set; } = new List<Condition>();
    }
}