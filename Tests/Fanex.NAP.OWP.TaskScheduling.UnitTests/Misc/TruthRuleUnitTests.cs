namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Misc
{
    using System.Collections.Generic;
    using Models.EventPicking;
    using TaskScheduling.Misc;
    using Xunit;

    public class TruthRuleUnitTests
    {
        private readonly IEnumerable<Condition> leagueConditions = new List<Condition>
            {
                new Condition
                {
                    Type = Constant.ContainsCondition,
                    Value = "M81"
                },
                new Condition
                {
                    Type = Constant.EqualsCondition,
                    Value = "M83"
                },
            };

        [Fact]
        public void Execute_MatchEqualsAnyLeagueItemRule_ShoudReturn1()
        {
            var firstRule = new MatchContainsAnyLeagueItemRule();
            var secondRule = new BothAreEmptyRule();
            var thirdRule = new LeagueHasValueAndMatchIsEmptyRule();
            firstRule.SetSuccessor(secondRule);
            secondRule.SetSuccessor(thirdRule);
            var matchCondition = "M83";

            var actual = firstRule.Execute(leagueConditions, matchCondition);

            Assert.Equal(1, actual);
        }

        [Fact]
        public void Execute_MatchContainsAnyLeagueItemRule_ShoudReturn1()
        {
            var firstRule = new MatchContainsAnyLeagueItemRule();
            var secondRule = new BothAreEmptyRule();
            var thirdRule = new LeagueHasValueAndMatchIsEmptyRule();
            firstRule.SetSuccessor(secondRule);
            secondRule.SetSuccessor(thirdRule);
            var matchCondition = "M8152/78";

            var actual = firstRule.Execute(leagueConditions, matchCondition);

            Assert.Equal(1, actual);
        }

        [Fact]
        public void Execute_MatchNotContainsOrEqualsAnyLeagueItemRule_ShoudReturn0()
        {
            var firstRule = new MatchContainsAnyLeagueItemRule();
            var secondRule = new BothAreEmptyRule();
            var thirdRule = new LeagueHasValueAndMatchIsEmptyRule();
            firstRule.SetSuccessor(secondRule);
            secondRule.SetSuccessor(thirdRule);
            var matchCondition = "M123456";

            var actual = firstRule.Execute(leagueConditions, matchCondition);

            Assert.Equal(0, actual);
        }

        [Fact]
        public void Execute_BothAreEmptyRule_ShoudReturn1()
        {
            var firstRule = new MatchContainsAnyLeagueItemRule();
            var secondRule = new BothAreEmptyRule();
            var thirdRule = new LeagueHasValueAndMatchIsEmptyRule();
            firstRule.SetSuccessor(secondRule);
            secondRule.SetSuccessor(thirdRule);
            IEnumerable<Condition> emptyLeagueConditions = new List<Condition>();
            var matchCondition = string.Empty;

            var actual = firstRule.Execute(emptyLeagueConditions, matchCondition);

            Assert.Equal(1, actual);
        }

        [Fact]
        public void Execute_LeagueHasValueAndMatchIsEmptyRule_ShoudReturn0()
        {
            var firstRule = new MatchContainsAnyLeagueItemRule();
            var secondRule = new BothAreEmptyRule();
            var thirdRule = new LeagueHasValueAndMatchIsEmptyRule();
            firstRule.SetSuccessor(secondRule);
            secondRule.SetSuccessor(thirdRule);
            var matchCondition = string.Empty;

            var actual = firstRule.Execute(leagueConditions, matchCondition);

            Assert.Equal(0, actual);
        }
    }
}