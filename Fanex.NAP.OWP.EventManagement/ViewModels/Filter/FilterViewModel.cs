namespace Fanex.NAP.OWP.EventManagement.ViewModels.Filter
{
    using System.Collections.Generic;
    using Models.EventInfo;

    public class FilterViewModel : FilterModel
    {
        public int UserId { get; set; }

        public string ColumnIds { get; set; }

        public IEnumerable<FilterDetailViewModel> Details { get; set; }
    }
}