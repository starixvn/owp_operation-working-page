namespace Fanex.NAP.OWP.EventManagement.ViewModels.Filter
{
    using System.Collections.Generic;
    using Models.EventInfo;

    public class CreatingFilterViewModel
    {
        public FilterModel Filter { get; set; }

        public IEnumerable<FilterFieldModel> Conditions { get; set; }

        public IEnumerable<AddConditionControlViewModel> AddedField { get; set; }
    }
}