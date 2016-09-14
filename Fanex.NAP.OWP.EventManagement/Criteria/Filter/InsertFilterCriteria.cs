namespace Fanex.NAP.OWP.EventManagement.Criteria.Filter
{
    using System.Collections.Generic;
    using System.Linq;
    using Core.Extensions.XMLExtensions;
    using Data;
    using Data.Repository;
    using ViewModels.Filter;

    public class InsertFilterCriteria : CriteriaBase
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public bool IsPublic { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<FilterDetailViewModel> FilterDetails { get; set; }

        public string Details
        {
            get
            {
                return FilterDetails != null && FilterDetails.Any() ? FilterDetails.ToXML().ToString() : string.Empty;
            }
        }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override bool IsValid()
        {
            return UserId > 0
                && !string.IsNullOrEmpty(Name)
                && !string.IsNullOrEmpty(Details);
        }

        public override string GetSettingKey()
        {
            return "OWP_FilterInsert";
        }
    }
}