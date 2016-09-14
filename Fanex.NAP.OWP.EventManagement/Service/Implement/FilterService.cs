namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Core.Model;
    using Criteria.Filter;
    using global::OWP.Resources;
    using Interfaces;
    using Models.EventInfo;
    using Repositories.Interfaces;
    using ViewModels.Filter;

    public class FilterService : OWPBaseService, IFilterService
    {
        private readonly IFilterRepository filterRepository;

        public FilterService(IFilterRepository repository)
        {
            filterRepository = repository;
        }

        public OWPCommandResult InsertFilter(InsertFilterCriteria criteria)
        {
            var result = new OWPCommandResult
            {
                Message = ViewLang.InvalidFilterName
            };

            if (criteria != null && criteria.IsValid())
            {
                result = Repository.UpdateData(criteria);
            }

            return result;
        }

        public OWPCommandResult UpdateFilter(UpdateFilterCriteria criteria)
        {
            var result = new OWPCommandResult();
            if (criteria != null && criteria.IsValid())
            {
                result = Repository.UpdateData(criteria);
            }

            return result;
        }

        public OWPCommandResult DeleteFilter(DeleteFilterCriteria criteria)
        {
            var result = new OWPCommandResult();
            if (criteria != null && criteria.IsValid())
            {
                result = Repository.UpdateData(criteria);
            }

            return result;
        }

        public OWPCommandResult InsertDefaultFilter(InsertDefaultFilterCriteria criteria)
        {
            var result = new OWPCommandResult();
            if (criteria != null && criteria.IsValid())
            {
                result = Repository.UpdateData(criteria);
            }

            return result;
        }

        public OWPCommandResult DeleteDefaultFilter(DeleteDefaultFilterCriteria criteria)
        {
            var result = new OWPCommandResult();
            if (criteria != null && criteria.IsValid())
            {
                result = Repository.UpdateData(criteria);
            }

            return result;
        }

        public IEnumerable<FilterModel> GetFilterByUserId(int userId)
        {
            IEnumerable<FilterModel> filters = new List<FilterModel>();
            var criteria = new GetFilterByUserIdCriteria { UserId = userId };
            if (criteria.IsValid())
            {
                filters = GetData<FilterModel>(criteria);
            }

            return filters;
        }

        public CreatingFilterViewModel GetFilterDetail(int? filterId)
        {
            var result = new CreatingFilterViewModel();

            var criteria = new GetFilterDetailCriteria
            {
                FilterId = filterId ?? 0
            };

            if (criteria.IsValid())
            {
                result = filterRepository.GetFilterDetail(criteria);
            }

            return result;
        }
    }
}