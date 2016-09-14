namespace Fanex.NAP.OWP.Core.Criteria
{
    using Data.Repository;

    public abstract class CommandCriteria : NonQueryCommand
    {
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }
    }
}