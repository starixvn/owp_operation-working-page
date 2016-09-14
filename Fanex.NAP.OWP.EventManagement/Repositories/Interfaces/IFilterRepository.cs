namespace Fanex.NAP.OWP.EventManagement.Repositories.Interfaces
{
    using Data.Repository;
    using ViewModels.Filter;

    public interface IFilterRepository
    {
        CreatingFilterViewModel GetFilterDetail(ICriteria criteria);
    }
}