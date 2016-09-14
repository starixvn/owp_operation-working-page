namespace Fanex.NAP.OWP.Model
{
    public class MatchAssignment
    {
        public int OWPMatchId { get; set; }

        public Assignment Handicap { get; set; }

        public Assignment Handicap1st { get; set; }

        public Assignment OverUnder { get; set; }

        public Assignment OverUnder1st { get; set; }

        public Assignment OneXTwo { get; set; }

        public Assignment OneXTwo1st { get; set; }

        public Assignment LA1st { get; set; }

        public Assignment LA2nd { get; set; }
    }
}