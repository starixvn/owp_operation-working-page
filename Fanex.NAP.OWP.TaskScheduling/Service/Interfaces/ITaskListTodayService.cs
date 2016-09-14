using System.Threading.Tasks;

namespace Fanex.NAP.OWP.TaskScheduling.Service.Interfaces
{
    using System;
    using System.Collections.Generic;
    using Core.Model;
    using Criteria.TaskListToday;
    using Models.TaskListToday;

    public interface ITaskListTodayService
    {
        Task<IEnumerable<MatchInfo>> GetMatchListToday(GetTaskListTodayCriteria criteria);

        OWPCommandResult UpdateMatchNoteStatus(UpdateMatchNoteViewCriteria criteria);

        IEnumerable<DateTime> UpdateReadyTradeStatus(UpdateReadyTradeStatusCriteria criteria);
    }
}