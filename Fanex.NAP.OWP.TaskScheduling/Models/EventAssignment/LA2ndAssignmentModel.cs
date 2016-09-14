namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System;
    using Core.Extensions.ExcelExtensions;
    using global::OWP.Enumerations;

    [Serializable]
    public class LA2ndAssignmentModel : LAAssignmentModel
    {
        public LA2ndAssignmentModel()
        {
            Bettype = (int)MajorBettype.La2Nd;
        }

        [Column(ColumnName.LA)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherLA)]
        public string OtherTraders { get; set; }
    }
}