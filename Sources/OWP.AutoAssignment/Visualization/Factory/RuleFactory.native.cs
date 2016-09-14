namespace OWP.AutoAssignment.Visualization.Factory
{
    using Enum;
    using Misc;

    public interface MainMatchRuleFactory
    {
        MainMatchRule Create(RuleType type);
    }

    public class MainMatchRuleFactoryImp : MainMatchRuleFactory
    {
        public MainMatchRule Create(RuleType type)
        {
            switch (type)
            {
                case RuleType.FANTASY:
                    return new IsFantasyRule();
                case RuleType.FT_CORNER:
                    return new FTCornerRule();
                default:
                    return new VirtualSoccerRule();
            }
        }
    }

    public interface SpecialProductFactory
    {
        SpecialProductRule Create(RuleType type);
    }

    public class SpecialProductFactoryImp : SpecialProductFactory
    {
        public SpecialProductRule Create(RuleType type)
        {
            if (type == RuleType.NOT_CORNER)
            {
                return new NotCornerRule();
            }

            return new IsCornerRule();
        }
    }
}