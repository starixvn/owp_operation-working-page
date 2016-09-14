namespace Fanex.NAP.OWP.EventManagement.Criteria
{
    using System;
    using System.Globalization;
    using Data.Repository;

    public abstract class CriteriaBaseExtension : CriteriaBase
    {
        public int UserId { get; set; }

        public string SessionId { get; private set; } = Guid.NewGuid().ToString("D", CultureInfo.InvariantCulture);

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }
    }
}