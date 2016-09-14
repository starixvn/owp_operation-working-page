using System.Threading.Tasks;
using Fanex.Data.Repository;

namespace Fanex.NAP.OWP.EventManagement.Repositories.Implement
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using Criteria.EventInfo;
    using Data;
    using global::OWP.Enumerations;
    using Interfaces;
    using Model;
    using Models.EventInfo;
    using Assignment = Models.EventInfo.Assignment;
    using MatchInfo = Models.EventInfo.MatchInfo;
    using MatchSetting = Models.EventInfo.MatchSetting;

    public class EventInformationRepository : IEventInformationRepository
    {
        private readonly IDynamicRepository dynamicRepository;

        public EventInformationRepository(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public IEnumerable<MatchInfo> GetEventInformation(GetEventInformationCriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (var reader = db.QueryMultiple(criteria))
                {
                    var matchInfos = reader.Read<MatchInfo>();
                    var assignments = reader.Read<Assignment>();
                    var matchSettings = reader.Read<MatchSetting>();
                    var matchNotes = reader.Read<MatchNote>();
                    var televisions = reader.Read<Television>();
                    var matchOffers = reader.Read<MatchOffer>();

                    return GetInfo(matchInfos, assignments, matchSettings, matchNotes, televisions, matchOffers);
                }
            }
        }

        public IEnumerable<MatchInfo> GetEventInformationByFilterId(GetEventInformationByFilterIdCriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (var reader = db.QueryMultiple(criteria))
                {
                    var matchInfos = reader.Read<MatchInfo>();
                    var assignments = reader.Read<Assignment>();
                    var matchSettings = reader.Read<MatchSetting>();
                    var matchNotes = reader.Read<MatchNote>();
                    var televisions = reader.Read<Television>();
                    var matchOffers = reader.Read<MatchOffer>();

                    return GetInfo(matchInfos, assignments, matchSettings, matchNotes, televisions, matchOffers);
                }
            }
        }


        private AssignmentModel GetAssignment(MatchInfo matchInfo, IEnumerable<Assignment> assignments)
        {
            var assignment = new AssignmentModel
            {
                Handicap = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.Handicap, (int)AssignmentType.Main),
                HandicapOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.Handicap, (int)AssignmentType.Others),
                OverUnder = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OverUnder, (int)AssignmentType.Main),
                OverUnderOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OverUnder, (int)AssignmentType.Others),
                OneXTwo = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OneXTwo, (int)AssignmentType.Main),
                OneXTwoOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OneXTwo, (int)AssignmentType.Others),
                Handicap1st = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.Handicap1St, (int)AssignmentType.Main),
                Handicap1stOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.Handicap1St, (int)AssignmentType.Others),
                OverUnder1st = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OverUnder1St, (int)AssignmentType.Main),
                OverUnder1stOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OverUnder1St, (int)AssignmentType.Others),
                OneXTwo1st = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OneXTwo1St, (int)AssignmentType.Main),
                OneXTwo1stOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.OneXTwo1St, (int)AssignmentType.Others),
                Specific15Mins = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.Specific15Mins, (int)AssignmentType.Main),
                Specific15MinsOthers = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.Specific15Mins, (int)AssignmentType.Others),
                Specific10Mins = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.Specific10Mins, (int)AssignmentType.Main),
                Specific10MinsOthers = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.Specific10Mins, (int)AssignmentType.Others),
                FastMarket = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.FastMarket, (int)AssignmentType.Main),
                FastMarketOthers = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.FastMarket, (int)AssignmentType.Others),
                AllInOne = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.AllInOne, (int)AssignmentType.Main),
                AllInOneOthers = GetAssignmentForSpecialBettype(assignments, matchInfo, (int)MinorBettype.AllInOne, (int)AssignmentType.Others),
                LA = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.La2Nd, (int)AssignmentType.Main),
                LAOthers = GetAssignmentByBettypeAndAssignmentType(assignments, matchInfo, (int)MajorBettype.La2Nd, (int)AssignmentType.Others)
            };

            return assignment;
        }

        private static IEnumerable<Assignment> GetAssignmentByBettypeAndAssignmentType(IEnumerable<Assignment> assignments, MatchInfo matchInfo, int betType, int assignmentType)
        {
            return assignments.Where(x => x.OWPMatchId == matchInfo.OWPMatchId && x.BettypeId == betType && x.AssignmentType == assignmentType);
        }

        private static MatchSetting GetMatchSetting(
            IEnumerable<MatchSetting> matchSettings,
            MatchInfo matchInfo,
            int bettypeId)
        {
            var result = matchSettings.FirstOrDefault(x => x.OWPMatchId == matchInfo.OWPMatchId && x.BettypeId == bettypeId);

            return result ?? new MatchSetting();
        }

        private MatchSettingModel GetMatchSetting(MatchInfo matchInfo, IEnumerable<MatchSetting> matchSettings)
        {
            var matchSetting = new MatchSettingModel
            {
                Handicap = GetMatchSetting(matchSettings, matchInfo, (int)MajorBettype.Handicap),
                OverUnder = GetMatchSetting(matchSettings, matchInfo, (int)MajorBettype.OverUnder),
                OneXTwo = GetMatchSetting(matchSettings, matchInfo, (int)MajorBettype.OneXTwo),
                Handicap1st = GetMatchSetting(matchSettings, matchInfo, (int)MajorBettype.Handicap1St),
                OverUnder1st = GetMatchSetting(matchSettings, matchInfo, (int)MajorBettype.OverUnder1St),
                OneXTwo1st = GetMatchSetting(matchSettings, matchInfo, (int)MajorBettype.OneXTwo1St),
                Specific15Mins = GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.Specific15Mins),
                Specific10Mins = GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.Specific10Mins),
                FastMarket = GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.FastMarket)
            };

            return matchSetting;
        }

        private IEnumerable<MatchInfo> GetInfo(
           IEnumerable<MatchInfo> matchInfos,
           IEnumerable<Assignment> assignments,
           IEnumerable<MatchSetting> matchSettings,
           IEnumerable<MatchNote> matchNotes,
           IEnumerable<Television> televisions,
           IEnumerable<MatchOffer> matchOffers)
        {
            foreach (var matchInfo in matchInfos)
            {
                matchInfo.Assignment = GetAssignment(matchInfo, assignments);
                matchInfo.MatchSetting = GetMatchSetting(matchInfo, matchSettings);
                matchInfo.MatchNotes = matchNotes.Where(x => x.OWPMatchId == matchInfo.OWPMatchId);
                matchInfo.Televisions = televisions.Where(x => x.OWPMatchId == matchInfo.OWPMatchId);
                matchInfo.MatchOffers = matchOffers.Where(x => x.OWPMatchId == matchInfo.OWPMatchId).Select(x => new MatchOffer
                {
                    OWPMatchId = x.OWPMatchId,
                    MatchOfferValue = WebUtility.HtmlEncode(x.MatchOfferValue)
                });
                matchInfo.TotalNotes = matchInfo.MatchNotes.Count();
            }

            return matchInfos;
        }

        private static IEnumerable<Assignment> GetAssignmentForSpecialBettype(
            IEnumerable<Assignment> assignments,
            MatchInfo matchInfo,
            int bettypeId,
            int assignmentType)
        {
            var result = !matchInfo.IsMinorMatch ? assignments.Where(x => x.MinorBettypeId == bettypeId
                                                                                  && x.BettypeId == (int)MajorBettype.Handicap
                                                                                  && x.ParentMatchId == matchInfo.OWPMatchId
                                                                                  && x.AssignmentType == assignmentType)
                : GetAssignmentForSpecific15Mins(assignments, matchInfo, bettypeId, assignmentType);
            return result;
        }

        private static IEnumerable<Assignment> GetAssignmentForSpecific15Mins(
            IEnumerable<Assignment> assignments,
            MatchInfo matchInfo,
            int bettypeId,
            int assignmentType)
        {
            IEnumerable<Assignment> result;

            if (matchInfo.MinorBettypeId == (int)MinorBettype.NoOfCorner && bettypeId == (int)MinorBettype.Specific15Mins)
            {
                result = assignments.Where(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsCorners
                            && x.BettypeId == (int)MajorBettype.Handicap
                            && x.ParentMatchId == matchInfo.ParentMatchId
                            && x.AssignmentType == assignmentType);
            }
            else if (matchInfo.MinorBettypeId == (int)MinorBettype.TotalBooking && bettypeId == (int)MinorBettype.Specific15Mins)
            {
                result = assignments.Where(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsTotalBookings
                           && x.BettypeId == (int)MajorBettype.Handicap
                           && x.ParentMatchId == matchInfo.ParentMatchId
                           && x.AssignmentType == assignmentType);
            }
            else
            {
                result = new List<Assignment>();
            }

            return result;
        }

        private static MatchSetting GetMatchSettingForSpecialBettype(
            IEnumerable<MatchSetting> matchSettings,
            MatchInfo matchInfo,
            int bettypeId)
        {
            var result = !matchInfo.IsMinorMatch
                ? matchSettings.FirstOrDefault(x => x.MinorBettypeId == bettypeId && x.ParentMatchId == matchInfo.OWPMatchId)
                : GetMatchSettingForSpecific15Mins(matchSettings, matchInfo, bettypeId);

            return result ?? new MatchSetting();
        }

        private static MatchSetting GetMatchSettingForSpecific15Mins(
            IEnumerable<MatchSetting> matchSettings,
            MatchInfo matchInfo,
            int bettypeId)
        {
            MatchSetting result;

            if (matchInfo.MinorBettypeId == (int)MinorBettype.NoOfCorner && bettypeId == (int)MinorBettype.Specific15Mins)
            {
                result = matchSettings.FirstOrDefault(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsCorners
                            && x.BettypeId == (int)MajorBettype.Handicap
                            && x.ParentMatchId == matchInfo.ParentMatchId);
            }
            else if (matchInfo.MinorBettypeId == (int)MinorBettype.TotalBooking && bettypeId == (int)MinorBettype.Specific15Mins)
            {
                result = matchSettings.FirstOrDefault(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsTotalBookings
                            && x.BettypeId == (int)MajorBettype.Handicap
                            && x.ParentMatchId == matchInfo.ParentMatchId);
            }
            else
            {
                result = new MatchSetting();
            }

            return result ?? new MatchSetting();
        }

        public async Task<IEnumerable<TicketInfo>> GetTicketsByOwpMatchId(GetTicketListCriteria criteria)
        {
            return await dynamicRepository.FetchAsync<TicketInfo>(criteria) ;
        }
    }
}