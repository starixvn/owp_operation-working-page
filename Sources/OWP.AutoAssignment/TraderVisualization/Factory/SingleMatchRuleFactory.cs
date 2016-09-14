namespace OWP.AutoAssignment.TraderVisualization.Factory
{
    using Constants;
    using Misc;

    public static class SingleMatchRuleFactory
    {
        public static SingleMatchRule Create(int type)
        {
            switch (type)
            {
                case RuleType.SabaMatch:
                    return new SabaMatchRule();
                case RuleType.Corner:
                    return new ConnerRule();
                case RuleType.Fantasy:
                    return new FantasyRule();
                default:
                    return new MainMatchRule();
            }
        }
    }

}
