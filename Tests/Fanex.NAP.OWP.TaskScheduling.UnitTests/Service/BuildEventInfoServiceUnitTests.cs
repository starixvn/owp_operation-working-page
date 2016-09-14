namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Service
{
    using System.Collections.Generic;
    using Fanex.NAP.OWP.TaskScheduling.Service.Implement;
    using Models.EventPicking;
    using Xunit;

    public class BuildEventInfoServiceUnitTests
    {
        private readonly BuildEventInfoServiceImp service;

        public BuildEventInfoServiceUnitTests()
        {
            service = new BuildEventInfoServiceImp();
        }

        [Fact]
        public void BuildEventInfo()
        {
            var eventInfos = new List<EventInfo>
            {
                new EventInfo {OWPMatchId=111,MinorBettypeId=null,ParentMatchId=null },
                new EventInfo {OWPMatchId=222,MinorBettypeId=-3,ParentMatchId=111 },
                new EventInfo {OWPMatchId=333,MinorBettypeId=-6,ParentMatchId=111 }
            };
            var assignments = new List<MatchAssignment>
            {
                new MatchAssignment {OWPMatchId=111, Bettype=-1002, MinorBettypeId=null, Username="starix1", AssignmentType=1, AssignmentNote="",ParentMatchId=null },
                new MatchAssignment {OWPMatchId=111, Bettype=1, MinorBettypeId=null, Username="starix1", AssignmentType=2, AssignmentNote="#<user> note",ParentMatchId=null },
                new MatchAssignment {OWPMatchId=122, Bettype=1, MinorBettypeId=-88, Username="starix1", AssignmentType=1, AssignmentNote="",ParentMatchId=111 },
                new MatchAssignment {OWPMatchId=222, Bettype=5, MinorBettypeId=-3, Username="starix1", AssignmentType=1, AssignmentNote="",ParentMatchId=111 },
                new MatchAssignment {OWPMatchId=233, Bettype=1, MinorBettypeId=-5, Username="starix1", AssignmentType=2, AssignmentNote="#<user> 15mins",ParentMatchId=111 },
                new MatchAssignment {OWPMatchId=311, Bettype=1, MinorBettypeId=-8, Username="starix1", AssignmentType=1, AssignmentNote="",ParentMatchId=111 },
            };
            var matchSettings = new List<MatchSetting>
            {
                new MatchSetting {OWPMatchId=122, Bettype=1, MinorBettypeId=-2,ParentMatchId=111,MaxBet=1m, Spread=0.02m },
                new MatchSetting {OWPMatchId=233, Bettype=1, MinorBettypeId=-5,ParentMatchId=111,MaxBet=100m, Spread=0.02m },
                new MatchSetting {OWPMatchId=311, Bettype=1, MinorBettypeId=-8,ParentMatchId=111,MaxBet=100m, Spread=0.02m }
            };
            var expected = new List<EventInfo>
            {
                new EventInfo
                {
                    OWPMatchId = 111,
                    LA = "starix1",
                    OtherTradersHDP = "#starix1 note",
                    FM = "starix1",
                    MaxBetXmins = "0.001K",
                    SpreadXmins = "2"
                },
                new EventInfo
                {
                    OWPMatchId = 222,
                    Trader1X2 = "starix1",
                    OtherTraders15mins = "#starix1 15mins",
                    MaxBetXmins = "0.1K",
                    SpreadXmins = "2"
                },
                new EventInfo
                {
                    OWPMatchId = 333,
                    X15mins = "starix1",
                    MaxBetXmins = "0.1K",
                    SpreadXmins = "2"
                }
            };

            var actual = service.BuildEventInfo(eventInfos, assignments, matchSettings);

            Assert.Equal(3, actual.Count);
            Assert.Equal(expected[0].LA, actual[0].LA);
            Assert.Equal(expected[0].OtherTradersHDP, actual[0].OtherTradersHDP);
            Assert.Equal(expected[0].FM, actual[0].FM);
            Assert.Equal(expected[0].MaxBetXmins, actual[0].MaxBetXmins);
            Assert.Equal(expected[0].SpreadXmins, actual[0].SpreadXmins);

            Assert.Equal(expected[1].Trader1X2, actual[1].Trader1X2);
            Assert.Equal(expected[1].OtherTraders15mins, actual[1].OtherTraders15mins);
            Assert.Equal(expected[1].MaxBetXmins, actual[1].MaxBetXmins);
            Assert.Equal(expected[1].SpreadXmins, actual[1].SpreadXmins);

            Assert.Equal(expected[2].X15mins, actual[2].X15mins);
            Assert.Equal(expected[2].MaxBetXmins, actual[2].MaxBetXmins);
            Assert.Equal(expected[2].SpreadXmins, actual[2].SpreadXmins);
        }
    }
}
