namespace Fanex.NAP.OWP.Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Core.Helpers;

    public class MatchInfo
    {
        public int OWPMatchId { get; set; }

        public string MatchNo { get; set; }

        public DateTime EventDate { get; set; }

        public TimeSpan KickOffTime { get; set; }

        public string MatchName => Home + " -vs- " + Away;

        public string Home { get; set; }

        public string Away { get; set; }

        public string League { get; set; }

        public bool IsSelected { get; set; }

        public string Round { get; set; }

        public bool IsSoloMatch { get; set; }

        public string OutSide { get; set; }

        public string ExtraTimeRemark { get; set; }

        public string Venue { get; set; }

        public string TVCode { get; set; }

        public string LocalTV { get; set; }

        public string LiveTV { get; set; }

        public string Channel { get; set; }

        public string WatchBet { get; set; }

        public string Agent { get; set; }

        public string OtherProvider { get; set; }

        public string Provider { get; set; }

        public string Phone { get; set; }

        public string Remark { get; set; }

        public string Division { get; set; }

        public string Website1 { get; set; }

        public string Website2 { get; set; }

        public string Website3 { get; set; }

        public string Website4 { get; set; }

        public bool IsLinked { get; set; }

        public string NoteText
        {
            get
            {
                return string.Join("\r\n", MatchNotes.Select(n => n.Note));
            }
        }

        public IEnumerable<MatchNote> MatchNotes { get; set; } = new List<MatchNote>();

        public IEnumerable<MatchSetting> MatchSettings { get; set; } = new List<MatchSetting>();

        public IEnumerable<OddsDetail> OddsDetails { get; set; } = new List<OddsDetail>();

        public MatchAssignment Assignment { get; set; }

        public string EventDateToDisplay
        {
            get
            {
                return EventDate.ToOWPDateFormat();
            }
        }

        public string KickOffTimeToDisplay
        {
            get
            {
                return KickOffTime.ToOWPTimeFormat();
            }
        }

        public int? ParentMatchId { get; set; }
    }
}