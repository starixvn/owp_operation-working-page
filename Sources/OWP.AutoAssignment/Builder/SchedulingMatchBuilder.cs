namespace OWP.AutoAssignment.Builder
{
    using System.Collections.Generic;
    using System.Linq;
    using Helper;
    using Models;

    public interface SchedulingMatchBuilder
    {
        IEnumerable<SchedulingMatch> BuildListSchedulingMatch(IEnumerable<MatchInfo> mainMatchs, IEnumerable<MatchInfo> restMatch);
    }

    public class SchedulingMatchBuilderImp : SchedulingMatchBuilder
    {
        private IEnumerable<int> providerIds = new List<int>();

        public IEnumerable<SchedulingMatch> BuildListSchedulingMatch(IEnumerable<MatchInfo> mainMatchs, IEnumerable<MatchInfo> restMatch)
        {
            var listSchedulingMatch = new List<SchedulingMatch>();
            if (!mainMatchs.Any() || !restMatch.Any())
            {
                return listSchedulingMatch;
            }
            var matchIds = restMatch.Select(m => m.MatchId)
                .Distinct();
            foreach (var matchId in matchIds)
            {
                var mainMatch = mainMatchs.First(m => m.MatchId == matchId);
                var filterMatches = restMatch.Where(m => m.MatchId == matchId);
                var bettypes = filterMatches.Select(m => m.SchedulingBettypeId).Distinct();
                if (!string.IsNullOrEmpty(mainMatch.Provider))
                {
                    providerIds = ProviderHelper.DetectIndexAndOrderProviderSpecial(mainMatch.Provider);
                }
                var groupBettype = BettypeHelper.BuildGroupBettype(bettypes);
                foreach (var group in groupBettype)
                {
                    listSchedulingMatch.Add(BuildSchedulingMatch(mainMatch, group.Key, group.Value));
                }
            }
            return listSchedulingMatch;
        }

        public SchedulingMatch BuildSchedulingMatch(MatchInfo match, string groupBettype, IEnumerable<int> bettypeId)
            => new SchedulingMatch
            {
                // TODO
                //MatchId = match.MatchId,
                //KOTime = match.KOTime.ToString(AutoAssignmentConst.FormatDateTime),
                //HasTV = match.HasTV,
                //MaxBet = match.MaxBet,
                //IsSoloMatch = match.IsSoloMatch,
                //IsMajorLeague = match.IsMajorLeague,
                //PickedBettypes = new HashSet<int>(bettypeId),
                //Provider = new HashSet<int>(providerIds),
                //ExtraTime = EtPkHelper.DetectEtPkByExtraTime(groupBettype, match.ExtraTime ?? string.Empty),
                //Venue = match.Venue ?? "",
                //Group = groupBettype,
                //IsFantasy = match.IsFantasy,
                //OtherTime = match.OtherTime.HasValue
                //        ? match.KOTime.Date.Add(match.OtherTime.Value).ToString(AutoAssignmentConst.FormatDateTime)
                //        : "",
                //HasChannel = match.HasChannel,
                //HasReporter = match.HasReporter,
                //RequireChinese = match.RequireChinese
            };
    }
}