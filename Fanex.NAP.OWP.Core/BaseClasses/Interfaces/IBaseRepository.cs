namespace Fanex.NAP.OWP.Core.BaseClasses.Interfaces
{
    using Data.Repository;
    using Model;

    public interface IBaseRepository
    {
        OWPCommandResult UpdateData(ICriteria criteria, bool hasGetOutputParams = false);
    }
}