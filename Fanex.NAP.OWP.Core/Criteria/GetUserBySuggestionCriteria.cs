namespace Fanex.NAP.OWP.Core.Criteria
{
    using Data.Repository;

    public class GetUserBySuggestionCriteria : CriteriaBase
    {
        public string Keyword { get; set; }

        public override bool IsValid()
        {
            return !string.IsNullOrWhiteSpace(Keyword);
        }

        public override string GetSettingKey()
        {
            return "OWP_UserGetBySuggestion";
        }
    }
}
