namespace Fanex.NAP.OWP.TaskScheduling.Models.EventPicking
{
    using System.Collections.Generic;
    using Model;

    public class EventPickingModel : Pagination
    {
        public EventPickingModel()
        {
            MatchInfos = new List<MatchInfo>();
        }

        public IEnumerable<MatchInfo> MatchInfos { get; set; }

        public bool IsHost { get; set; }
    }
}