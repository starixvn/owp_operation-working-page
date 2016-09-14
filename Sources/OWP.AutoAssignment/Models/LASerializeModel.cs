namespace OWP.AutoAssignment.Models
{
    using System;
    using Enumerations;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    [Serializable]
    public class LASerializeModel : LAAssignmentModel
    {
        public LASerializeModel()
        {
            Bettype = (int)MajorBettype.La2Nd;
        }

        [Column(ColumnName.LA)]
        public string MainTrader { get; set; }

        [Column(ColumnName.OtherLA)]
        public string OtherTraders { get; set; }

        [Column(ColumnName.AutoLA)]
        public string AutoTrader { get; set; }
    }
}