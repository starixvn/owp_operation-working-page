using Fanex.NAP.OWP.TaskScheduling.Models.EventPicking;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.NAP.OWP.TaskScheduling.Service.Implement
{
    public interface OrderMatchService
    {
        IList<MatchExportingNewFormat> Order(IList<MatchExportingNewFormat> matches);
    }

    public class OrderMatchServiceImp : OrderMatchService
    {
        public IList<MatchExportingNewFormat> Order(IList<MatchExportingNewFormat> matches)
        {
            var matchesOderable = matches.OrderBy(m => m.GameDate);
            return OrderEachGroupMatch(matchesOderable);
        }

        private static IList<MatchExportingNewFormat> OrderEachGroupMatch(IEnumerable<MatchExportingNewFormat> matches)
        {
            var resultOrderMatch = new List<MatchExportingNewFormat>();
            var matchGrouping = matches.GroupBy(m => new { m.GameDate, m.HasProvider, m.HasBlacklist, m.HasMaxbet });
            foreach (var matchGroup in matchGrouping)
            {
                var resultOrderMatchInEachGroup = matchGroup.OrderByDescending(m => m.MaxBetHDPNumber).ToList();
                resultOrderMatch.AddRange(resultOrderMatchInEachGroup);
            }
            return resultOrderMatch;
        }
    }
}
