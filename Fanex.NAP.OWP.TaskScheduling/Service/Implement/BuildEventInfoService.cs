namespace Fanex.NAP.OWP.TaskScheduling.Service.Implement
{
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.NAP.OWP.Core.Helpers;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventPicking;
    using global::OWP.Enumerations;

    public interface BuildEventInfoService
    {
        List<EventInfo> BuildEventInfo(List<EventInfo> eventInfos, List<MatchAssignment> assignments, List<MatchSetting> matchSettings);
    }

    public class BuildEventInfoServiceImp : BuildEventInfoService
    {
        public List<EventInfo> BuildEventInfo(List<EventInfo> eventInfos, List<MatchAssignment> assignments, List<MatchSetting> matchSettings)
        {
            foreach (var match in eventInfos)
            {
                match.TraderHDP = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.Handicap);
                match.TraderOU = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OverUnder);
                match.Trader1HHDP = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.Handicap1St);
                match.Trader1HOU = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OverUnder1St);
                match.Trader1X2 = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OneXTwo);
                match.LA = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.La2Nd);
                match.Trader1H1X2 = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OneXTwo1St);

                match.OtherTradersHDP = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.Handicap, AssignmentType.Others);
                match.OtherTradersOU = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OverUnder, AssignmentType.Others);
                match.OtherTraders1HHDP = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.Handicap1St, AssignmentType.Others);
                match.OtherTraders1HOU = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OverUnder1St, AssignmentType.Others);
                match.OtherTraders1X2 = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OneXTwo, AssignmentType.Others);
                match.OtherLA = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.La2Nd, AssignmentType.Others);
                match.OtherTraders1H1X2 = GetTrader(assignments, match.OWPMatchId, (int)MajorBettype.OneXTwo1St, AssignmentType.Others);

                if (match.MinorBettypeId == null)
                {
                    match.FM = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.FastMarket);
                    match.AIO = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.AllInOne);
                    match.X15mins = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.Specific15Mins);
                    match.X10mins = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.Specific10Mins);

                    match.OtherTradersFM = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.FastMarket, AssignmentType.Others);
                    match.OtherTradersAIO = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.AllInOne, AssignmentType.Others);
                    match.OtherTraders15mins = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.Specific15Mins, AssignmentType.Others);
                    match.OtherTraders10mins = GetTraderGeneratedOfMainMatch(assignments, match.OWPMatchId, (int)MinorBettype.Specific10Mins, AssignmentType.Others);

                    match.MaxBetFM = GetSettingGeneratedOfMainMatch(matchSettings, match.OWPMatchId, (int)MinorBettype.FastMarket, true);
                    match.MaxBetXmins = GetSettingGeneratedOfMainMatch(matchSettings, match.OWPMatchId, (int)MinorBettype.Specific10Mins, true);

                    match.SpreadFM = GetSettingGeneratedOfMainMatch(matchSettings, match.OWPMatchId, (int)MinorBettype.FastMarket, false);
                    match.SpreadXmins = GetSettingGeneratedOfMainMatch(matchSettings, match.OWPMatchId, (int)MinorBettype.Specific10Mins, false);
                }
                else
                {
                    match.X15mins = GetTraderForSpecific15minsOfMinorMatch(assignments, match);
                    match.OtherTraders15mins = GetTraderForSpecific15minsOfMinorMatch(assignments, match, AssignmentType.Others);

                    match.MaxBetXmins = GetSettingForSpecific15minsOfMinorMatch(matchSettings, match, true);
                    match.SpreadXmins = GetSettingForSpecific15minsOfMinorMatch(matchSettings, match, false);
                }
            }

            return eventInfos;
        }

        private static string GetTrader(List<MatchAssignment> assignments, int owpMatchId, int bettype, AssignmentType assignmentType = AssignmentType.Main)
        {
            var assignment = assignments.FirstOrDefault(x => x.AssignmentType == (int)assignmentType &&
                        x.AssignmentType == (int)assignmentType && x.OWPMatchId == owpMatchId && x.Bettype == bettype);
            return GetTraderValue(assignmentType, assignment);
        }

        private static string GetTraderGeneratedOfMainMatch(List<MatchAssignment> assignments, int owpMatchId, int minorBettype, AssignmentType assignmentType = AssignmentType.Main)
        {
            var assignment = assignments.FirstOrDefault(x => x.AssignmentType == (int)assignmentType &&
                    x.MinorBettypeId == minorBettype &&
                    x.ParentMatchId == owpMatchId &&
                    x.Bettype == (int)MajorBettype.Handicap);
            return GetTraderValue(assignmentType, assignment);
        }

        private static string GetTraderForSpecific15minsOfMinorMatch(List<MatchAssignment> assignments, EventInfo matchInfo, AssignmentType assignmentType = AssignmentType.Main)
        {
            var assignment = new MatchAssignment();
            if (matchInfo.MinorBettypeId == (int)MinorBettype.NoOfCorner)
            {
                assignment = assignments.FirstOrDefault(x => x.AssignmentType == (int)assignmentType &&
                        x.MinorBettypeId == (int)MinorBettype.Specific15MinsCorners &&
                        x.ParentMatchId == matchInfo.ParentMatchId &&
                        x.Bettype == (int)MajorBettype.Handicap);
            }

            if (matchInfo.MinorBettypeId == (int)MinorBettype.TotalBooking)
            {
                assignment = assignments.FirstOrDefault(x => x.AssignmentType == (int)assignmentType &&
                        x.MinorBettypeId == (int)MinorBettype.Specific15MinsTotalBookings &&
                        x.ParentMatchId == matchInfo.ParentMatchId &&
                        x.Bettype == (int)MajorBettype.Handicap);
            }

            return GetTraderValue(assignmentType, assignment);
        }

        private static string GetTraderValue(AssignmentType assignmentType, MatchAssignment assignment)
        {
            return assignmentType == AssignmentType.Main
                ? assignment?.Username
                : GetAssignmentNote(assignment);
        }

        private static string GetAssignmentNote(MatchAssignment assignment)
            => assignment?.AssignmentNote?.Replace("<user>", assignment?.Username);

        private static string GetSettingGeneratedOfMainMatch(List<MatchSetting> matchSettings, int owpMatchId, int minorBettype, bool isMaxbet)
        {
            var matchSetting = matchSettings.FirstOrDefault(x => x.MinorBettypeId == minorBettype &&
                    x.ParentMatchId == owpMatchId &&
                    x.Bettype == (int)MajorBettype.Handicap);
            return GetSettingValue(isMaxbet, matchSetting);
        }

        private static string GetSettingForSpecific15minsOfMinorMatch(List<MatchSetting> matchSettings, EventInfo matchInfo, bool isMaxbet)
        {
            var matchSetting = new MatchSetting();
            if (matchInfo.MinorBettypeId == (int)MinorBettype.NoOfCorner)
            {
                matchSetting = matchSettings.FirstOrDefault(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsCorners &&
                        x.ParentMatchId == matchInfo.ParentMatchId &&
                        x.Bettype == (int)MajorBettype.Handicap);
            }

            if (matchInfo.MinorBettypeId == (int)MinorBettype.TotalBooking)
            {
                matchSetting = matchSettings.FirstOrDefault(x => x.MinorBettypeId == (int)MinorBettype.Specific15MinsTotalBookings &&
                        x.ParentMatchId == matchInfo.ParentMatchId &&
                        x.Bettype == (int)MajorBettype.Handicap);
            }

            return GetSettingValue(isMaxbet, matchSetting);
        }

        private static string GetSettingValue(bool isMaxbet, MatchSetting matchSetting)
        {
            return isMaxbet
                ? matchSetting?.MaxBet.ToOWPMaxBetFormat()
                : matchSetting?.Spread.ToOWPSpreadFormat();
        }
    }
}
