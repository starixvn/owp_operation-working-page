using OWP.EventAssignment.Models;

namespace Fanex.NAP.OWP.TaskScheduling.Repositories.Implement
{
    using Core.Helpers;
    using Data;
    using Data.Repository;
    using global::OWP.Enumerations;
    using global::OWP.Services;
    using Interfaces;
    using Models.EventAssignment;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    public class EventAssignmentRepository : IEventAssignmentRepository
    {
        private readonly IDynamicRepository dynamicRepository;

        private readonly CheckIsLiveStatusServices checkIsLiveStatusServices;

        public EventAssignmentRepository(IDynamicRepository repository, CheckIsLiveStatusServices checkIsLiveStatusServices)
        {
            dynamicRepository = repository;
            this.checkIsLiveStatusServices = checkIsLiveStatusServices;
        }
        public async Task<IEnumerable<EventModel>> GetEventInformationByEventDate(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (var reader = await db.QueryMultipleAsync(criteria))
                {
                    var matchInfos = reader.Read<MatchInfo>();
                    var traders = reader.Read<MatchTrader>();
                    var notes = reader.Read<MatchNote>();
                    var matchSettings = reader.Read<MatchMoney>();
                    var _ = reader.Read<Television>();
                    var matchOffers = reader.Read<MatchOffer>();
                    var events = await GetInfo(matchInfos, traders, notes, matchSettings, matchOffers);
                    return events;
                }
            }
        }

        private static List<string> GetMatchNote(IEnumerable<MatchNote> notes, int matchId)
        {
            return notes.Where(x => x.OWPMatchId == matchId).Select(x => x.Note).ToList();
        }

        private static string GetMainTrader(IEnumerable<MatchTrader> traders, int matchId, int bettype)
        {
            return traders
                .Where(x => x.OWPMatchId == matchId && x.Bettype == bettype && x.AssignmentType == (short)AssignmentType.Main)
                .Select(tr => tr.Username).FirstOrDefault();
        }

        private static string GetOtherTraders(IEnumerable<MatchTrader> traders, int matchId, int bettype)
        {
            var otherAssignments = traders
                .Where(x => x.OWPMatchId == matchId && x.Bettype == bettype && x.AssignmentType == (short)AssignmentType.Others)
                .Select(x => new OtherAssignment
                {
                    Username = x.Username,
                    Note = x.AssignmentNote
                });

            return string.Join(", ", otherAssignments.Select(x => x.Note.Replace("#<user>", "#" + x.Username)));
        }

        private static string GetMainTraderNameForSpecialBettype(IEnumerable<MatchTrader> traders, MatchInfo matchInfo, int minorBettype)
        {
            return GetSpecialBettypeTraders(traders, matchInfo, minorBettype, (int)AssignmentType.Main)
                    .Select(tr => tr.Username).FirstOrDefault();
        }

        private static string GetOtherTradersNameForSpecialBettype(IEnumerable<MatchTrader> traders, MatchInfo matchInfo, int minorBettype)
        {
            var otherTraders = GetSpecialBettypeTraders(traders, matchInfo, minorBettype, (int)AssignmentType.Others)
                .Select(x => new OtherAssignment
                {
                    Username = x.Username,
                    Note = x.AssignmentNote
                });

            return string.Join(", ", otherTraders.Select(x => x.Note.Replace("#<user>", "#" + x.Username)));
        }

        private static IEnumerable<MatchTrader> GetSpecialBettypeTraders(IEnumerable<MatchTrader> traders, MatchInfo matchInfo, int minorBettype, int assignmentType)
        {
            IEnumerable<MatchTrader> resultTraders;

            if (!matchInfo.IsMinorMatch)
            {
                resultTraders = traders.Where(x => x.MinorBettypeId == minorBettype
                            && x.ParentMatchId == matchInfo.OWPMatchId
                            && x.Bettype == (int)MajorBettype.Handicap
                            && x.AssignmentType == assignmentType);
            }
            else if (minorBettype == (int)MinorBettype.Specific15Mins)
            {
                resultTraders = GetTradersForSpecificMatch(traders, matchInfo, assignmentType, (int)MinorBettype.Specific15MinsCorners, (int)MinorBettype.Specific15MinsTotalBookings);
            }
            else if (minorBettype == (int)MinorBettype.AllInOne)
            {
                resultTraders  = GetTradersForSpecificMatch(traders, matchInfo, assignmentType, (int)MinorBettype.AllInOneCorners, (int)MinorBettype.AllInOneTotalBookings);
            }
            else if (minorBettype == (int)MinorBettype.FastMarket)
            {
                resultTraders = GetTradersForSpecificMatch(traders, matchInfo, assignmentType, (int)MinorBettype.FastMarketCorners, (int)MinorBettype.FastMarketTotalBookings);
            }
            else
            {
                resultTraders = new List<MatchTrader>();
            }

            return resultTraders;
        }

        private static IEnumerable<MatchTrader> GetTradersForSpecificMatch(IEnumerable<MatchTrader> traders, MatchInfo matchInfo, int assignmentType, int minorBetTypeCorner, int minorBetTypeBooking)
        {
            IEnumerable<MatchTrader> resultTraders;

            switch (matchInfo.MinorBettypeId)
            {
                case (int)MinorBettype.NoOfCorner:
                    resultTraders = traders.Where(x => x.MinorBettypeId == minorBetTypeCorner
                                                       && x.ParentMatchId == matchInfo.ParentMatchId
                                                       && x.Bettype == (int)MajorBettype.Handicap
                                                       && x.AssignmentType == assignmentType);
                    break;

                case (int)MinorBettype.TotalBooking:
                    resultTraders = traders.Where(x => x.MinorBettypeId == minorBetTypeBooking
                                                       && x.ParentMatchId == matchInfo.ParentMatchId
                                                       && x.Bettype == (int)MajorBettype.Handicap
                                                       && x.AssignmentType == assignmentType);
                    break;

                default:
                    resultTraders = new List<MatchTrader>();
                    break;
            }

            return resultTraders;
        }

        private static string GetMaxBet(
            IEnumerable<MatchMoney> matchSettings,
            int matchId,
            int bettype)
        {
            var matchSetting = matchSettings.FirstOrDefault(x => x.OWPMatchId == matchId && x.Bettype == bettype);
            return GetMaxBet(matchSetting);
        }

        private static string GetMaxBet(MatchMoney matchSetting)
        {
            return matchSetting == null ? string.Empty : matchSetting.MaxBet.ToOWPMaxBetFormat();
        }

        private static string GetSpread(
            IEnumerable<MatchMoney> matchSettings,
            int matchId,
            int bettype)
        {
            var matchSetting = matchSettings.FirstOrDefault(x => x.OWPMatchId == matchId && x.Bettype == bettype);
            return GetSpread(matchSetting);
        }

        private static string GetSpread(MatchMoney matchSetting)
        {
            return matchSetting == null ? string.Empty : matchSetting.Spread.ToOWPSpreadFormat();
        }

        private static MatchMoney GetMatchSettingForSpecialBettype(
            IEnumerable<MatchMoney> matchSettings,
            MatchInfo matchInfo,
            int bettypeId)
        {
            MatchMoney matchSetting;
            if (!matchInfo.IsMinorMatch)
            {
                matchSetting = matchSettings.FirstOrDefault(x => x.MinorBettypeId == bettypeId && x.ParentMatchId == matchInfo.OWPMatchId);
            }
            else
            {
                if (matchInfo.MinorBettypeId == (int)MinorBettype.NoOfCorner && bettypeId == (int)MinorBettype.Specific15Mins)
                {
                    matchSetting = matchSettings.FirstOrDefault(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsCorners
                                && x.Bettype == (int)MajorBettype.Handicap
                                && x.ParentMatchId == matchInfo.ParentMatchId);
                }
                else if (matchInfo.MinorBettypeId == (int)MinorBettype.TotalBooking && bettypeId == (int)MinorBettype.Specific15Mins)
                {
                    matchSetting = matchSettings.FirstOrDefault(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsTotalBookings
                                && x.Bettype == (int)MajorBettype.Handicap
                                && x.ParentMatchId == matchInfo.ParentMatchId);
                }
                else
                {
                    matchSetting = null;
                }
            }

            return matchSetting;
        }

        [SuppressMessage("StyleCop.CSharp.StylecopPlus.Rules", "SP2101:MethodMustNotContainMoreLinesThan", Justification = "Reviewed.")]
        private async Task<IEnumerable<EventModel>> GetInfo(
           IEnumerable<MatchInfo> matchInfos,
           IEnumerable<MatchTrader> traders,
           IEnumerable<MatchNote> notes,
           IEnumerable<MatchMoney> matchSettings,
           IEnumerable<MatchOffer> matchOffers)
        {
            var matchList = new List<EventModel>();
            var adminSiteIds = string.Join(",", matchInfos.Select(x => x.ParentAdminSiteId).Distinct());
            var mainDBResult = await checkIsLiveStatusServices.GetOfferLiveStatusFromMainDB(adminSiteIds);
            foreach (var matchInfo in matchInfos)
            {
                var match = new EventModel
                {
                    MatchNo = matchInfo.MatchNo,
                    InfoSiteMatchId = matchInfo.InfoSiteMatchId.HasValue ? matchInfo.InfoSiteMatchId.ToString() : string.Empty,
                    AdminSiteId = matchInfo.MatchId.HasValue ? matchInfo.MatchId.ToString() : string.Empty,
                    Time = matchInfo.KickOffTime.ToOWPTimeFormat(),
                    OtherTime = matchInfo.OtherTime.HasValue ? matchInfo.OtherTime.Value.ToOWPTimeFormat() : string.Empty,
                    MatchOffer = WebUtility.HtmlDecode(matchInfo.MatchOffer),
                    MatchOfferList = matchOffers.Where(x => x.OWPMatchId == matchInfo.OWPMatchId).ToList(),
                    LeagueName = matchInfo.League,
                    HomeName = matchInfo.Home,
                    AwayName = matchInfo.Away,
                    Round = matchInfo.Round,
                    TeamRound = matchInfo.TeamRound,
                    OutSide = matchInfo.OutSide,
                    Remark = matchInfo.Remark,
                    MatchStatus = matchInfo.MatchStatus,
                    Notes = GetMatchNote(notes, matchInfo.OWPMatchId),
                    NoOfHDP = matchInfo.NoOfHDP,
                    EventDateTime = matchInfo.EventDateTime,
                    MinorBettypeId = matchInfo.MinorBettypeId.HasValue ? matchInfo.MinorBettypeId.Value : 0,
                    Assignments = new AssignmentModel
                    {
                        MatchId = matchInfo.OWPMatchId,
                        Handicap = new HandicapAssignmentModel
                        {
                            MaxBet = GetMaxBet(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.Handicap),
                            Spread = GetSpread(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.Handicap),
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.Handicap),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.Handicap)
                        },
                        Handicap1st = new Handicap1stAssignmentModel
                        {
                            MaxBet = GetMaxBet(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.Handicap1St),
                            Spread = GetSpread(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.Handicap1St),
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.Handicap1St),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.Handicap1St)
                        },
                        OverUnder = new OverUnderAssignmentModel
                        {
                            MaxBet = GetMaxBet(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder),
                            Spread = GetSpread(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder),
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder)
                        },
                        OverUnder1st = new OverUnder1stAssignmentModel
                        {
                            MaxBet = GetMaxBet(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder1St),
                            Spread = GetSpread(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder1St),
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder1St),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.OverUnder1St)
                        },
                        OneXTwo = new OneXTwoAssignmentModel
                        {
                            MaxBet = GetMaxBet(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo),
                            Spread = GetSpread(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo),
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo)
                        },
                        OneXTwo1st = new OneXTwo1stAssignmentModel
                        {
                            MaxBet = GetMaxBet(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo1St),
                            Spread = GetSpread(matchSettings, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo1St),
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo1St),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.OneXTwo1St)
                        },
                        Specific15Mins = new Specific15MinsAssignmentModel
                        {
                            MainTrader = GetMainTraderNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.Specific15Mins),
                            OtherTraders = GetOtherTradersNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.Specific15Mins)
                        },
                        Specific10Mins = new Specific10MinsAssignmentModel
                        {
                            MainTrader = GetMainTraderNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.Specific10Mins),
                            OtherTraders = GetOtherTradersNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.Specific10Mins)
                        },
                        FM = new FMAssignmentModel
                        {
                            MaxBet = GetMaxBet(GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.FastMarket)),
                            Spread = GetSpread(GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.FastMarket)),
                            MainTrader = GetMainTraderNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.FastMarket),
                            OtherTraders = GetOtherTradersNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.FastMarket)
                        },
                        AIO = new AIOAssignmentModel
                        {
                            MainTrader = GetMainTraderNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.AllInOne),
                            OtherTraders = GetOtherTradersNameForSpecialBettype(traders, matchInfo, (int)MinorBettype.AllInOne)
                        },
                        LA2nd = new LA2ndAssignmentModel
                        {
                            MainTrader = GetMainTrader(traders, matchInfo.OWPMatchId, (int)MajorBettype.La2Nd),
                            OtherTraders = GetOtherTraders(traders, matchInfo.OWPMatchId, (int)MajorBettype.La2Nd)
                        }
                    },
                    TVCode = matchInfo.TV,
                    Channel = matchInfo.Channel,
                    IPTV = matchInfo.IPTV,
                    WatchBet = matchInfo.WatchBet,
                    Agent = matchInfo.Agent,
                    OtherProvider = matchInfo.OtherProvider,
                    Provider = matchInfo.Provider,
                    ReporterPhone = matchInfo.Phone,
                    Website = matchInfo.Website,
                    Website2 = matchInfo.Website2,
                    Website3 = matchInfo.Website3,
                    Website4 = matchInfo.Website4,
                    IsSyncLive = matchInfo.IsLive &&
                        checkIsLiveStatusServices.GetOfferLiveStatus(matchInfo.MinorBettypeId, matchInfo.ParentAdminSiteId, mainDBResult)
                };

                var matchSettingForXmins = GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.Specific15Mins)
                                        ?? GetMatchSettingForSpecialBettype(matchSettings, matchInfo, (int)MinorBettype.Specific10Mins);

                match.Assignments.SpecificXMins = new SpecificXMinsAssignmentModel
                {
                    MaxBet = GetMaxBet(matchSettingForXmins),
                    Spread = GetSpread(matchSettingForXmins),
                };
                matchList.Add(match);
            }

            return matchList;
        }
    }
}
