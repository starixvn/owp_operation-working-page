namespace Fanex.NAP.OWP.EventManagement.Service.Interfaces
{
    using System.Collections.Generic;
    using Core.Model;
    using Criteria.Filter;
    using Models.EventInfo;
    using ViewModels.Filter;

    public interface IFilterService
    {
        IEnumerable<FilterModel> GetFilterByUserId(int userId);

        OWPCommandResult InsertFilter(InsertFilterCriteria criteria);

        OWPCommandResult UpdateFilter(UpdateFilterCriteria criteria);

        OWPCommandResult DeleteFilter(DeleteFilterCriteria criteria);

        OWPCommandResult InsertDefaultFilter(InsertDefaultFilterCriteria criteria);

        OWPCommandResult DeleteDefaultFilter(DeleteDefaultFilterCriteria criteria);

        CreatingFilterViewModel GetFilterDetail(int? filterId);
    }
}